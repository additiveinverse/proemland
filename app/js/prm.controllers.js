// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state', '$stateParams', 'discService', '$filter',
	function( $scope, discog, $state, $stateParams, discService, $filter ){
	// discography list
	$scope.title = 'Discography list'
	$scope.data = discog.rekkids

	// scope either has to be re-applied after the filter is fired off
	// OR
	// add services watch filter to grab new scope data
	$scope.select_item = function( key ) {
		console.log( "key is " + key )

		discService.itemAdd( $scope.filterD[ key ] )
	}

}])

proem.controller('DiscController', ['$scope', '$stateParams', '$state', 'discService', 'discog', '$filter', 
	function( $scope, $stateParams, $state, discService, discog, $filter ){
	var newQ = ''

	// discography single item
	$scope.title = 'Discography detail'
	$scope.id = $stateParams.discID

	// this is probably not the right way to do this
	$scope.$watch('query', function( newQ, oldQ ) {

		console.log("filter box:", newQ);
		console.dir( discService.itemGet() )
		// this is the JS equivalent of "data | filter: newQ"
 		// $scope.filteredArray = $filter('filter')($scope.data, newQ);   
		$scope.data = discService.itemGet()
	})
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
