// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$stateParams', function( $scope, discog, $stateParams ){
	$scope.title = 'Discography list'
	$scope.data = discog
}])

proem.controller('DiscController', ['$scope', 'discog', '$stateParams', function( $scope, discog, $stateParams ){
	// discography single item

	$scope.title = 'Discography detail'

	console.log( $scope.title )
	console.dir( $scope.$id )
}])

// /////////////////////////////////////////////////////// spotify junk
proem.sptfy = angular.module( "appSptfy", [ ] )
proem.sptfy.url = ''
proem.sptfy.controller('PlaylistController', ['', function(){

}])

// /////////////////////////////////////////////////////// twitter
proem.twttr = angular.module( "appTwttr", [ ] )
proem.twttr.url = '';
proem.twttr.controller('TimelineController', ['', function(){

}])
