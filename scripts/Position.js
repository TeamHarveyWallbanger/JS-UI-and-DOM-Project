var Position = (function() {
	function Position(x, y) {
		this.x = x;
		this.y = y;
	}

	Object.defineProperties(Position.prototype, {
		x: {
			configurable: false,
			enumerable: true,
			get: function() {
				return this._x;
			},
			set: function(value) {
				if (typeof(value) !== 'number') {
					throw {
						'NotNumberX',
						'X must be of type number.'
					};
				}

				this._x = x;
			}
		},
		y: {
			configurable: false,
			enumerable: true,
			get: function() {
				return this._y;
			},
			set: function(value) {
				if (typeof(value) !== 'number') {
					throw {
						'NotNumberY',
						'Y must be of type number.'
					};
				}

				this._y = y;
			}
		}

	});

	return Position;
})();