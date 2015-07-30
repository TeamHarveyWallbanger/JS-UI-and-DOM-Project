var Coin = (function () {

    var ANIMATION_FRAMERATE = 65;

    function calculateAnimationPosition() {

        var animX = this.position.x - this.radius,
            animY = this.position.y - this.radius;

        return new Position(animX, animY);
    }

    function setRadius(value) {
        if (typeof (value) !== 'number') {
            throw new Error('Coin radius must be a number!');
        }

        else if (value <= 0) {
            throw new Error('Coin radius cannot be less than 1!');
        }

        Object.defineProperty(this, 'radius', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: value
        });
    }

    function setScoreValue(value) {
        if ((typeof(value) !== 'number') || (value <= 0)){
            throw {
                name: 'InvalidScoreValue',
                message: 'Score Value must be a number greater than 0.'
            };
        }

        Object.defineProperty(this, 'scoreValue', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: value
        });
    }

    function Coin(layer, image, position, radius, scoreValue) {
        var animationPosition,
            diameter = radius * 2;

        this.position = position;

        setRadius.call(this, radius);
        setScoreValue.call(this, scoreValue);

        animationPosition = calculateAnimationPosition.call(this);
        this._animation = new Animation(layer, image, 1, 10, animationPosition.x, animationPosition.y);

        this._animation.width = diameter;
        this._animation.height = diameter;

        this._animation.start(ANIMATION_FRAMERATE);
    }

    Object.prototype.updateX = function(update) {

        this.position.x += update;
        this._animation.x += update;
    };

    Object.defineProperties(Coin.prototype, {
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
