// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state', '$stateParams', 'discService', '$filter',
	function( $scope, discog, $state, $stateParams, discService, $filter ) {
		// discography list
		$scope.title = 'Discography list'
		$scope.data = discog.rekkids


		$scope.checked = false

		$scope.select_item = function( key ) {
			discService.itemAdd( $scope.filterD[ key ] )
		}
	}
])

proem.controller('DiscController', ['$scope', '$stateParams', '$state', 'discService', 'discog', '$filter', 
	function( $scope, $stateParams, $state, discService, discog, $filter ) {
		var newQ = ''

		// discography single item
		$scope.title = 'Discography detail'

		// this is probably not the right way to do this
		$scope.$watch('query', function( newQ, oldQ ) {
			$scope.data = discService.itemGet()
			$scope.checked = true
		})
	}
])

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
