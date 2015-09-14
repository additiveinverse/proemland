angular.module( 'direcTives', [] ).
directive( 'toggler', [ '$parse', function ( $parse ) {
	return {
		restrict: 'EA',
		link: function ( scope, element, attrs ) {
			var classy = attrs.class.split( ' ' ),
				ev = 'click' /* gonna make this hard coded for now */ ,
				elem = attrs.elem !== undefined ? attrs.elem : 'self',
				prefix = elem.charAt( 0 ) === "#" || elem.charAt( 0 ) === "." ? elem.substr( 1 ) : elem,
				elemprefix = classy.pop(),
				TXTactive = 'active',
				elemClass = [ elemprefix, TXTactive ].join( '-' ) + ' ' + TXTactive,
				trgrClass = [ prefix, TXTactive ].join( '-' )

			element.on( ev, function ( e ) {
				trgt = e.currentTarget
				element.parent().children().removeClass( elemClass )
				element.addClass( elemClass )
			} )
		}
	}
} ] )
