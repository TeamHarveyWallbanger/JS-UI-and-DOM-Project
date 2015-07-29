var Animation = (function() {
    function validateRowsCols(number) {
        if (typeof(number) !== 'number' || number < 1) {
            throw {
                name: 'InvalidRowsOrCols',
                message: 'Rows and Cols must be numbers equal to or greater than 1.'
            };
        }
    }

    function setCrop(animation) {
        var cropX = animation._frameWidth * animation._col,
            cropY = animation._frameHeight * animation._row;
            // debugger;

        animation._frame.setCrop({x: cropX, y: cropY, width: animation._frameWidth, height: animation._frameHeight});
    }

    function updateFrame(animation) {
        if (animation.lockCol === null) {
            animation._col = ((animation._col + 1) % animation.cols) | 0;
        }

        if ((animation.lockRow === null) && (animation._col === 0 || animation.lockCol)) {
            animation._row = ((animation._row + 1) % animation.rows) | 0;
        }

        setCrop(animation);
    }

    var Animation = function(layer, image, rows, cols, x, y) {
        validateRowsCols(rows);
        validateRowsCols(cols);
        Object.defineProperties(this, {
            rows: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: rows
            },
            cols: {
                configurable: false,
                enumerable: true,
                writable: false,
                value: cols
            }
        });

        this._row = 0;
        this._col = 0;

        this.lockRow = null;
        this.lockCol = null;

        this.isRunning = false;

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

    Animation.prototype.start = function(milliseconds) {
        this._updateIntervalId = setInterval(updateFrame, milliseconds, this);
        this._isRunning = true;
    }

    Animation.prototype.stop = function() {
        clearInterval(this._updateIntervalId);
        this._isRunning = false;
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
                    setCrop(this);
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
                    setCrop(this);
                }

                this._lockCol = value;
            }
        },
        isRunning: {
            get: function() {
                return this._isRunning;
            }
        }
    });

    return Animation;
})();
