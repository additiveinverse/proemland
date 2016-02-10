module.exports = function ( grunt ) {
  var name = "<%= pkg.name %>-v<%= pkg.version%>"
  var manifestcss = {
    "build/css/layout.min.css": [
      "app/less/normalize.less",
      "app/less/base-*.less"
    ],
    "build/css/<%= pkg.name %>.css": "app/less/global.less"
  }
  var manifestjs = "<%= pkg.manifest.js %>"
  var reports = "reports/<%= pkg.name %>-"

  grunt.initConfig( {
    config: {
      lib: "app_modules/",
      tmp: "temp/",
      app: {
        root: "app/",
        js: "app/js/",
        less: "app/less/",
        partials: "app/partials/",
        img: "app/images/",
        tpl: "app/layout/",
        data: "app/data/"
      },
      dist: {
        root: "build/",
        css: "build/css/",
        js: "build/js/",
        img: "build/img/",
        pi: "build/images/"
      },
      manifest: {
        css: {
          "build/css/layout.min.css": [
            "app_modules/normalize-less/normalize.less",
            "app/less/base-*.less"
          ],
          "build/css/<%= pkg.name %>.css": "app/less/global.less"
        },
        js: [
          "<%= config.lib %>/angular/angular.min.js",
          "<%= config.lib %>/angular-animate/angular-animate.min.js",
          "<%= config.lib %>/angular-resource/angular-resource.min.js",
          "<%= config.lib %>/angular-sanitize/angular-sanitize.min.js",
          "<%= config.lib %>/angular-smooth-scroll/angular-smooth-scroll.min.js",
          "<%= config.lib %>/angular-ui-router/release/angular-ui-router.min.js",
          "<%= config.lib %>/angular-pageslide-directive/dist/angular-pageslide-directive.min.js"
        ],
      }
    },

    pkg: grunt.file.readJSON( 'package.json' ),

    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // ///////////////////////////////////////////////////////////////// scaffold
    concat: {
      options: {
        separator: " ",
        banner: "<%= banner %>",
        stripBanners: false,
        sourceMap: true
      },
      appJS: {
        src: [
          "<%= config.app.js %>prm.*.js"
        ],
        dest: "<%= config.dist.js %>prm.js"
      },
      libJS: {
        src: "<%= config.manifest.js %>",
        dest: "<%= config.dist.js %>angular.js"
      }
    },

    copy: {
      lesslib: {
        expand: true,
        flatten: true,
        cwd: "<%= config.lib %>",
        src: [
          "lesshat/build/lesshat-prefixed.less",
          "normalize-less/normalize.less"
        ],
        dest: "<%= config.app.less %>"
      },
      favs: {
        expand: true,
        flatten: true,
        cwd: "<%= config.app.img %>favicons/",
        src: [ "*.*" ],
        dest: "<%= config.dist.img %>favs/"
      },      
      svgs: {
        files: [ {
          expand: true,
          cwd: "<%= config.app.img %>",
          src: [ '*.svg' ],
          dest: "<%= config.dist.img %>"
        } ]
      }
    },

    // ///////////////////////////////////////////////////////////////// linting / testing / cleanup
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

    jsonlint: {
      config: {
        src: [ "config.json", "package.json", "bower.json" ]
      },
      data: {
        src: [ "<%= config.app.data %>*.json", "<%= config.dist.root %>*.json" ]
      }
    },

    strip: {
      main: {
        src: "<%= config.app.root %>*.js",
        dest: "<%= config.app.root %>*.js",
        options: {
          nodes: [ "console.log", "console.dir", "debug" ]
        }
      }
    },

    jsbeautifier: {
      files: [ "<%= config.app.js %>*.js", "Gruntfile.js" ],
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

    // ///////////////////////////////////////////////////////////////// compile
    less: {
      dev: {
        options: {
          path: "<%= config.app.less %>",
          cleancss: false
        },
        files: "<%= config.manifest.css %>"
      },
      production: {
        options: {
          path: "<%= config.app.less %>",
          compress: true,
          cleancss: true
        },
        files: "<%= config.manifest.css %>"
      }
    },

    jade: {
      prod: {
        options: {
          pretty: true,
          data: function ( dest, src ) {
            return grunt.file.readJSON( "config_prod.json" )
          }
        },
        files: {
          "<%= config.dist.root %>index.html": "<%= config.app.tpl %>index.jade",
          "<%= config.dist.root %>404.html": "<%= config.app.tpl %>404.jade"
        }
      },
      dev: {
        options: {
          pretty: true,
          data: function ( dest, src ) {
            return grunt.file.readJSON( "config_dev.json" )
          }
        },
        files: {
          "<%= config.dist.root %>index.html": "<%= config.app.tpl %>index.jade",
          "<%= config.dist.root %>404.html": "<%= config.app.tpl %>404.jade"
        }
      }
    },

    ngtemplates: {
      appProem: {
        src: "<%= config.app.partials %>*.html",
        dest: "<%= config.app.js %>prm.tpl.js",
        options: {
          htmlmin: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          }
        }
      }
    },

    svg_sprite: {
      icons: {
        expand: true,
        cwd: "<%= config.app.img %>icons/",
        src: [ '*.svg' ],
        dest: "<%= config.app.img %>",
        options: {
          shape: {
            dimension: {
              maxWidth: 200,
              maxHeight: 200,
              precision: 1
            }
          },
          svg: {
            padding: 20,
            dimensionAttributes: true
          },
          mode: {
            view: {
              prefix: "@ico-%s",
              bust: true,
              sprite: "icons.sprite.svg",
              dest: "../images/",
              common: "sprite",
              dimensions: true,
              mixin: "svg-sprite",
              render: {
                less: {
                  template: "<%= config.app.img %>icons/sprite.mustache",
                  dest: '../less/_sprite.less'
                }
              }
            }
          }
        }
      },
    },

    realFavicon: {
      favicons: {
        src: "<%= config.app.img %>logo_flat_2016.svg",
        dest: "<%= config.app.img %>favicons/",
        options: {
          iconsPath: '/img/favs/',
          html: "",
          design: {
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ffc40d',
              margin: '14%'
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#ffc40d',
              onConflict: 'override'
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor: '#ffc40d',
              manifest: {
                name: 'Proemland',
                display: 'browser',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              }
            },
            safariPinnedTab: {
              pictureAspect: 'blackAndWhite',
              threshold: 58.75,
              themeColor: '#5bbad5'
            }
          },
          settings: {
            compression: 4,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
          },
          versioning: {
            paramName: 'v8',
            paramValue: 'favicon'
          }
        }
      }
    },

    // ///////////////////////////////////////////////////////////////// minifying
    minjson: {
      compile: {
        files: {
          "<%= config.dist.root %>discog.json": [ "<%= config.app.data %>discog.json" ]
        }
      }
    },

    imagemin: {
      site: {
        options: {
          optimizationLevel: 5,
          pngquant: true
        },
        files: [ {
          expand: true,
          cwd: "<%= config.app.img %>",
          src: [ '*.{png,jpg,gif,svg}' ],
          dest: "<%= config.dist.img %>"
        } ]
      },
      product: {
        options: {
          optimizationLevel: 5,
          pngquant: true
        },
        files: [ {
          expand: true,
          cwd: "<%= config.dist.pi %>",
          src: [ '*.{png,jpg,gif,svg}' ],
          dest: "<%= config.dist.pi %>"
        } ]
      }
    },

    svgmin: {
      options: {
        plugins: [ {
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: true
        }, {
          removeEmptyAttrs: true
        } ]
      },
      dist: {
        files: [ {
          expand: true,
          cwd: "<%= config.app.img %>",
          src: [ '*.svg' ],
          dest: "<%= config.app.img %>"
        } ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          removeAttributeQuotes: true,
          useShortDocType: true,
          collapseWhitespace: true
        },
        files: {
          "<%= config.dist.root %>404.html": "<%= config.dist.root %>404.html",
          "<%= config.dist.root %>index.html": "<%= config.dist.root %>index.html"
        }
      }
    },

    // ///////////////////////////////////////////////////////////////// build / deploy / workflow
    bump: {
      options: {
        files: [ "package.json", "bower.json" ],
        updateConfigs: [ ],
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

    connect: {
      server: {
        options: {
          port: "9001",
          base: "build/",
          protocol: "http",
          hostname: "localhost",
          livereload: true,
          open: {
            target: "http://localhost:9001/index.html", // target url to open
            appName: "Chrome"
          },
        }
      }
    },

    watch: {
      build: {
        files: [
          "Gruntfile.js",
          "config.json",
          "<%= config.app.root %>**/*"
        ],
        tasks: [ "jade:dev", "newer:minjson", "newer:ngtemplates", "concat", "less:dev" ],
        options: {
          reload: false,
          livereload: true,
          spawn: false,
          dateFormat: function ( time ) {
            grunt.log.writeln( "The watch finished in " + time + "ms at" + ( new Date( ) ).toString( ) )
          }
        }
      },
      assets: {
        files: [
          "Gruntfile",
          "<%= config.app.img %>**/*"
        ],
        tasks: [ "svgprep" ],
        options: {
          reload: true,
          livereload: true,
          spawn: true
        }
      }
    }
  } );

  require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks )

  // init
  grunt.registerTask( "devint", [ "concat", "ngtemplates" ] )

  // Develop
  grunt.registerTask( "default", [ "jade:dev", "devint", "less:dev", "connect", "watch:build" ] )

  // asset prep
  grunt.registerTask( "imgprep", [ "favprep", "svgprep", "svgmin", "imagemin" ] )
  grunt.registerTask( "favprep", [ "realFavicon", "copy:favs" ] )
  grunt.registerTask( "svgprep", [ "svg_sprite", "copy:svgs"] )
  grunt.registerTask( "dataprep", [ "jsonlint", "minjson" ] )

  // Test
  grunt.registerTask( "test", [ "jsonlint" ] )

  // Build for Production
  grunt.registerTask( "build", [ "jade:prod", "devint", "htmlmin", "less:production", "dataprep" ] )

  // Deploy
  grunt.registerTask( "deploy", [ "build", "htmlmin", "less:production", "dataprep" ] )
}