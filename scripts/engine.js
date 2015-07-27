(function engine() {
	var stage = new Kinetic.Stage({
			container: 'kinetic-container',
			width: 1024,
			height: 768
		}),
		gameLayer = new Kinetic.Layer(),
		rect = new Kinetic.Rect({
			x: 100,
			y: 150,
			width: 75,
			height: 225,
			fill: 'white',
			stroke: 'darkgoldenrod',
			lineWidth: 5
		});

	gameLayer.add(rect);
	stage.add(gameLayer);

	gameLayer.draw();
})();