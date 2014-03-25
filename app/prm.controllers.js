// /////////////////////////////////////////////////////// Proemland
proem.controller( 'ProductsController', function( $scope, $http, $route, $controller, $filter ) {
	var url = prfx + 'discog.js'

	$scope.data = dataComm( $scope, $http, url, 'GET', $route );

	// $scope.refilter = function( value ) {
	// 	$scope.$apply();
	// }
});

proem.controller( 'WallsController', function( $scope, $http, $route, $controller ) {
	var url = prfx + 'walls.js'

	$scope.data = dataComm( $scope, $http, url, 'GET', $route );
});

// proem.controller( 'ArticlesController', function( $scope, $http, $route, $controller ) {
// 	var url = prfx + 'docs.json'

// 	$scope.data = dataComm( $scope, $http, url, 'GET', $route );
// });


// /////////////////////////////////////////////////////// last.fm
lastfm = angular.module('lastfm', [])
lastfm.url = 'http://ws.audioscrobbler.com/2.0/?api_key=e497db57301354ff58b3085aa2118a21&format=json&method='
lastfm.artist = '&artist=proem'

// group chatter
lastfm.controller( 'groupShoutsController', function( $scope, $http, $route, $routeParams ) {
	var method = 'group.getshouts'
	,	limit = '&limit=15'
	,	combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
});

// group scrobbles
lastfm.controller( 'groupScrobblesController', function( $scope, $http, $route, $routeParams ) {
	var method = 'group.getshouts'
	,	limit = '&limit=15'
	,	combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
});

// artist shouts
lastfm.controller( 'ShoutsController', function( $scope, $http, $route, $routeParams ) {
	var method = 'artist.getshouts'
	,	limit = '&limit=15'
	,	combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
});

// fan list
lastfm.controller( 'FansController', function( $scope, $http ) {
	var method = 'artist.gettopfans'
	,	limit = '&limit=15'
	,	combined = lastfm.url + method + lastfm.artist + limit

	$scope.data = dataComm( $scope, $http, combined, 'GET' )
});

// /////////////////////////////////////////////////////// twitter
twtr = angular.module('twtr', []);
twtr.url = '';

// stream
twtr.controller( 'streamController', function( $scope, $http ) {
	// stuff defined here
});

// search results
twtr.controller( 'searchController', function( $scope, $http ) {
	// stuff defined here
});
