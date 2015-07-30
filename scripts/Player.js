var Player = (function () {
    var STARTING_LIVES = 3;

    function Player(name) {
        this.name = name;
        this.score = 0;
        this.lives = STARTING_LIVES;
    }

    Player.prototype.addToHighScores = function () {
        highScores.addCurrentPlayerScore(this.name, this.score);
    }

    return Player;
}());