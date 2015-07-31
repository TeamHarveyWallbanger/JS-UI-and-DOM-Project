var Animation = (function() {
    function setRows(value) {
        if (typeof(value) !== 'number' || value < 1) {
            throw {
                name: 'InvalidRows',
                message: 'Rows must be number equal to or greater than 1.'
            };
        }

        Object.defineProperty(this, 'rows',{
            configurable: false,
            enumerable: true,
            writable: false,
            value: value
        });
    }

    function setCols(value) {
        if (typeof(value) !== 'number' || value < 1) {
            throw {
                name: 'InvalidCols',
                message: 'Cols must be number equal to or greater than 1.'
            };
        }

        Object.defineProperty(this, 'cols',{
            configurable: false,
            enumerable: true,
            writable: false,
            value: value
        });
    }

    function set_image(layer, image) {
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

        this._image = new Kinetic.Image({
            image: image
        });

        layer.add(this._image);
    }

    function updateCrop() {
        var cropX = this._frameWidth * this._col,
            cropY = this._frameHeight * this._row;

        this._image.setCrop({x: cropX, y: cropY, width: this._frameWidth, height: this._frameHeight});
    }

    function updateFrame(animation) {
        if (animation.lockCol === null) {
            animation._col = ((animation._col + 1) % animation.cols) | 0;
        }

        if ((animation.lockRow === null) && (animation._col === 0 || animation.lockCol)) {
            animation._row = ((animation._row + 1) % animation.rows) | 0;
        }

        updateCrop.call(animation);
    }

    var Animation = function(layer, image, rows, cols, x, y) {
        setRows.call(this, rows);
        setCols.call(this, cols);

        this._row = 0;
        this._col = 0;

        this.lockRow = null;
        this.lockCol = null;

        this.isRunning = false;

        this._frameWidth = image.width / cols;
        this._frameHeight = image.height / rows;

        set_image.call(this, layer, image);

        this.x = x;
        this.y = y;

        this.width = this._frameWidth;
        this.height = this._frameHeight;

        updateCrop.call(this);

    };

    Animation.prototype.start = function(milliseconds) {
        this._updateIntervalId = setInterval(updateFrame, milliseconds, this);
        this._isRunning = true;
    };

    Animation.prototype.stop = function() {
        clearInterval(this._updateIntervalId);
        this._isRunning = false;
    };

    Animation.prototype.remove = function() {
        this._image.remove();
    };

    Object.defineProperties(Animation.prototype, {
        x: {
            get: function() {
                return this._image.getX();
            },
            set: function(value) {
                if (typeof(value) !== 'number') {
                    throw {
                        name: 'NotNumberX',
                        message: 'X must be of type number.'
                    };
                }

                this._image.setX(value);
            }
        },
        y: {
            get: function() {
                return this._image.getY();
            },
            set: function(value) {
                if (typeof(value) !== 'number') {
                    throw {
                        name: 'NotNumberY',
                        message: 'Y must be of type number.'
                    };
                }

                this._image.setY(value);
            }
        },
        lockRow: {
            get: function(){
                return this._lockRow;
            },
            set: function(value){
                valueType = typeof(value);

                if ((valueType !== 'number') && (value !== null)) {
                    throw {
                        name: 'lockRowInvalidType',
                        message: 'LockRow must either of type a number or null.'
                    };
                }

                if (valueType === 'number') {
                    if (value < 0 || this.rows <= value) {
                        throw {
                            name: 'InvalidRow',
                            message: 'Row must be a number between 0 and rows - 1'
                        };
                    }

                    this._row = value;
                    updateCrop.call(this);
                }

                this._lockRow = value;
            }
        },
        lockCol: {
            get: function(){
                return this._lockCol;
            },
            set: function(value){
                valueType = typeof(value);

                if ((valueType !== 'number') && (value !== null)) {
                    throw {
                        name: 'lockColInvalidType',
                        message: 'LockCol must either of type a number or null.'
                    };
                }

                if (valueType === 'number') {
                    if (value < 0 || this.cols <= value) {
                        throw {
                            name: 'InvalidCol',
                            message: 'Col must be a number between 0 and cols - 1'
                        };
                    }

                    this._col = value;
                    updateCrop.call(this);
                }

                this._lockCol = value;
            }
        },
        isRunning: {
            get: function() {
                return this._isRunning;
            }
        },
        width: {
            get: function() {
                return this._image.getWidth();
            },
            set: function(value) {
                if (typeof(value) !== 'number' || value <= 0) {
                    throw {
                        name: 'InvalidWidth',
                        message: 'Width must be a number greater than 0.'
                    };
                }

                this._image.setWidth(value);
            }
        },
        height: {
            get: function() {
                return this._image.getHeight();
            },
            set: function(value) {
                if (typeof(value) !== 'number' || value <= 0) {
                    throw {
                        name: 'InvalidHeight',
                        message: 'Height must be a number greater than 0.'
                    };
                }

                this._image.setHeight(value);
            }
        }
    });

    return Animation;
})();
