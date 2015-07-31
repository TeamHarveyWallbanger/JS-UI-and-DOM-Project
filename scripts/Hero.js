var Hero = (function hero() {
    var MAX_JUMP_HEIGHT = 450,
        JUMP_SPEED = 20;

    function getRunningAnimation(image) {
        var i,
            frameWidth = image.width / 10,
            frameHeight = image.height,
            result = [];

        for (i = 0; i < 10; i+=1) {
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

        var spritePosition = Helper.calculateRectColliderToImagePosition(this._position, this._width, this._height, image.width / 6, image.height / 3);

        // var run = getRunningAnimation(image);
        // var jump = getJumpingAnimation(image);
        // var fall = getFallingAnimation(image);

        // this._sprite = new Kinetic.Sprite({
        //     x: 0,
        //     y: 0,
        //     image: image,
        //     animation: 'running',
        //     animations: {
        //         running: run,
        //         // jumping: jump,
        //         // falling: fall
        //     },
        //     frameRate: 10,
        //     frameIndex: 0
        // });

        // layer.add(this._sprite);
        // this._sprite.start();

        this._animation = new Animation(layer, image, 3, 6, spritePosition.x, spritePosition.y );
        this._animation.lockRow = 0;
        this._animation.start(100);
    }

    function updateY(update) {
        this._position.y += update;
        this._animation.y += update;
    }

    function getEdges() {
        var topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            edges = [];

        topLeft = this._position;
        edges.push(topLeft);

        topRight = new Position(this._position.x + this._width, this._position.y);
        edges.push(topRight);

        bottomLeft = new Position(this._position.x, this._position.y + this._height);
        edges.push(bottomLeft);

        bottomRight = new Position(this._position.x + this._width, this._position.y + this._height);
        edges.push(bottomRight);

        return edges;
    }

    function Hero(layer, image, position, width, height) {
        set_position.call(this, position);

        set_width.call(this, width);
        set_height.call(this, height);

        set_Sprite.call(this, layer, image);

        this._groundY = this._position.y + this._height;

        this._running = true;
        this._jumping = false;
        this._falling = false;
    }

    Hero.prototype.update = function() {
        if (!this._jumping && !this._falling) {
            return;
        }

        var jumpDelta,
            heroFeetY = this._position.y + this._height,
            distanceFromGround = Math.abs(heroFeetY - this._groundY);

        if (distanceFromGround >= MAX_JUMP_HEIGHT) {
            this._jumping = false;
            this._falling = true;
        }

        if (this._falling) {
            jumpDelta = 1;
        } else {
            jumpDelta = -1;
        }

        updateY.call(this, (JUMP_SPEED * jumpDelta));

        heroFeetY = this._position.y + this._height;
        if (heroFeetY === this._groundY) {
            this._falling = false;
            this._running = true;
        }
    };

    Hero.prototype.jump = function() {
        // debugger;
        this._jumping = true;
        this._running = false;
    };

    Hero.prototype.hasHitCoin = function(coin) {
        var i,
            len,
            distance,
            edges = getEdges.call(this);

        for (i = 0, len = edges.length; i < len; i+=1) {
            distance = Helper.distance(edges[i], coin.position);
            if (distance <= coin.radius) {
                return true;
            }
        }

        return false;
    };

    Hero.prototype.hasHitObstacle = function(obstacle) {
        var i,
            len,
            distance,
            edges = getEdges.call(this);

        for (i = 0, len = edges.length; i < len; i+=1) {
            if ((obstacle.position.x <= edges[i].x) && (edges[i].x <= obstacle.position.x + obstacle.width)) {
                if ((obstacle.position.y <= edges[i].y) && (edges[i].y <= obstacle.position.y + obstacle.height)) {
                    return true;
                }
            }
        }

        return false;
    };

    Object.defineProperties(Hero.prototype, {
        running: {
            get: function() {
                return this._running;
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