proem.controller('paneController', ['$scope', function( $scope ){

	}
])

// /////////////////////////////////////////////////////// Proemland
proem.controller('DiscographyController', ['$scope', 'discog', '$state', '$stateParams', 'discService', '$filter', 'panels',
	function( $scope, discog, $state, $stateParams, discService, $filter, panels ) {
		// discography list
		$scope.title = "Discography list"
		$scope.data = discog.rekkids

		$scope.select_item = function( key ) {
			discService.itemAdd( $scope.filterD[ key ] )
			panels.open("panelDetail");
		}
	}
])

proem.controller('DiscController', ['$scope', '$stateParams', '$state', 'discService', 'discog', '$filter',
	function( $scope, $stateParams, $state, discService, discog, $filter ) {
		var newQ = ""

		// discography single item
		$scope.title = "Discography detail"

		// this is probably not the right way to do this
		$scope.$watch("query", function( newQ, oldQ ) {
			$scope.data = discService.itemGet()

		})
	}
])

// /////////////////////////////////////////////////////// spotify junk
proem.sptfy = angular.module( "appSptfy", [ ] )
proem.sptfy.url = ""
proem.sptfy.controller('PlaylistController', ['', function(){

}])

// /////////////////////////////////////////////////////// twitter
proem.twttr = angular.module( "appTwttr", [ ] )
proem.twttr.url = "https://userstream.twitter.com/1.1/user.json";
proem.twttr.controller('TimelineController', ["$scope", "$state","$stateParams",
	function( $scope, $state, $stateParams ) {
		$scope.data = ""

	}
])
