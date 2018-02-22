const assert = require( "chai" ).assert;
const expect = require( "chai" ).expect;

const F2c = require( "../index" );

describe( "F2c", () => {

	it( "get() method", () => {

		const f2c = new F2c();

		f2c._features = {
			"trueBoolean": true,
			"falseBoolean": false,
			"number": 33,
			"array": [ 1, 2 ],
			"object": { "foo": "bar" },
			"text": "laserwolf"
		};

		expect( f2c.get( "notDefined" )   ).to.equal( null );
		expect( f2c.get( "trueBoolean" )  ).to.equal( true );
		expect( f2c.get( "falseBoolean" ) ).to.equal( false );
		expect( f2c.get( "number" )       ).to.equal( 33 );
		expect( f2c.get( "array" )        ).to.deep.equal( [ 1, 2 ] );
		expect( f2c.get( "object" )       ).to.deep.equal( { "foo": "bar" } );
		expect( f2c.get( "text" )         ).to.equal( "laserwolf" );

	});

	it( "when() method", () => {

		const f2c = new F2c();

		f2c._features = {
			"trueBoolean": true,
			"falseBoolean": false,
			"number": 33,
			"text": "laserwolf"
		};

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

});