var Animation = (function() {
    function setCrop(animation) {
        var cropX = animation._frameWidth * animation._col,
            cropY = animation._frameHeight * animation._row;

        animation._frame.setCrop({x: cropX, y: cropY, width: animation._frameWidth, height: animation._frameHeight});
    }

    function updateFrame(animation) {
        animation._col = ((animation._col + 1) % animation._cols) | 0;
        if ((animation._setRow === undefined) && animation._col === 0) {
            animation._row = ((animation._row + 1) % animation._rows) | 0;
        }

        setCrop(animation);
    }

    var Animation = function(layer, image, rows, cols, x, y, frameRate, setRow) {
        this._rows = rows;
        this._cols = cols;

        this.frameRate = frameRate;

        this._frameCounter = 0;

        this._setRow = setRow;

        this._row = this._setRow || 0;
        this._col = 0;

        this._frameWidth = image.width / cols;
        this._frameHeight = image.height / rows;

        this._frame = new Kinetic.Image({
            x: x,
            y: y,
            width: this._frameWidth,
            height: this._frameHeight,
            image: image,
        });

        setCrop(this);

        layer.add(this._frame);
    }

    Animation.prototype.update = function() {
        this._frameCounter = ((this._frameCounter + 1) % this.frameRate) | 0;

        if (this._frameCounter === 0) {
            updateFrame(this);
        }
    }

    Object.defineProperties(Animation.prototype, {
        x: {
            get: function() {
                return this._frame.getX();
            },
            set: function(value) {
                if (typeof(value) !== 'number') {
                    throw {
                        name: 'NotNumberX',
                        message: 'X must be of type number.'
                    };
                }

                this._frame.setX(value);
            }
        },
        y: {
            get: function() {
                return this._frame.getY();
            },
            set: function(value) {
                if (typeof(value) !== 'number') {
                    throw {
                        name: 'NotNumberY',
                        message: 'Y must be of type number.'
                    };
                }

                this._frame.setY(value);
            }
        },
        frameRate: {
            get: function() {
                return this._framerate;
            },
            set: function(value) {
                if (typeof(value) !== 'number' || value < 1) {
                    throw {
                        name: 'InvalidFrameRate',
                        message: 'FrameRate must be of type number greater or equal to 1.'
                    };
                }

                this._framerate = value;
            }
        },

    });

    return Animation;
})();
