var ObstaclesGenerator = (function() {
	function getHappyRockObstacle(layer, position) {
		var WIDTH = 90,
			HEIGHT = 120;

    	return new Obstacle(layer, Images['BunchOfRocks.png'], new Position(position.x, position.y - HEIGHT), 90, 120);
	}

	function getGrumpyRockObstacle(layer, position) {
		var WIDTH = 60,
			HEIGHT = 80;

		return new Obstacle(layer, Images['GrumpyRock.png'], new Position(position.x, position.y - HEIGHT), WIDTH, HEIGHT);
	}

	function getScaredCactusObstacle(layer, position) {
		var WIDTH = 76,
			HEIGHT = 168;

		return new Obstacle(layer, Images['ScaredCactus.png'], new Position(position.x, position.y - HEIGHT), WIDTH, HEIGHT);
	}

	return {
		getRandomObstacle: function(layer, position) {
			var randomResult = (Math.random() * 3) | 0;

			switch (randomResult) {
				case 0:
					return getHappyRockObstacle(layer, position);
				case 1:
					return getGrumpyRockObstacle(layer, position);
				case 2:
					return getScaredCactusObstacle(layer, position);
				default:
					throw {
						name: 'UnknownObstacleType',
						message: 'ObstaclesGenerator does not know this obstacle type.'
					};
			}
		}
	}
})();