// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state', '$stateParams', function( $scope, discog, $state, $stateParams ){
	// discography list
	$scope.id = $stateParams.discID
	$scope.title = 'Discography list'
	$scope.data = discog
}])

proem.controller('DiscController', ['$scope', 'discog', '$stateParams', '$state', function( $scope, discog, $stateParams, $state ){
	// discography single item
	$scope.id = $stateParams.discID
	$scope.title = 'Discography detail'

	// this is probably not the right way to do this
	// its terribly hardcoded to my data... but baby steps!
	$scope.data = discog.rekkids[ $scope.id ]
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
