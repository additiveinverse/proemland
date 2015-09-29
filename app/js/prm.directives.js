angular.module( 'direcTives', [] ).
directive( 'toggler', [ '$parse', function ( $parse ) {
	return {
		restrict: 'EA',
		link: function ( scope, element, attrs ) {
			var classy = attrs.class.split( ' ' )
			var ev = 'click' /* gonna make this hard coded for now */
			var elem = attrs.elem !== undefined ? attrs.elem : 'self'
			var prefix = elem.charAt( 0 ) === "#" || elem.charAt( 0 ) === "." ? elem.substr( 1 ) : elem
			var elemprefix = classy.pop()
			var TXTactive = 'active'
			var elemClass = [ elemprefix, TXTactive ].join( '-' ) + ' ' + TXTactive
			var trgrClass = [ prefix, TXTactive ].join( '-' )

			element.on( ev, function ( e ) {
				console.log(element)

				if ( e.currentTarget == elem ) {
					element.removeClass( elemClass )
				} else {
					element.parent().children().removeClass( elemClass )
				}

				element.addClass( elemClass )
			} )
		}
	}
} ] )
