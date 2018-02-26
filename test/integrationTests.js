const F2c = require( "../index" );

function test404SourceFile () {


	const f2c = new F2c( "https://featureflag.tech/noFlagHere.json" );
	
	f2c.getSourceFile()
		.then( () => {

			console.log( "F2c should reject when requesting a source file that DOES NOT exist" );
			console.log( " - FAIL: promise should reject when no source file is found." );

		})
		.catch( ( err ) => {

			console.log( "F2c should reject when requesting a source file that DOES NOT exist" );
			console.log( " - PASS" );

		});

}

function test200SourceFile () {


	const f2c = new F2c( "https://featureflag.tech/node/exampleflag.json" );

	f2c.getSourceFile().then( () => {

		console.log( "F2c should resolve when requesting a source file that DOES exist" );
		console.log( " - PASS" );

		console.log( "F2c should return parsed JSON" );
		if ( f2c.get( "array" )[ 0 ] == 1 ) {
			console.log( " - PASS" );
		}
		else {
			console.log( " - FAIL: response is not JSON" );
		}

	}).catch( ( err ) => {

		console.log( "****" );
		console.log( err );
		console.log( "****" );

		console.log( "F2c should resolve when requesting a source file that DOES exist" );
		console.log( " - FAIL: promise should not reject when a source file is found." );

	});

}

test404SourceFile();
test200SourceFile();