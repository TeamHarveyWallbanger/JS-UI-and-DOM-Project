var highScores = (function () {
    var highScores,
		sortedHighScores = [],
        NUMBER_OF_HIGH_SCORES_TO_SAVE = 10;

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

        for (i = 0; i < NUMBER_OF_HIGH_SCORES_TO_SAVE; i += 1) {
            if (!localStorage.getItem('score' + (i + 1))) {
                break;
            }

            currentItem = localStorage.getItem('score' + (i + 1));

            sortedHighScores[i][0] = currentItem.match(/[\w\s]+/)[0];
            sortedHighScores[i][1] = +currentItem.match(/[\w\s]+/)[0];
        }
    }

    function getScores() {
        return sortedHighScores.slice();
    }
    
    function resetScores() {
        var i,
            len = localStorage.length;

        for (i = 0; i < len; i += 1) {
            localStorage.removeItem('score' + (i + 1));
        }
    }

    //Checks if player's score is among the ten highest and adds it if so
    function addCurrentPlayerScore(name, score) {
        var i,
            playerName,
            playerScore,
            length = sortedHighScores.length,
            lowestScore = sortedHighScores[sortedHighScores.length - 1][1];

        if (length < NUMBER_OF_HIGH_SCORES_TO_SAVE) {
            sortedHighScores.push([name, score]);
            if (length > 1) {
                sortedHighScores.sort(function (a, b) {
                    return a[1] - b[1];
                })
            }
        } else if (score > lowestScore) {
            sortedHighScores[length - 1][0] = name;
            sortedHighScores[length - 1][1] = score;
            sortedHighScores.sort(function (a, b) {
                return a[1] - b[1];
            })
        }

        resetScores();

        for (i = 0, length = sortedHighScores.length; i < length; i += 1) {
            playerName = sortedHighScores[i][0];
            playerScore = sortedHighScores[i][1];

            localStorage.setItem('score' + (i + 1), playerName + ':' + playerScore)
        }
    }

    return highScores;
}());