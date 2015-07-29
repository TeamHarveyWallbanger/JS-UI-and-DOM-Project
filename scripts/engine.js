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
    stage.add(gameLayer);

    var radius = (Images['coin.png'].width / 10) / 2;
    var coinStartPos = new Position(0 + radius, 0 + radius);
    var coin = new Coin(coinStartPos, radius, gameLayer, Images['coin.png']);

    var obstacle = new Obstacle(obstacleStartPos, gameLayer, Images['BunchOfRocks.png']);
    var obstacleStartPos = new Position(900, 300);

    var offset = 0;
    function gameAnimation() {
        requestAnimationFrame(gameAnimation);

        offset = (offset - 7) % 1000;
        bg.fillPatternOffsetX(offset);

        // coin.updateX(-5);
        obstacle.updateX(-5);

        backgroundLayer.draw();
        gameLayer.draw();
    }

    gameAnimation();
}
engine();
