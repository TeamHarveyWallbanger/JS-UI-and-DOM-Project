var highScores = (function () {
    var highScores,
		tenHighest = [];

    highScores = {
        loadHighScores: loadScores,
        getHighScores: getScores,
        resetHighScores: resetScores,
        addCurrentPlayerScore: addCurrentPlayerScore
    };

    function loadScores() {
        for (var i = 0; i < 10; i += 1) {
            if (!localStorage.getItem('score' + (i + 1))) {
                tenHighest[i] = '--- : ---';
                continue;
            }

            tenHighest[i] = localStorage.getItem('score' + (i + 1));
        }
    }

    function getScores() {
        return tenHighest.slice();
    }

    function resetScores() {
        var i,
            len = localStorage.length;

        for (i = 0; i < len; i += 1) {
            localStorage.removeItem('score' + (i + 1));
        }

        loadScores();
    }

    function addCurrentPlayerScore(name, score) {
        //Checks if player's score is among the ten highest and adds it if so
    }

    return highScores;
}());