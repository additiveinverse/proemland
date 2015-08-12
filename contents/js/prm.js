/*! proemland2014 - v7.0.0 - 2015-08-12
 * Copyright (c) 2015 ; Licensed  */
proem = angular.module( 'proem', [ 'ngRoute', 'directives', 'ngAnimate' ] )

angular.element( document ).ready( function () {
	angular.bootstrap( document, [ 'proem' ] )
} )

proem.config( function ( $routeProvider, $locationProvider ) {
	$routeProvider.when( 'walls', {
		templateUrl: 'app/partials/itm-walls.html',
		controller: 'WallsController'
	} )
	$routeProvider.when( 'dls', {
			templateUrl: 'app/partials/itm-walls.html',
			controller: 'DlsController'
		} )
		.otherwise( {
			redirectTo: '',
			templateUrl: 'app/partials/itm-prdgrid.html',
			controller: 'ProductsController'
		} )
} )

// this should probably be a factory or maybe even a service
var dataComm = function ( $scope, $http, url, method ) {
		//	$resource('http://localhost:8080/resource.json')

		$http( {
			url: url,
			method: method,
			cache: true,
			timeout: 10000
		} ).
		success( function ( data, status, headers, config ) {
			$scope.data = data
				// console.dir( data )
		} ).
		error( function ( data, status, headers, config ) {
			$scope.status = status
			console.log( 'status: ' + status )
			console.dir( config )
		} )
	}
	// /////////////////////////////////////////////////////// Proemland
proem.controller( 'ProductsController', function ( $scope, $http, $route, $controller, $filter ) {
	var url = 'discog.json'
	$scope.data = dataComm( $scope, $http, url, 'GET', $route )
} )

proem.controller( 'WallsController', function ( $scope, $http, $route, $controller ) {
	var url = 'walls.json'
	$scope.data = dataComm( $scope, $http, url, 'GET', $route )
} )

proem.controller( 'DLController', function ( $scope, $http, $route, $controller ) {
	var url = 'dl.json'
	$scope.data = dataComm( $scope, $http, url, 'GET', $route )
} )

// /////////////////////////////////////////////////////// last.fm
lastfm = angular.module( 'lastfm', [] )
lastfm.url = 'http://ws.audioscrobbler.com/2.0/?api_key=e497db57301354ff58b3085aa2118a21&format=json&method='
lastfm.artist = '&artist=proem'

// group chatter
lastfm.controller( 'groupShoutsController', function ( $scope, $http, $route, $routeParams ) {
	var method = 'group.getshouts',
		limit = '&limit=15',
		combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
} )

// group scrobbles
lastfm.controller( 'groupScrobblesController', function ( $scope, $http, $route, $routeParams ) {
	var method = 'group.getshouts',
		limit = '&limit=15',
		combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
} )

// artist shouts
lastfm.controller( 'ShoutsController', function ( $scope, $http, $route, $routeParams ) {
	var method = 'artist.getshouts',
		limit = '&limit=15',
		combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
} )

// fan list
lastfm.controller( 'FansController', function ( $scope, $http ) {
	var method = 'artist.gettopfans',
		limit = '&limit=15',
		combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
} )

// /////////////////////////////////////////////////////// twitter
twtr = angular.module( 'twtr', [] )
twtr.url = ''

// stream
twtr.controller( 'streamController', function ( $scope, $http ) {
	// stuff defined here
} )

