function engine() {
    if (!Images.areAllLoaded()) {
        setTimeout(engine, 50);
        return;
    }

    var bgLayer,
        gameLayer,
        background,
        stage = new Kinetic.Stage({
            container: 'kinetic-container',
            width: 1000,
            height: 750
    });

    bgLayer = new Kinetic.Layer();
    stage.add(bgLayer);

    gameLayer = new Kinetic.Layer();
    stage.add(gameLayer);

    background = new Background(bgLayer, Images['background.png'], stage.getWidth(), stage.getHeight());

    var hero = new Animation(gameLayer, Images['hero.png'],  3, 6, 100, 500);
    var stone = new Obstacle(gameLayer, Images['BunchOfRocks.png'], new Position(350, 590));
    var coin = new Coin(gameLayer, Images['coin.png'], new Position(100, 100), 50, 350);
    console.log(coin);
    // var cactus = new Obstacle(gameLayer, Images['Cactus.png'], new Position(400, 590));

    hero.lockRow = 0;
    hero.start(115);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        background.updateX(7);
        stone.updateX(-5);

        if (stone.position.x < -250) {
            stone.position.x = stage.getWidth();
        }
        // cactus.updateX(-7);
        bgLayer.draw();
        gameLayer.draw();
    }

    gameAnimation();
}
engine();
