var Hero = (function hero() {
    function getRunningAnimation(image) {
        var i,
            frameWidth = image.width / 6,
            frameHeight = image.height / 3,
            result = [];

        for (i = 0; i < 6; i+=1) {
            result.push(frameWidth * i);
            result.push(0);
            result.push(frameWidth);
            result.push(frameHeight);
        }

        return result;
    }

    function getJumpingAnimation(image) {
        var i,
            frameWidth = image.width / 6,
            frameHeight = image.height / 3,
            result = [];

        for (i = 0; i < 5; i+=1) {
            result.push(frameWidth * i);
            result.push(frameHeight);
            result.push(frameWidth);
            result.push(frameHeight);
        }

        return result;
    }

    function getFallingAnimation(image) {
        var i,
            frameWidth = image.width / 6,
            frameHeight = image.height / 3,
            result = [];

        for (i = 4; i < 6; i+=1) {
            result.push(frameWidth * i);
            result.push(frameHeight * 2);
            result.push(frameWidth);
            result.push(frameHeight);
        }

        return result;
    }

    function set_position(value) {
        if (!(value instanceof Position)) {
            throw {
                name: 'NotInstanceOfPosition',
                message: 'Position must be an instance of Position.'
            };
        }

        this._position = value;
    }

    function set_width(value) {
        if (typeof(value) !== 'number' || value <= 0) {
            throw {
                name: 'InvalidWidth',
                message: 'Width must be a number greater than 0.'
            };
        }

        this._width = value;
    }

    function set_height(value) {
        if (typeof(value) !== 'number' || value <= 0) {
            throw {
                name: 'InvalidHeight',
                message: 'Height must be a number greater than 0.'
            };
        }

        this._height = value;
    }

    function set_Sprite(layer, image) {
        if (!(layer instanceof Kinetic.Layer)) {
            throw {
                name: 'NotInstanceOfLayer',
                message: 'Layer must be an instance of Kinetic.Layer.'
            };
        }

       if (!(image instanceof Image)) {
            throw {
                name: 'NotInstanceOfImage',
                message: 'Image must be an instance of Image.'
            };
        }

        var spritePosition = Helper.calculateRectColliderToImagePosition(this._position, this._width, this._height, image);

        this._sprite = new Kinetic.Sprite({
            x: spritePosition.x,
            y: spritePosition.y,
            image: image,
            animation: 'running',
            animation: {
                running: getRunningAnimation(image),
                jumping: getJumpingAnimation(image),
                falling: getFallingAnimation(image)
            },
            frameRate: 10,
            frameIndex: 0
        });

        layer.add(this._sprite);
    }


    function Hero(layer, image, position, width, height) {
        set_position.call(this, position);

        set_width.call(this, width);
        set_height.call(this, height);

        set_Sprite.call(this, layer, image);

        this._runing = true;
        this._jumping = false;
        this._falling = false;
    }

    Object.defineProperties(Hero.prototype, {
        running: {
            get: function() {
                return this._runing;
            }
        },

        jumping: {
            get: function() {
                return this._jumping;
            }
        },

        falling: {
            get: function() {
                return this._falling;
            }
        }

    });

    return Hero;
}());