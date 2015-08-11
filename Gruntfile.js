module.exports = function ( grunt ) {
	var name = "<%= pkg.name %>-v<%= pkg.version%>",
		manifest = "<%= pkg.manifest %>",
		reports = "reports/<%= pkg.name %>-",
		appSRC = 'app/',
		appJS = appSRC;

	grunt.initConfig( {
		config: {
			lib: "app_modules/",
			tmp: "temp/",
			app: {
				root: "app/",
				js: "app/",
				less: "app/less/",
				partials: "app/partials/",
				img: "app/images/"
			},
			dist: {
				root: "contents/",
				css: "contents/css/",
				js: "contents/js/",
				img: "contents/img/"
			}
		},
		manifest: {
			js_test: [
				"Gruntfile.js",
				"<%=config.app.js %>prm*.js",
				"<%=config.app.js %>*.json"
			],
			js_bundle: []
		},
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// scaffolding
		less: {
			dev: {
				options: {
					path: "<%= config.app.less %>",
					cleancss: false
				},
				files: manifest
			},
			production: {
				options: {
					path: "<%= config.app.less %>",
					compress: true,
					cleancss: true
				},
				files: manifest
			}
		},
		concat: {
			options: {
				separator: ' ',
			},
			appJS: {
				src: [
					"<%= config.app.js %>prm.*.js"
				],
				dest: "<%= config.dist.js %>prm.js"
			},
			dataJS: {
				src: [
					appJS + '*.json'
				],
				dest: "<%= config.dist.js %>*.json"
			},
			libJS: {
				src: [
					"<%= config.lib %>/angular/angular.min.js",
					"<%= config.lib %>/angular/angular-animate.min.js",
					"<%= config.lib %>/angular/angular-route.min.js",
					"<%= config.lib %>/angular/angular-sanitize.min.js"
				],
				dest: "<%= config.dist.js %>/angular.js"
			}
		},
		// testing
		lesslint: {
			src: "<%= config.app.less %>*.less",
			csslintrc: '.csslintrc',
			options: {
				formatters: [ {
					id: 'text',
					dest: reports + 'CSSlint.txt'
				} ]
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				asi: true,
				globals: {
					jQuery: true
				}
			},
			all: "<%= manifest.js_test %>"
		},

		// sanitizing
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 5,
					pngquant: true
				},
				files: [ {
					expand: true,
					cwd: "<%= config.app.img %>",
					src: [ '**/*.{png,jpg,gif}' ],
					dest: "<%= config.dist.img %>"
				} ]
			}
		},

		ngtemplates: {
			proem: {
				src: "<%= config.app.partials %>*.html",
				dest: "<%= config.app %> prm.tpl.js",
				options: {
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					}
				}
			}
		},

		strip: {
			main: {
				src: "<%= config.app %>autocomplete.js",
				dest: "<%= config.tmpDist %>autocomplete.js",
				options: {
					nodes: [ "console.log", "console.dir", "debug" ]
				}
			}
		},

		jsbeautifier: {
			files: "<%= manifest.js_test %>",
			options: {
				css: {
					indentSize: 2,
					indentWithTabs: true,
					selectorSeperatorNewline: true,
					newLineBetweenRules: true
				},
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentChar: " ",
					indentLevel: 0,
					indentSize: 2,
					indentWithTabs: true,
					jslintHappy: true,
					keepArrayIndentation: false,
					keepFunctionIndentation: true,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: true,
					unescapeStrings: false,
					wrapLineLength: 0,
					endWithNewline: true
				}
			}
		},

		// build / deploy
		bump: {
			options: {
				files: [ "package.json", "bower.json" ],
				updateConfigs: [],
				commit: true,
				commitMessage: "Release v%VERSION%",
				commitFiles: [ "package.json", "bower.json" ],
				createTag: true,
				tagName: "%VERSION%",
				tagMessage: "%VERSION%",
				push: true,
				pushTo: "origin",
				gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
				globalReplace: false
			}
		},

		uglify: {
			options: {
				banner: "<%= banner %>",
				sourceMap: true,
				screwIE8: false
			},
			dist: {
				src: "<%= manifest.js_bundle %>",
				dest: "<%= config.dist %>ess.<%= pkg.name %>.min.js"
			}
		},

		wintersmith: {
			build: {
				options: {
					action: "build",
					config: 'config.json'
				}
			},
			preview: {
				options: {
					action: "preview",
					config: 'config.json'
				}
			}
		},

		watch: {
			files: [
				"<%= config.app.root %>**/*"
			],
			tasks: [
				'less:dev', 'newer:ngtemplates', 'concat'
			],
			options: {
				reload: true,
				livereload: true,
				spawn: false,
				dateFormat: function ( time ) {
					grunt.log.writeln( 'The watch finished in ' + time + 'ms at' + ( new Date() ).toString() );
					grunt.log.writeln( 'Waiting for more changes...' );
				}
			}
		},

		concurrent: {
			target: {
				tasks: [ 'wintersmith:preview', 'watch' ],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Develop
	grunt.registerTask( 'default', [ 'concurrent' ] );

	// Test
	grunt.registerTask( 'test', [ 'less:dev', 'lesslint', 'ngtemplates', 'concat', 'wintersmith:build' ] );

	// Deploy
	grunt.registerTask( 'deploy', [ 'less:prod', 'test', 'imagemin', 'ngtemplates', 'concat', 'wintersmith:build' ] );
}
