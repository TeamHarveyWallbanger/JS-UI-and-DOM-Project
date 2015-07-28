function distance(x1, y1, x2, y2) {
	var xDiff = x1 - x2,
		yDiff = y1 - y2,
		xDiffSquered = xDiff * xDiff,
		yDiffSquered = yDiff * yDiff,
		distance = Math.sqrt(xDiffSquered + yDiffSquered);

	return distance;
}
(function engine() {
	var GROUND_Y = 980,
		HERO_X = 50,
		HERO_WIDTH = 100,
		HERO_HEIGHT = 160,
		MAX_JUMP_HEIGHT = 450,
		JUMP_SPEED = 30,
		RUN_SPEED = 30,
		JUMP_KEY_CODE = 32, //space
		jumping = false,
		falling = false,
	 	stage = new Kinetic.Stage({
			container: 'kinetic-container',
			width: 1920,
			height: 1080
		}),
		gameLayer = new Kinetic.Layer(),
		hero = new Kinetic.Rect({
			x: HERO_X,
			y: GROUND_Y - HERO_HEIGHT,
			width: HERO_WIDTH,
			height: HERO_HEIGHT,
			fill: 'white',
			stroke: 'darkgoldenrod',
			lineWidth: 5
		});

	gameLayer.add(hero);
	stage.add(gameLayer);

	function jumpingUpate() {
		if (!jumping && !falling) {
			return;
		}

		var jumpDelta
			heroY = hero.getY(),
			heroHeight = hero.getHeight(),
			heroFeetY = heroY + heroHeight,
			distanceFromGround = Math.abs(heroFeetY - GROUND_Y);

		if (distanceFromGround >= MAX_JUMP_HEIGHT) {
			jumping = false;
			falling = true;
		}

		if (falling) {
			jumpDelta = 1;
		} else {
			jumpDelta = -1;
		}

		heroY += (JUMP_SPEED * jumpDelta);
		hero.setY(heroY);

		heroFeetY = heroY + heroHeight;
		if (heroFeetY === GROUND_Y) {
			falling = false;
		}
	}

	document.addEventListener('keyup', function(info) {
		if (info.keyCode !== JUMP_KEY_CODE) {
			return;
		}

		debugger;
		if ((hero.getY() + hero.getHeight()) === GROUND_Y) {
			jumping = true;
		}

	}, false);

	function gameAnimation() {
		requestAnimationFrame(gameAnimation)

		jumpingUpate();

		gameLayer.draw();
	}
	gameAnimation();

})();