const get = require( "simple-get" );

const EmptyF2c = function() {}

EmptyF2c.prototype = {
	"is": function() { return this; },
	"else": function() {}
}

const F2c = function ( sourceUrl ) {
	this._emptyF2c = new EmptyF2c();
	this.sourceUrl = sourceUrl || null;
};

F2c.prototype = {
	"_features": {},
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

			get.concat( this.sourceUrl, ( err, res, data ) => {
				if ( err || ( res.statusCode != 200 ) ) {
					reject( err );
					return;
				}
				this._features = JSON.parse( data );
				resolve();
			})

		});
	}
}

module.exports = F2c; 