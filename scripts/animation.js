var Animation = (function() {
    var Animation = function(source, rows, cols) {
        var self = this;
        this.image = new Image();

        this.image.onload = function() {
            self.loaded = true;
            self.frameWidth = (self.image.width / cols) | 0;
            self.frameHeight = (self.image.height / rows) | 0;
        };

        this.image.src = source;

        this.rows = rows;
        this.cols = cols;

        this.row = 0;
        this.col = 0;
    };

    Animation.prototype.update = function() {
        this.col = ((this.col + 1) % this.cols) | 0;
        if (this.col === 0) {
            this.row = ((this.row + 1) % this.rows) | 0;
        }
    };

    Animation.prototype.getX = function() {
        return this.col * this.frameWidth;
    };
    Animation.prototype.getY = function() {
        return this.row * this.frameHeight;
    };

    return Animation;
})();
