var Coin = (function () {
    function Coin(position, radious) {
        this.position = position;
        this.animation = new Animation('assets/coin.png', 1, 10);
        this.radious = radious;
    }

    Object.defineProperties(Coin.prototype.position, {
        x: {
            get: function () {
                return this.position._x;
            },

            set: function (value) {
                if (typeof(value) !== 'number') {
                    throw { name: 'NotNumberX', message: 'X must be of type number.' };
                }

                this.position._x = value;
            }
        },

        y: {
            get: function () {
                return this.position._y;
            },

            set: function (value) {
                if (typeof(value) !== 'number') {
                    throw { name: 'NotNumberX', message: 'X must be of type number.' };
                }

                this.position._y = value;
            }
        }
    });

    Object.defineProperty(Coin.prototype, {
        radious: {
            get: function () {
                return this._radious;
            },

            set: function (value) {

                if (typeof (value) !== number) {
                    throw new Error('Coin radius must be a number!');
                }
                else if (value <= 0) {
                    throw new Error('Coin radius cannot be less than 1!');
                }

                this._radious = value;
            }
        }
    });

    return Coin;
})();
