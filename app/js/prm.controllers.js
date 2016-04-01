// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state',  function( $scope, discog, $state, $stateParams ){
	// discography list
	$scope.title = 'Discography list'
	$scope.data = discog

	// scope either has to be re-applied after the filter is fired off
	// OR
	// we need to make a custom filter to grab the new scope data
	$scope.filtered = function () {
		$scope.$apply();
	}

}])

proem.controller('DiscController', ['$scope', 'discog', '$stateParams', '$state', function( $scope, discog, $stateParams, $state ){
	// discography single item

	$scope.title = 'Discography detail'
	$scope.id = $stateParams.discID

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
