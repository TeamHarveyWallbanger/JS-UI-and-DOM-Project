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
    // gameLayer.add(coin);


    var heroAnim = new Animation(gameLayer, Images['hero.png'], 3, 6, 0, 0, 5, 0);

    var coinAnim = new Animation(gameLayer, Images['coin.png'], 1, 10, 350, 600, 4);

    stage.add(gameLayer);

    function gameAnimation() {

        requestAnimationFrame(gameAnimation);
        heroAnim.update();
        coinAnim.update();
        // coinAnim.update();
        gameLayer.draw();

    }

    gameAnimation();
}
engine();
