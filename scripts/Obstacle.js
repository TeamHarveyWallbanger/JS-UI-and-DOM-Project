var Obstacle = (function () {

    var ANIMATION_FRAMERATE = 65;

    function Obstacle(layer, image, position, width, height) {
        this.position = position;
        this._animation = new Animation(layer, image, 1, 1, position.x, position.y);
        this._animation.start(ANIMATION_FRAMERATE);
    }

    Obstacle.prototype.updateX = function(update) {
        this.position.x += update;
        this._animation.x = this.position.x;
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
        }
    });

    return Obstacle;
})();


// obstacle: {
// 	collider: path,
// 	image: image,
// 	updatePosition()
// }
