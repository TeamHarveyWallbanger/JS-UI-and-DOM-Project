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
                randomResult;

            if(typeof (func) !== 'function') {
                throw new Error('Func parameter is not a function!');
            }

            if ((typeof(percentageChance) !== 'number') || (percentageChance < 1 || 100 < percentageChance)) {
                throw new Error('Percentage must be a number between 1 and 100!');
            }

			params = [].slice.call(arguments, 2);

            randomResult = Helper.randomIntInRange(0, 100);

            if (randomResult < percentageChance) {
                func.apply(func, params);
            }
        },

        calculateRectColliderToImagePosition: function(position, width, height, image) {

            var result = new Position(0, 0),
                widthDifference = Math.abs(width - image.width),
                heightDifference = Math.abs(height - image.height);

            result.x = position.x - (widthDifference / 2);
            result.y = position.y - heightDifference;

            return result;
        }
	};
})();
