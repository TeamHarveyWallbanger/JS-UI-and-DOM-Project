var Obstacle = (function () {

    function privateSetImage(layer, image) {

        if(!(layer instanceof Kinetic.Layer)) {
            throw new Error('Layer must be an instance of Kinetic.Layer!');
        }

        if(!(image instanceof Image)) {
            throw new Error('Image must be an instance of Image!');
        }

        var imagePosition = Helper.calculateRectColliderToImagePosition(this.position, this.width, this.height, image);

        this._image = new Kinetic.Image({
            image: image,
            x: imagePosition.x,
            y: imagePosition.y
        });

        layer.add(this._image);
    }

    function Obstacle(layer, image, position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
        privateSetImage.call(this, layer, image);
    }

    Obstacle.prototype.updateX = function(update) {
        this.position.x += update;
        this._image.setX(this._image.getX() + update);
    };

    Object.defineProperties(Obstacle.prototype, {
        position: {
            get: function () {
                return this._position;
            },

            set: function (value) {
                if (!value instanceof Position) {
                    throw new Error('Value must be an instance of Position!');
                }

                this._position = value;
            }
        },

        width: {
            get: function() {
                return this._width;
            },

            set: function(value) {
                if(typeof value !== 'number' && value <= 0) {
                    throw new Error ('Width must be a number and cannot be less than 1!');
                }

                this._width = value;
            }
        },

        height: {
            get: function() {
                return this._height;
            },

            set: function(value) {
                if(typeof value !== 'number' && value <= 0) {
                    throw new Error ('Height must be a number and cannot be less than 1!');
                }

                this._height = value;
            }
        }
    });

    return Obstacle;
})();