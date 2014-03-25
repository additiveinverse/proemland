angular.module('directives', []).
	directive('toggler', ['$parse', function( $parse ) {
		return {
			restrict: 'EA',
			link: function( scope, element, attrs ) {
				var classy = attrs.class.split(' ')
				,   ev 			= 'click' /* gonna make this hard coded for now */
				,   elem 		= attrs.elem != undefined ? attrs.elem : 'self'
				,   prefix 		= elem.charAt(0) === "#" || elem.charAt(0) === "." ? elem.substr(1) : elem
				,   elemprefix 	= classy.pop()
				,   TXTactive 	= 'active'
				,   elemClass 	= [elemprefix, TXTactive].join('-') + ' ' + TXTactive
				,   trgrClass 	= [prefix, TXTactive].join('-')

				element.on( ev , function( e ) {
					console.dir( e );
					// console.log("Clicked", this, arguments);
					trgt = e.currentTarget;

					// element.parent().children().removeClass( elemClass );
					element.toggleClass( elemClass );
//					element.siblings().removeClass( elemClass );

					// // elem != '' ? element.find( elem ).toggleClass( trgrClass ) : null;
					// e.currentTarget != e.currentTarget ? element.find( elem ).removeClass( trgrClass ) : null;
				})
			}
		}
	}]).
	directive('clonee', ['$parse', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {

			}
		};
	}]);

// httpQuery takes a URL and returns a function that accepts a query string,
// and will make a request to the given URL when invoked.
// the fn returned by httpQuery ensures that only one request is made to
// the given URL at a time, cancalling in-flight requests  before they complete

proem.factory( 'httpQuery', function ( $http, $q ) {
	return function ( url )	{
		var cancelQuery = null;

		return function runQuery( query ) {
			// if we were running a query before,
			// cancel it so it doesn't invoke its success callback
			if ( cancelQuery ) {
				cancelQuery.resolve();
			}

			cancelQuery = $q.defer();

			return $http.
				get( url, {
						params: { query: query }
					,	timeout: cancelQuery.promise
					}).
				then( function ( response ) {
						cancelQuery = null;
						return response.data;
				});
		}
	}
});