var Animation = (function() {
    function setCrop(animation) {
        var cropX = animation._frameWidth * animation._col,
            cropY = animation._frameHeight * animation._row;

        animation._frame.setCrop({x: cropX, y: cropY, width: animation._frameWidth, height: animation._frameHeight});
    }

    function updateFrame(animation) {
        animation._col = ((animation._col + 1) % animation._cols) | 0;
        if (!animation._Row && animation._col === 0) {
            animation._row = ((animation._row + 1) % animation._rows) | 0;
        }

        setCrop(animation);
    }

    var Animation = function(layer, image, rows, cols, position, framerate, setRow) {
        this.position = position;

        this._rows = rows;
        this._cols = cols;

        this._framerate = framerate;

        this._frameCounter = 0;

        this._setRow = setRow;

        this._row = 0;
        this._col = 0;

        this._frameWidth = image.width / cols;
        this._frameHeight = image.height / rows;

        this._frame = new Kinetic.Image({
            x: this.position.x,
            y: this.position.y,
            width: this._frameWidth,
            height: this._frameHeight,
            image: image,
        });

        setCrop(this);

        layer.add(this._frame);
    }

    Animation.prototype.update = function() {
        this._frameCounter = ((this._frameCounter + 1) % this._framerate) | 0;

        if (this._frameCounter === 0) {
            updateFrame(this);
        }
    }

    return Animation;
})();
