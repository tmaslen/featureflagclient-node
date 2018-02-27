const assert = require( "chai" ).assert;
const expect = require( "chai" ).expect;
const sinon  = require( "sinon" );
const get    = require( "simple-get" );

const F2c = require( "../index" );

describe( "F2c", () => {

	it( "get() method", () => {

		const f2c = new F2c( null, {
			"trueBoolean": true,
			"falseBoolean": false,
			"number": 33,
			"array": [ 1, 2 ],
			"object": { "foo": "bar" },
			"text": "laserwolf"
		});

		expect( f2c.get( "notDefined" )   ).to.equal( null );
		expect( f2c.get( "trueBoolean" )  ).to.equal( true );
		expect( f2c.get( "falseBoolean" ) ).to.equal( false );
		expect( f2c.get( "number" )       ).to.equal( 33 );
		expect( f2c.get( "array" )        ).to.deep.equal( [ 1, 2 ] );
		expect( f2c.get( "object" )       ).to.deep.equal( { "foo": "bar" } );
		expect( f2c.get( "text" )         ).to.equal( "laserwolf" );

	});

	it( "when() method", () => {

		const f2c = new F2c( null, {
			"trueBoolean": true,
			"falseBoolean": false,
			"number": 33,
			"text": "laserwolf"
		});

		f2c.when( "notDefined" )
			//.is( f2c._anyValue, () => assert.fail() )
			.else( () => assert.isOk( true ) );

		f2c.when( "trueBoolean" )
			.is( true, () => assert.isOk( true ) )
			.is( false, () => assert.fail() )
			.else( () =>  () => assert.fail() );

		f2c.when( "falseBoolean" )
			.is( true, () => assert.fail() )
			.is( false, () => assert.isOk( true ) )
			.else( () =>  assert.fail() );

		f2c.when( "number" )
			.is( 33, () => assert.isOk( true ) )
			.else( () => assert.fail() );


		f2c.when( "text" )
			.is( "laserwolf", () => assert.isOk( true ) )
			.else( () => assert.fail() );

	});

	describe( "Constructor method", () => {

		it( "Override feature flag values", () => {

			const mockedGetConcat = sinon.stub( get, "concat" );

			mockedGetConcat.yields(
				null,
				{
					"statusCode": 200
				},
				{
					"foo": true,
					"bar": true
				}
			);

			const f2c = new F2c(
				"https://featureflag.tech/node/exampleflag.json",
				{
					"foo": false
				}
			);

			f2c.getSourceFile();

			expect( f2c.get( "foo" ) ).to.be.false;
			expect( f2c.get( "bar" ) ).to.be.true;

			mockedGetConcat.restore();

		});

		it( "Should return a rejected promise if source file is 404", ( done ) => {

			const mockedGetConcat = sinon.stub( get, "concat" );

			mockedGetConcat.yields(
				new Error( "404: file not found" ),
				{
					"statusCode": 404
				},
				{}
			);

			const f2c = new F2c( "https://featureflag.tech/node/exampleflag.json" );

			f2c.getSourceFile()
				.then( () => {
					done( new Error( "Promise did not reject" ) );
				})
				.catch( ( err ) => {
					assert.isOk( true );
					done();
				});

			mockedGetConcat.restore();

		});

		it( "Should return a resolved promise if source file is 200", ( done ) => {

			const mockedGetConcat = sinon.stub( get, "concat" );

			mockedGetConcat.yields(
				null,
				{
					"statusCode": 200
				},
				{}
			);

			const f2c = new F2c( "https://featureflag.tech/node/exampleflag.json" );

			f2c.getSourceFile()
				.then( () => {
					assert.isOk( true );
					done();
				})
				.catch( ( err ) => {
					done( new Error( "Promise rejected" ) );
				});

			mockedGetConcat.restore();

		});

	});

});