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

    //var heroAnim = new Animation(gameLayer, Images['hero.png'], 3, 6, 0, 0, 5);
//    heroAnim.start(100);
//    heroAnim.lockRow = 0;
    // heroAnim.lockCol = 5;

    var radius = (Images['coin.png'].width / 10) / 2;
    var coinStartPos = new Position(0 + radius, 0 + radius);
    var coin = new Coin(coinStartPos, radius, gameLayer, Images['coin.png']);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        // coin.updateX(-5);
        gameLayer.draw();
    }

    gameAnimation();
}
engine();
