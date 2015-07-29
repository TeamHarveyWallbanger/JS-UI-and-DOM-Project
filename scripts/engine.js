function engine() {
	if (!Images.areAllLoaded()) {
		setTimeout(engine, 50);
		return;
	}

    var stage = new Kinetic.Stage({
            container: 'kinetic-container',
            width: 1000,
            height: 750
        }),
        gameLayer = new Kinetic.Layer();

    stage.add(gameLayer);

    var heroAnim = new Animation(gameLayer, Images['hero.png'], 3, 6, 0, 0, 5, 0);

    stage.add(gameLayer);

    function gameAnimation() {

        requestAnimationFrame(gameAnimation);
        heroAnim.update();

        gameLayer.draw();
    }

    gameAnimation();
}
engine();
