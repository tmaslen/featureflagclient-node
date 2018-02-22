# FeatureFlagClient

Allows you to use feature flags in your code, works with any JSON feature flag service.

Features:

 * Stops you from littering your code with `if` statements.
 * Extremely light-weight ( < 60 lines of code, 1 dependency ).
 * Feature flag service agnostic.
 * Serverless runtime support (NodeJS 6.10 compliant, will work on AWS Lambda)

Awesome API means you don't use `if` statements in your code:

```
featureflagclient.when( "newFeature" )
	.is( true, () => {
		// do the new stuff
	});
```

But will let you use `if` statements if you want to:

```
if ( featureflagclient.get( "newFeature" ) ) {
	// do some stuff
}
```

Created by [featureflag.tech](https://featureflag.tech).

## Install

```
npm install featureflagclient --save
```

## Usage

```
const Featureflagclient = require( "featureflagclient-node" );

const featureflagclient = new Featureflagclient( "http://featureflag.tech/node/exampleflag.json" );

featureflagclient.getSourceFile().then( () => {

	featureflagclient.when( "newFeature" )
		.is( true, () => {
			// do the new stuff
		})
		.is( false, () => {
			// do the old stuff
		})
		.else( () => {
			// do default stuff
		});

	if ( f2t.get( "newFeature" ) ) {
		// do some stuff
	}

}).catch( console.log );

if ( featureflagclient.get( "newFeature" ) ) {
	// do some stuff
}

```

## Develop

Check the project out:

```
git clone 
```

Install deps:

```
npm install
```

Run the unit tests:

```
npm test
```

Run the integration tests:

```
node test/integrationTests.js
```