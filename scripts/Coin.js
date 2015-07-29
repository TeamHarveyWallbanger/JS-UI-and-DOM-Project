var Coin = (function () {
    function Coin(position, radious) {
        this.position = position;
        this.animation = new Animation('assets/coin.png', 1, 10);
        this.radious = radious;
    }



    Object.defineProperties(Coin.prototype, {
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
        },

        position: {
            get: function() {
                return this._position;
            },

            set: function(value) {
                if(!value instanceof Position) {
                    throw new Error('Value must be an instance of Position!');
                }

                this._position = value;
            }
        }
    });

    return Coin;
})();
