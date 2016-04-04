// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state', '$stateParams', 'discService', 
	function( $scope, discog, $state, $stateParams, discService ){
	// discography list
	$scope.title = 'Discography list'
	$scope.data = discog.rekkids
	
	console.dir( $scope.$parent.filterD )
	// scope either has to be re-applied after the filter is fired off
	// OR
	// add services watch filter to grab new scope data
	// $scope.transfer = function( key ) {
	// 	console.log( "key is " + key )
	// 	console.dir( $scope.data[key] )

	// 	discService.itemAdd( $scope.data[key] )

	// }

}])

proem.controller('DiscController', ['$scope', '$stateParams', '$state', 'discService', 'discog', '$filter', 
	function( $scope, $stateParams, $state, discService, discog, $filter ){
	// discography single item
	$scope.title = 'Discography detail'

	// this is probably not the right way to do this
	// its terribly hardcoded to MY data... but baby steps!
	
	var newQ = ''

	$scope.$watch('query', function( newQ, oldQ ) {
		$scope.id = $stateParams.discID

		console.log("filter box:", newQ);

		// this is the JS equivalent of "data | filter: newQ"
 		// $scope.filteredArray = $filter('filter')($scope.data, newQ);   
		console.dir( $scope.filterD )
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
