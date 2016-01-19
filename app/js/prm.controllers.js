// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', function( $scope, discog, $state ){

	$scope.title = 'Discography list'
	$scope.data = discog

	console.dir( $scope.data.rekkids )
})

proem.controller('DiscController', function( $scope, disc, $stateParams ){
	// discography single item

	$scope.title = 'Discography detail'
	$scope.data = disc
})

proem.controller( "DLController", function ( $scope, $http, $controller ) {
	var url = "dl.json"

	// $scope.data = dataComm( $scope, $http, url, "GET")
})

// /////////////////////////////////////////////////////// spotify junk
proem.sptfy = angular.module( "appSptfy", [ ] )
proem.sptfy.url = ''

// /////////////////////////////////////////////////////// twitter
proem.twttr = angular.module( "appTwttr", [ ] )
proem.twttr.url = '';