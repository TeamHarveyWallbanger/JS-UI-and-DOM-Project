var Coin = (function () {

    var ANIMATION_FRAMERATE = 65;

    function calculateAnimationPosition(coin) {

        var newX = coin.position.x - coin.radius,
            newY = coin.position.y - coin.radius;

        return new Position(newX, newY);
    }

    function Coin(position, radius, layer, image) {
        var animationPosition,
            diameter = radius * 2;

        this.position = position;
        this.radius = radius;
        animationPosition = calculateAnimationPosition(this);
        this._animation = new Animation(layer, image, 1, 10, animationPosition.x, animationPosition.y);
        this._animation.width = diameter;
        this._animation.height = diameter;
        this._animation.start(ANIMATION_FRAMERATE);
    }

    Object.prototype.updateX = function(update) {

        var newAnimationPosition;
        this.position.x += update;
        newAnimationPosition = calculateAnimationPosition(this);
        this._animation.x = newAnimationPosition.x;
        this._animation.y = newAnimationPosition.y;
    };

    Object.defineProperties(Coin.prototype, {
        radius: {
            get: function () {
                return this._radius;
            },

            set: function (value) {

                if (typeof (value) !== 'number') {
                    throw new Error('Coin radius must be a number!');
                }
                else if (value <= 0) {
                    throw new Error('Coin radius cannot be less than 1!');
                }

                this._radius = value;
            }
        },

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
        }
    });

    return Coin;
})();
