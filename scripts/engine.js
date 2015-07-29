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

//==================Background=====================================

    var bg = new Kinetic.Rect({
        x: 0,
        y: 0,
       width: 1000,
        height: 750,
        draggable: false
    });

    bg.fillPatternImage(Images['background.png']);

    backgroundLayer = new Kinetic.Layer();
    backgroundLayer.add(bg);
    stage.add(backgroundLayer);
//======================================================================
    var coinStartPos = new Position(900, 200);
    var radius = (Images['coin.png'].width / 10) / 2;
    var coin = new Coin(coinStartPos, radius, gameLayer, Images['coin.png']);

    var offset = 0;

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        coin.updateX(-5);
        offset = (offset - 7) % 1000;
        bg.fillPatternOffsetX(offset);
        backgroundLayer.draw();
        gameLayer.draw();

    }

    gameAnimation();
}
engine();
