// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$stateParams', function( $scope, discog, $stateParams ){
	$scope.title = 'Discography list'
	$scope.data = discog
	// console.dir( $scope.data.rekkids )
}])

proem.controller('DiscController', ['$scope', 'disc', '$stateParams', function( $scope, disc, $stateParams ){
	// discography single item

	$scope.title = 'Discography detail'
	$scope.data = disc
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
