var highScores = (function () {
	var highScores,
		tenHighest = [];


	highScores = {
		loadHighScores: loadScores,
		saveHighScores: saveScores,
		addCurrentPlayerScore: addCurrentPlayerScore
	};

	function loadScores() {

	}

	function saveScores() {

	}
	
	function addCurrentPlayerScore(name, score) {
	    //Checks if player's score is among the ten highest and adds it if so
	}

	return highScores;
} ());