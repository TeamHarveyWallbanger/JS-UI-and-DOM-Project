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

        calculateRectColliderToImagePosition: function(position, width, height, imageWidth, imageHeight) {
            var result = new Position(0, 0),
                widthDifference = Math.abs(width - imageWidth),
                heighDifference = Math.abs(height - imageHeight);

            result.x = position.x - (widthDifference / 2);
            result.y = position.y - heighDifference;

            return result;
        },

        distance: function(first, second) {
        	var xDiff = first.x - second.x,
        		yDiff = first.y - second.y;

    		return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
        },

        removeArrayNulls: function(arr) {
            var i,
                len,
                indices = [];

            for (i = 0, len = arr.length; i < len; i+=1) {
                if (arr[i] === null) {
                    indices.push(i);
                }
            }

            for (i = 0, len = indices.length; i < len; i+=1) {
                arr.splice(indices[i], 1);
            }
        }
	};
})();
