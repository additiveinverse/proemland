module.exports = function(grunt) {
	var name  = '<%= pkg.name %>-v<%= pkg.version%>',
			manifest = '<%= pkg.manifest %>',
			reports = 'reports/<%= pkg.name %>-',
			bowerPath = 'app_modules/',
			winterPath = 'contents/',
			pathJS = winterPath + 'js/'
	,	pathCSS = winterPath + 'css/'
	,	pathIMG = winterPath + 'img/'
	,	appSRC = 'app/'
	,	appLESS = appSRC + 'less/'
	,	appIMG = appSRC + 'images/'
	,	appJS = appSRC;

	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json')
	,	less:
		{
			dev:
			{
				options:
				{
					path: appLESS
				,	cleancss: false
				}
			,	files: manifest
			}
		,	production:
			{
				options:
				{
					path: appLESS
				,	compress: true
				,	cleancss: true
				}
			,	files: manifest
			}
		}
	,	imagemin:
		{
			dynamic:
			{
				options:
				{
					optimizationLevel: 5
				,	pngquant: true
				}
			,	files:
				[{
					expand: true
				,	cwd: appIMG
				,   src: [ '**/*.{png,jpg,gif}' ]
				,	dest: pathIMG
				}]
			}
		}
	,	ngtemplates:
		{
			proem:
			{
				src: appSRC + 'partials/*.html'
			,	dest: appSRC + 'prm.tpl.js'
			,	options:
				{
					htmlmin: {
						collapseWhitespace: true
					,	collapseBooleanAttributes: true
					}
				}
			}
		}
	,	concat:
		{
			options:
			{
					separator: ' ',
			}
		,	appJS:
			{
				src: [
					appJS + 'prm.*.js'
				]
			,	dest: pathJS + 'prm.js'
			}
		,	dataJS:
			{
				src: [
					appJS + '*.json'
				]
			,	dest: pathJS + '*.json'
			}
		,	libJS:
			{
				src: [
					bowerPath + '/angularjs-bower/angular.min.js'
				,	bowerPath + '/angularjs-bower/angular-animate.min.js'
				,	bowerPath + '/angularjs-bower/angular-route.min.js'
				,	bowerPath + '/angularjs-bower/angular-sanitize.min.js'
				]
			,	dest: pathJS + 'angular.js'
			}
		}
	,	csslint:
		{
			src: pathCSS + '*.css'
		,	csslintrc: '.csslintrc'
		,	options:
			{
				formatters:
				[{
					id: 'text'
				,	dest: reports + 'CSSlint.txt'
				}]
			}
		}
	,	csscss:
		{
			options:
			{
				verbose: true
			,	outputJson: true
			}
		,	dist: { '/DEV-report.json' : pathCSS }
		}
	,	wintersmith:
		{
			build:
			{
				options:
				{
					action: "build"
				,	config: 'config.json'
				}
			}
		,	preview: {
				options: {
					action: "preview"
				,	config: 'config.json'
				}
			}
		}
	,	watch:
		{
			files: [
						appLESS + '*'
					, 	appIMG + '*'
					, 	appJS + '*'
					,	appSRC + "*"
					,	"templates/*"
					]
		,	tasks: [
						'less:dev'
					,	'ngtemplates'
					,	'concat'
					]
		,	options:
			{
				reload: true
			,	livereload: true
			,	spawn: false
			,	dateFormat: function( time )
				{
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				}
			}
		}
	,	concurrent:
		{
			target:
			{
				tasks: ['wintersmith:preview', 'watch']
			,	options:
				{
					logConcurrentOutput: true
				}
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// Develop
	grunt.registerTask('default', [ 'concurrent' ]);

	// Test
	grunt.registerTask('test', [ 'less:dev', 'csscss', 'csslint', 'ngtemplates', 'concat', 'wintersmith:build' ]);

	// Deploy
	grunt.registerTask('deploy', [ 'less:production', 'imagemin', 'ngtemplates', 'concat', 'wintersmith:build' ]);
}