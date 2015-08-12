module.exports = function ( grunt ) {
	var name = "<%= pkg.name %>-v<%= pkg.version%>"
	var manifestcss = "<%= pkg.manifestcss %>"
	var manifestjs = "<%= pkg.manifest.js %>"
	var reports = "reports/<%= pkg.name %>-"

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

		pkg: grunt.file.readJSON( 'package.json' ),

		banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		less: {
			dev: {
				options: {
					path: "<%= config.app.less %>",
					cleancss: false
				},
				files: manifestcss
			},
			production: {
				options: {
					path: "<%= config.app.less %>",
					compress: true,
					cleancss: true
				},
				files: manifestcss
			}
		},

		concat: {
			options: {
				separator: " ",
				banner: "<%= banner %>"
			},
			appJS: {
				src: [
					"<%= config.app.js %>prm.*.js"
				],
				dest: "<%= config.dist.js %>prm.js"
			},
			libJS: {
				src: [
					"<%= config.lib %>/angular/angular.min.js",
					"<%= config.lib %>/angular-animate/angular-animate.min.js",
					"<%= config.lib %>/angular-route/angular-route.min.js",
					"<%= config.lib %>/angular-sanitize/angular-sanitize.min.js"
				],
				dest: "<%= config.dist.js %>angular.js"
			}
		},

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
					jQuery: true,
				}
			},
			all: manifestjs
		},

		minjson: {
			compile: {
				files: {
					"<%= config.dist.js %>discog.json": [ "<%= config.app.root %>.json" ]
				}
			}
		},

		jsonlint: {
			config: {
				src: [ "config.json", "package.json", "bower.json" ]
			},
			data: {
				src: [ "<%= config.app.root %>*.json", "<%= config.dist.js %>*.json" ]
			}
		},

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
				dest: "<%= config.app.js %>prm.tpl.js",
				options: {
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: trueng
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
			files: manifestjs,
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
				dest: "<%= config.dist %>prm.<%= pkg.name %>.min.js"
			}
		},

		open: {
			dev: {
				path: "http://localhost:8080/",
				app: "Chrome"
			},
		},

		wintersmith: {
			build: {
				options: {
					action: "build",
					config: "config.json"
				}
			},
			preview: {
				options: {
					action: "preview",
					config: "config.json"
				}
			}
		},

		watch: {
			files: [
				"Gruntfile.js",
				"templates/**/*",
				"<%= config.app.root %>**/*"
			],
			tasks: [
				"less:dev",
				"newer:ngtemplates",
				"concat",
				"jshint"
			],
			options: {
				reload: true,
				livereload: true,
				spawn: false,
				dateFormat: function ( time ) {
					grunt.log.writeln( "The watch finished in " + time + "ms at" + ( new Date() ).toString() );
				}
			}
		},

		concurrent: {
			target: {
				tasks: [ "watch", "wintersmith:preview" ],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Develop
	grunt.registerTask( "default", [ "concurrent", "open:dev" ] );

	// Test
	grunt.registerTask( 'test', [ 'less:dev', 'lesslint', 'ngtemplates', 'concat', 'wintersmith:build' ] );

	grunt.registerTask( "dataprep", [ "minjson", "jsonlint" ] );

	// Deploy
	grunt.registerTask( 'deploy', [ 'less:prod', 'test', 'imagemin', 'ngtemplates', 'concat', 'wintersmith:build' ] );
}
