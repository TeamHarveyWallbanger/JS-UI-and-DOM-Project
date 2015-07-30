var Hero = (function hero() {
    function set_Sprite(layer, image) {

        this._sprite = new Kinetic.Sprite({
            image: image,
            animation: 'running',
            animation: [],
            frameRate: 10,
            frameIndex: 0
        });

        layer.add(this._sprite);
    }

    function Hero(layer, image, x, y, width, height) {

        set_Sprite.call(this, layer, image);

        this._runing = true;
        this._jumping = false;
        this._falling = false;
    }

    return Hero;
}());