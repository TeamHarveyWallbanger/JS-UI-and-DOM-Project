var Background = (function() {

	function set_PatterRect(layer, image, width, height) {
		if (!(layer instanceof Kinetic.Layer)) {
			throw {
				name: 'NotInstanceOfLayer',
				message: 'Layer must be an instance of Kinetic.Layer.'
			}
		}

		if (!(image instanceof Image)) {
			throw {
				name: 'NotInstanceOfImage',
				message: 'Image must be an instance of Image.'
			}
		}

		if ((typeof(width) !== 'number') || (width <= 0)) {
			throw {
				name: 'InvalidWidth',
				message: 'Width must be a number greater than 0.'
			};
		}

		if ((typeof(height) !== 'number') || (height <= 0)) {
			throw {
				name: 'InvalidHeight',
				message: 'Height must be a number greater than 0.'
			};
		}

    	this._patternRect = new Kinetic.Rect({
    		x: 0,
    		y: 0,
    		width: width,
    		height: height,
    		fillPatternImage: image
    	});

    	layer.add(this._patternRect);
	}

    function Background(layer, image, width, height) {
    	set_PatterRect.call(this, layer, image, width, height);

    	this._offset = 0;
    }

    Background.prototype.updateX = function(update) {
    	this._offset = (this._offset + update) % this._patternRect.getWidth();
        this._patternRect.fillPatternOffsetX(this._offset);
    };

    return Background;
})();
