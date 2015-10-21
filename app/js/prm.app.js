proem = angular.module( "appProem", [ "ngRoute", "ngSanitize", "ngAnimate", "direcTives", "smoothScroll" ] )

// angular.element( document ).ready( function () {
// 	angular.bootstrap( document, [ "appProem" ] )
// } )

proem.config( function ( $routeProvider, $locationProvider ) {
	$routeProvider.when( "dls", {
			templateUrl: "app/partials/itm-walls.html",
			controller: "DlsController"
		} )
		.otherwise( {
			redirectTo: "",
			templateUrl: "app/partials/itm-single.html",
			controller: "ProductsController"
		} )
} )

// this should probably be a factory or maybe even a service
var dataComm = function ( $scope, $http, url, method ) {
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
		console.log( "status: " + status )
		// console.dir( config )
	} )
}
