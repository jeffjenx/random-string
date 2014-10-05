function generate( )
{
	var availableCharacters = [ ];
	var length = parseInt( document.getElementById( 'length' ).value );
	var randomString = "";
	var response = document.getElementById( 'response' );
	var unique = false;
	var availablePhonetics = [ ];
	
	if( document.getElementById( 'lowercase' ).checked )
	{
		availableCharacters.push( "abcdefghijklmnopqrstuvwxyz" );
		availablePhonetics.push( "alfa,bravo,charlie,delta,echo,foxtrot,golf,hotel,india,juliet,kilo,lima,mike,november,oscar,papa,quebec,romeo,sierra,tango,uniform,victor,whiskey,x&#8209;ray,yankee,zulu," );
	}
	
	if( document.getElementById( 'uppercase' ).checked )
	{
		availableCharacters.push( "ABCDEFGHIJKLMNOPQRSTUVWXYZ" );
		availablePhonetics.push( "ALFA,BRAVO,CHARLIE,DELTA,ECHO,FOXTROT,GOLF,HOTEL,INDIA,JULIET,KILO,LIMA,MIKE,NOVEMBER,OSCAR,PAPA,QUEBEC,ROMEO,SIERRA,TANGO,UNIFORM,VICTOR,WHISKEY,X&#8209;RAY,YANKEE,ZULU," );
	}
	
	if( document.getElementById( 'numeric' ).checked )
	{
		availableCharacters.push( "0123456789" );
		availablePhonetics.push( "Zero,One,Two,Three,Four,Five,Six,Seven,Eight,Nine," );
	}
	
	if( document.getElementById( 'separators' ).checked )
	{
		availableCharacters.push( "_-" );
		availablePhonetics.push( "Underscore,Hyphen," );
	}
	
	if( document.getElementById( 'punctuation' ).checked )
	{
		availableCharacters.push( "!@#$%&'\":;,.?" );
		availablePhonetics.push( "Exclamation&#8209;Point,Ampersat,Pound,Dollar,Percent,Ampersand,Single&#8209;Quote,Double&#8209;Quote,Colon,Semi&#8209;Colon,Comma,Period,Question&#8209;Mark," );
	}
	
	if( document.getElementById( 'math' ).checked )
	{
		availableCharacters.push( "+=^*~\\/" );
		availablePhonetics.push( "Plus,Equals,Carat,Asterisk,Tilde,Backslash,Forward&#8209;Slash," );
	}
	
	if( document.getElementById( 'brackets' ).checked )
	{
		availableCharacters.push( "(){}[]<>" );
		availablePhonetics.push( "Open&#8209;Parenthesis,Close&#8209;Parenthesis,Open&#8209;Curly&#8209;Brace,Close&#8209;Curly&#8209;Brace,Open&#8209;Square&#8209;Bracket,Close&#8209;Square&#8209;Backet,Open&#8209;Angle&#8209;Bracket,Close&#8209;Angle&#8209;Bracket," );
	}
	
	phonetics = { };
	for( var i = 0; i < availableCharacters.length; i++ )
	{
		var keys = availableCharacters[ i ].split( '' );
		var values = availablePhonetics[ i ].split( ',' );
		
		for( var j in keys )
		{
			phonetics[ keys[ j ] ] = values[ j ];
		}
		
		if( document.getElementById( 'distinctive' ).checked )
		{
			availableCharacters[ i ] = availableCharacters[ i ].replace( /[i1IloO05S.,:;]/, "" );
		}
	}
	
	if( document.getElementById( 'nonrepeating' ).checked )
	{
		nonrepeating = true;
	}
	
	if( availableCharacters.length == 0 )
	{
		response.innerHTML = '<div id="verbal_response">pool of characters is empty</div>';
		response.style.display = 'block';
		response.style.marginLeft = ( window.innerWidth - response.offsetWidth ) / 2 + 'px';
		return;
	}
	
	if( availableCharacters.length > length )
	{
		response.innerHTML = '<div id="verbal_response">number of character sets exceeds length</div>';
		response.style.display = 'block';
		response.style.marginLeft = ( window.innerWidth - response.offsetWidth ) / 2 + 'px';
		return;
	}
	
	for( var i = 0; i < availableCharacters.length; i++ )
	{
		randomString += availableCharacters[ i ].charAt( Math.floor( Math.random( ) * availableCharacters[ i ].length ) );
		length--;
	}
	
	while( length-- )
	{
		var nextCharacter;
		
		if( nonrepeating )
		{
			var previousCharacter = randomString.substring( randomString.length - 1 );
			do
			{
				var randomCharacterSet = availableCharacters[ Math.floor( Math.random( ) * availableCharacters.length ) ];
				nextCharacter = randomCharacterSet.charAt( Math.floor( Math.random( ) * randomCharacterSet.length ) );
			}
			while( nextCharacter == previousCharacter );
		}
		else
		{
			var randomCharacterSet = availableCharacters[ Math.floor( Math.random( ) * availableCharacters.length ) ];
			nextCharacter = randomCharacterSet.charAt( Math.floor( Math.random( ) * randomCharacterSet.length ) );
		}
		
		randomString += nextCharacter;
	}
	
	var randomString = randomString.split( '' ).sort( function( ) { return 0.5 - Math.random( ) } ).join( '' );
	
	response.innerHTML = randomString.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' ).replace( /'/g, '&#039;' );
	
	if( document.getElementById( 'phonetics' ).checked )
	{
		var speech = "";
		for( var i = 0, len = randomString.length; i < len; ++i )
		{
			if( i )
			{
				speech += " ";
			}
			speech += phonetics[ randomString[ i ] ];
		}
		response.innerHTML += '<div id="verbal_response">' + speech + '</div>';
	}
	
	response.style.display = 'block';
	response.style.marginLeft = ( window.innerWidth - response.offsetWidth ) / 2 + 'px';
}

function highlight( element )
{
	var range = document.createRange( );
	range.selectNode( element );
	window.getSelection( ).addRange( range );
}

function toggleOptions( toggle )
{
	var more = document.getElementById( 'more' );
	
	if( more.style.display == "block" )
	{
		more.style.display = "none";
		toggle.innerHTML = "More Options";
	}
	else
	{
		more.style.display = "block";
		toggle.innerHTML = "Less Options";
	}
}

window.addEventListener( 'load', function( )
{
	var inputs = document.getElementsByTagName( 'input' );
	for( var i = 0, len = inputs.length; i < len; ++i )
	{
		var input = inputs[ i ];
		if( input.type.toLowerCase( ) == 'checkbox' )
		{
			// Create toggle switches
			var toggle = '<div class="toggle">' + input.outerHTML + '<label for="' + input.id + '"></label></div>';
			input.outerHTML = toggle;
		}
		else if( input.type.toLowerCase( ) == 'text' )
		{
			// Handle length selector
			input.addEventListener( 'focus', function( )
			{
				this.select( );
			} );
			
			input.addEventListener( 'keypress', function( e )
			{
				var charCode = ( e.which ) ? e.which : event.keyCode;
				if( charCode > 31 && ( charCode < 48 || charCode > 57 ) )
				{
					e.preventDefault( );
					return false;
				}
				return true;
			} );
		}
	}
} );