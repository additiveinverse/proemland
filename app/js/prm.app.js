proem = angular.module( "appProem", [ "ui.router", "ngSanitize", "ngResource", "ngAnimate", "smoothScroll" ] )

proem.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	$urlRouterProvider.otherwise( "/" )

	// $stateProvider
	$stateProvider
		.state( "discog", {
			url: "/discog",
			abstract: true,
			params: {
				discID: null
			},
			resolve: {
				discResource: "discResource",
				discog: function ( discResource ) {
					return discResource.get( ).$promise
				}
			},
			views: {
				"list": {
					controller: "DiscographyController",
					templateProvider: [ "$templateCache", function ( $templateCache ) {
						return $templateCache.get( "app/partials/disc-list.html" );
					} ]
				},
				"detail": {
					controller: "DiscController",
					templateProvider: [ "$templateCache", function ( $templateCache ) {
						return $templateCache.get( "app/partials/disc-detail.html" );
					} ]
				}
			}
		} )
		.state( "discog.list", {
			url: "/list"
		} )
		.state( "discog.detail", {
			params: {
				discID: null
			},
			url: "/detail/:discID",
		} )
		.state( "news", {
			url: "/news",
			views: {
				"news.twitter": {
					controller: ""
				},
				"news.soundcloud": {
					controller: ""
				},
				"news.spotify": {
					controller: ""
				}
			}
		})
}])

proem.factory( "discResource", [ "$resource", "apistuff", function ( $resource, apistuff ) {
	var resource = $resource( "/discog.json" )
	var resourceFilter = ""

	// var resource = apistuff.dataComm("/discog.json", "GET" )
	return resource
}])

// scaffolding disc service
proem.service("discService", ["$resource", "apistuff", function( $resource, apistuff ){
	var service = {}

	service.discographyList = function() {

	}

	service.discographyItem = function () {

	}

	return service
}])

proem.run( [ "$rootScope", "$state", "$stateParams", function ( $rootScope, $state, $stateParams ) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$state.go( "discog.list" );
} ] )

proem.factory( "apistuff", [ "$http", "$q", function ( $http, $q ) {
	var service = {}
	var filename = ""

	service.dataComm = function ( filename, method ) {
		var d = $q.defer( )

		$http( {
			url: filename,
			method: method,
			cache: true,
			timeout: 10000
		} ).
		success( function ( data, status, headers, config ) {
			d.resolve( data )
		} ).
		error( function ( data, status, headers, config ) {
			d.reject( "oh noes! an error at:" + status )
		} )
		return d.promise
	}

	return service
} ] )