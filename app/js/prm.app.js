proem = angular.module( "appProem",
	[ "ui.router",
		"ngSanitize",
		"ngResource",
		"ngAnimate",
		"direcTives",
		"smoothScroll",
		"angular.panels"
	])

proem.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
	function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
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
					discService: "discService",
					discog: function ( discService ) {
						return discService.items
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
				url: "/:discID",
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
	}
])

proem.config(["panelsProvider", function (panelsProvider ) {
	panelsProvider
		.add({
			id: "panelDetail",
			position: "left",
			size: "45%",
			templateUrl: "pane-template.html",
			controller: "paneController"
		})
}])

proem.factory( "discResource", [ "$resource", "apistuff",
	function ( $resource, apistuff ) {
		var resource = $resource( "/discog.json" )

		// var resource = apistuff.dataComm("/discog.json", "GET" )
		return resource
	}
])

// disc service
proem.service("discService", ["discResource",
	function( discResource ) {
		var items = discResource.get( ).$promise

		// setting a single item
		var item = []
		var itemAdd = function( newObj ) {
			item.splice( 0, 1, newObj )
		}

		// get a single item
		var itemGet = function() {
			return item
		}

		return {
			items: items,
			itemAdd: itemAdd,
			itemGet: itemGet
		}
	}
])

proem.run( [ "$rootScope", "$state", "$stateParams",
	function ( $rootScope, $state, $stateParams ) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$state.go( "discog.list" );
	}
])

proem.factory( "apistuff", [ "$http", "$q",
	function ( $http, $q ) {
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
	}
])
