proem = angular.module( 'appProem', [ 'ui.router', 'ngSanitize', 'ngResource', 'ngAnimate', 'direcTives', 'smoothScroll' ] )

proem.config( function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	$urlRouterProvider.otherwise( '/' )

	// $stateProvider
	$stateProvider
		.state( 'discog', {
			url: '/discog',
			abstract: true,
			resolve: {
				discResource: 'discResource',
				discog: function( discResource ) {
					return discResource.get().$promise
				}
			},
			views: {
        'discog.list': {
        	templateProvider: ['$templateCache', function ($templateCache) {
						return $templateCache.get( 'app/partials/disc-list.html' );
					}],
          controller: 'DiscographyController'
        },
        'discog.detail': {
        	templateProvider: ['$templateCache', function ($templateCache) {
						return $templateCache.get( 'app/partials/disc-detail.html' );
					}],
          controller: 'DiscController'
        }
    	}
		} )
		.state( 'discog.list', {
			url: '/list',
			templateUrl: 'app/partials/disc-list.html',
		})
		.state( 'discog.detail', {
			url: '/list/:category/:id',
			templateUrl: 'app/partials/disc-detail.html'
		})
		.state( 'news', {
			url: '/news'
			// abstract: true,
			// resolve: {
			// 	newsResource: 'newsResource',
			// 	news: function( discResource ) {
			// 		console.log('resources requested')
			// 		return discResource.get().$promise
			// 	}
			// },

		})
})

proem.factory('discResource', ['$resource', 'apistuff', function( $resource, apistuff ){
	var resource = $resource('/discog.json')
	// var resource = apistuff.dataComm('/discog.json', 'GET' )

	return resource
}])

proem.run([ '$rootScope', '$state', '$stateParams', function ( $rootScope, $state, $stateParams ) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$state.transitionTo('discog.list');
	}
])

proem.factory( 'apistuff', ['$http', '$q', function( $http, $q ) {
	var service = {}
	var filename = ''

	service.dataComm = function ( filename, method ) {
		var d = $q.defer()

		$http({
			url: filename,
			method: method,
			cache: true,
			timeout: 10000
		}).
		success( function ( data, status, headers, config ) {
			d.resolve( data )
		} ).
		error( function ( data, status, headers, config ) {
			d.reject( 'oh noes! an error at:' + status )
		} )
		return d.promise
	}

	return service
} ])