//HighScores should be loaded at game initialization!

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
            playerName = currentItem.match(/[ A-z]+/)[0];
            playerScore = +currentItem.match(/[\d]+/)[0];

            sortedHighScores.push([playerName, playerScore]);
        }
    }

    function saveScores() {
        var i,
            playerName,
            playerScore,
            length;
        
        for (i = 0, length = sortedHighScores.length; i < length; i += 1) {
            playerName = sortedHighScores[i][0];
            playerScore = sortedHighScores[i][1];

            localStorage.setItem('score' + (i + 1), playerName + ':' + playerScore)
        }
    }

    function getScores() {
        return sortedHighScores.slice();
    }
    
    function resetScores() {
        var i,
            len = sortedHighScores.length;

        for (i = 0; i < len; i += 1) {
            localStorage.removeItem('score' + (i + 1));
        }

        sortedHighScores = [];
    }

    //Checks if player's score is among the ten highest and adds it if so
    function addCurrentPlayerScore(name, score) {
        var i,
            playerName,
            playerScore,
            length = sortedHighScores.length;

        validateName(name);
        validateScore(score);

        if (length < NUMBER_OF_HIGH_SCORES_TO_SAVE) {
            sortedHighScores.push([name, score]);
            if (length > 1) {
                sortedHighScores.sort(function (a, b) {
                    return b[1] - a[1];
                })
            }

            saveScores();
        } else if (score > sortedHighScores[sortedHighScores.length - 1][1]) {
            sortedHighScores[length - 1][0] = name;
            sortedHighScores[length - 1][1] = score;
            sortedHighScores.sort(function (a, b) {
                return b[1] - a[1];
            })

            saveScores();
        }        
    }

    return highScores;
}());