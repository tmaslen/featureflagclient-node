const get = require( "simple-get" );

const EmptyF2c = function() {}

EmptyF2c.prototype = {
	"is": function() { return this; },
	"else": function() {}
}

const F2c = function ( sourceUrl, localFeatureFlags ) {
	this._emptyF2c = new EmptyF2c();
	this.sourceUrl = sourceUrl || null;
	this._features = localFeatureFlags || {};
};

F2c.prototype = {
	"_whenedFeature": null,
	"get": function ( feature ) {
		if ( feature in this._features ) {
			return this._features[ feature ];
		}
		return null;
	},
	"when": function ( feature ) {
		if ( feature in this._features ) {
			this._whenedFeature = this._features[ feature ];
		}
		return this;
	},
	"is": function ( value, callback ) {
		if ( this._whenedFeature == value ) {
			this._whenedFeature = null;
			callback();
			return this._emptyF2c;
		}
		return this;
	},
	"else": function ( callback ) {
		callback();
	},
	"getSourceFile": function () {
		return new Promise( ( resolve, reject ) => {

			get.concat( {
				"url": this.sourceUrl,
				"json": true
			}, ( err, res, data ) => {
				if ( err || ( res.statusCode != 200 ) ) {
					reject( err || new Error( "Source file not found" ) );
					return;
				}
				Object.keys( data ).forEach( ( key ) => {
					this._features[ key ] = ( key in this._features ) ? this._features[ key ] : data[ key ];
				});
				resolve();
			})

		});
	}
}

module.exports = F2c; 