// search results
twtr.controller( 'searchController', function ( $scope, $http ) {
	// stuff defined here
} )
angular.module( 'directives', [] ).
directive( 'toggler', [ '$parse', function ( $parse ) {
	return {
		restrict: 'EA',
		link: function ( scope, element, attrs ) {
			var classy = attrs.class.split( ' ' ),
				ev = 'click' /* gonna make this hard coded for now */ ,
				elem = attrs.elem !== undefined ? attrs.elem : 'self',
				prefix = elem.charAt( 0 ) === "#" || elem.charAt( 0 ) === "." ? elem.substr( 1 ) : elem,
				elemprefix = classy.pop(),
				TXTactive = 'active',
				elemClass = [ elemprefix, TXTactive ].join( '-' ) + ' ' + TXTactive,
				trgrClass = [ prefix, TXTactive ].join( '-' )

			element.on( ev, function ( e ) {
				// console.dir( e );
				// console.log("Clicked", this, arguments);
				trgt = e.currentTarget

				// element.parent().children().removeClass( elemClass );
				element.toggleClass( elemClass )
					//					element.siblings().removeClass( elemClass );

				// // elem != '' ? element.find( elem ).toggleClass( trgrClass ) : null;
				// e.currentTarget != e.currentTarget ? element.find( elem ).removeClass( trgrClass ) : null;
			} )
		}
	}
} ] )
angular.module( 'proem' ).run( [ '$templateCache', function ( $templateCache ) {
	'use strict'

	$templateCache.put( 'app/partials/itm-prdgrid.html',
		"<article role=\"article\" itemscope ng-repeat=\"d in data.rekkids | filter:query \" class=\"hproduct prod music-grid\" id=\"music-{{ d.id }}\" toggler ng-animate=\"'show'\" data-ng-cloak data-elem=\"self\" data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\" data-format=\"{{ d.prod_frmt }}\" data-label=\"{{ d.cat_lbl }}\"><span role=\"button\" class=\"btn expand-btn\">expand</span><header class=\"hdr prod-hdr music-hdr\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl prod-ttl music-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2></header><section class=\"prod-details music-details\"><figure class=\"prod-images music-images images\"><img class=\"prod-photo music-photo photo\" data-ng-cloak ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"></figure><div class=\"prod-nfo music-nfo nfo\"><img class=\"prod-thumb music-thumb photo\" ng-src=\"{{ d.thumbimg }}\" alt=\"{{ d.ttl }}\"><dl class=\"lst prod-nfo-lst music-nfo-lst\"><dt class=\"type prod-nfo-typ music-nfo-typ\">category</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.prod_type }}</dd><dt class=\"type prod-nfo-typ music-nfo-typ\">released</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.date | date:yyyy }}</dd><dt class=\"type prod-nfo-typ music-nfo-typ\">format</dt><dd class=\"val prod-nfo-val music-nfo-val ico ico-{{ d.prod_frmt }}\">{{ d.prod_frmt }}</dd><dt class=\"type prod-nfo-typ music-nfo-typ\">label</dt><dd class=\"val prod-nfo-val music-nfo-val\"><a class=\"prod-nfo-lnk\" href=\"{{ d.cat_lnk }}\" target=\"_blank\">{{ d.cat_lbl }}</a></dd><dt class=\"type prod-nfo-typ music-nfo-typ\">catalog ID</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.cat_num }}</dd><dt class=\"type prod-nfo-typ music-nfo-typ\">limited to</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.cat_limit }}</dd></dl><ol class=\"lst music-track-lst\"><li ng-repeat=\"lst in d.Body\">{{ lst }}</li></ol></div></section></article>"
	)

	$templateCache.put( 'app/partials/itm-single.html',
		"<article role=\"article\" itemscope ng-repeat=\"d in data.articles\" class=\"hproduct prod post\" id=\"post-{{ d.id }}\" data-ng-cloak data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\"><h1 class=\"ttl post-ttl\">{{ d.title }}</h1><section class=\"post-content\">{{ d.body }}</section><aside class=\"post-aside\">{{ d.exerpt }}</aside></article>"
	)

	$templateCache.put( 'app/partials/itm-walls.html',
		"<article role=\"article\" itemscope ng-repeat=\"d in data.walls\" class=\"hproduct prod wall-grid\" id=\"wall-{{ d.id }}\" data-ng-cloak data-prodid=\"wall-{{ d.id }}\" data-date=\"{{ d.date }}\"><a href=\"files/{{ d.ttl }}\" class=\"lnk wall-lnk\" target=\"_blank\"><figure class=\"prod-images wall-images images\"><img class=\"prod-photo wall-photo photo\" data-ng-cloak ng-src=\"images/{{ d.img }}.png\" src=\"images/{{ d.img }}.png\"></figure><div class=\"prod-nfo wall-nfo nfo\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2><h3 ng-bind-html-unsafe=\"d.filename\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.filename }}</h3><dl class=\"lst prod-nfo-lst wall-nfo-lst\"><dt class=\"type prod-nfo-typ wall-nfo-typ\">Size</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.size }}</dd><dt class=\"type prod-nfo-typ wall-nfo-typ\">DL</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.dl }} times</dd></dl></div></a></article>"
	)

	$templateCache.put( 'app/partials/lastfm-shout.html',
		"<ul class=\"lastfm-lst lst\"><li class=\"lastfm-itm shout-itm\" ng-repeat=\"d in data.shout\"><p>{{sh.date}} - {{ sh.author }}</p><p>{{ sh.body }}</p></li></ul>"
	)

} ] )
