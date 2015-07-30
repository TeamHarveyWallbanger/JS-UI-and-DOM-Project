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
		},

        chance: function(percentageChance, func) {

            var params,
                randomNumber;

            if(!(percentageChance > 0 && percentageChance < 101)) {
                throw new Error('Percentage must be between 1 and 100!');
            }

            if(arguments.length > 2) {
                params = arguments.slice(2, arguments.length - 1).map(Number);
            }

            params = params || [];

            randomNumber = Helper.randomIntInRange(0, 99);

            if(randomNumber <= percentageChance) {
                return func.apply(func, params);
            }

            else {
                return;
            }
        }
	};
})();
