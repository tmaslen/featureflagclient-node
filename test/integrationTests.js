const F2c = require( "../index" );

function test404SourceFile () {


	const f2c = new F2c( "http://featureflag.tech/noFlagHere.json" );
	
	f2c.getSourceFile()
		.then( () => {

			console.log( "F2c should reject when requesting a source file that DOES NOT exist" );
			console.log( " - FAIL: promise should reject when no source file is found." );

		})
		.catch( () => {

			console.log( "F2c should reject when requesting a source file that DOES NOT exist" );
			console.log( " - PASS" );

		});

}

function test200SourceFile () {


	const f2c = new F2c( "http://featureflag.tech/node/exampleflag.json" );

	f2c.getSourceFile().then( () => {

		console.log( "F2c should resolve when requesting a source file that DOES exist" );
		console.log( " - PASS" );

	}).catch( () => {

		console.log( "F2c should resolve when requesting a source file that DOES exist" );
		console.log( " - FAIL: promise should not reject when a source file is found." );

	});

}

test404SourceFile();
test200SourceFile();