var Helper = (function() {
	return {
		randomIntInRange: function(min, max) {
			if (typeof(min) !== 'number') {
				throw {
					name: 'NotNumberMin',
					message: 'Min must be of type number.'
				};
			}

			if (typeof(max) !== 'number') {
				throw {
					name: 'NotNumberMax',
					message: 'Max must be of type number.'
				};
			}

			if (min >= max) {
				throw {
					name: 'MinNotLessThanMax',
					message: 'Min must be less than max.'
				};
			}

			var diff = max - min;
			return ((Math.random() * diff) + min) | 0;
		}
	};
})();
