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
        var i,
            playerName,
            playerScore,
            currentItem;

        for (i = 0; i < 10; i += 1) {
            if (!localStorage.getItem('score' + (i + 1))) {
                //tenHighest[i] = '--- : ---';
                continue;
            }

            currentItem = localStorage.getItem('score' + (i + 1));

            tenHighest[i] = currentItem;
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

    //Checks if player's score is among the ten highest and adds it if so
    function addCurrentPlayerScore(name, score) {
        var i,
            len,
            playerName,
            playerScore,
            lowestScore = tenHighest[tenHighest.length - 1][1];

        if (tenHighest.length < 10) {
            tenHighest.push([name, score]);
            tenHighest.sort(function (a, b) {
                return a[1] - b[1];
            })
        } else if (score > lowestScore) {
            tenHighest[tenHighest.length - 1][0] = name;
            tenHighest[tenHighest.length - 1][1] = score;
            tenHighest.sort(function (a, b) {
                return a[1] - b[1];
            })
        }

        resetScores();

        for (i = 0, len = tenHighest.length; i < len; i += 1) {
            playerName = tenHighest[i][0];
            playerScore = tenHighest[i][1];

            localStorage.setItem('score' + (i + 1), playerName + ':' + playerScore)
        }
    }

    return highScores;
}());