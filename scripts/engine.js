function engine() {
    if (!Images.areAllLoaded()) {
        setTimeout(engine, 50);
        return;
    }
    var JUMP_KEY_CODE = 32, //space
        bgLayer,
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

    try {
        var hero = new Hero(gameLayer, Images['hero.png'], new Position(100, 600), 50, 150);
    } catch (er) {
        debugger;
    }

    // var coin = new Coin(gameLayer, Images['coin.png'], new Position(1000, 550), 50, 100);
    var stone = new Obstacle(gameLayer, Images['BunchOfRocks.png'], new Position(1000, 600), 90, 120);
    // debugger;


    document.addEventListener('keyup', function(info) {
        if (info.keyCode !== JUMP_KEY_CODE) {
            return;
        }

        if (hero._running) {
            hero.jump();
        }
    }, false);

    // debugger;
    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        background.updateX(7);
        if (stone !== undefined) {

            stone.updateX(-10);
        }

        if (stone !== undefined && stone.position.x <= 0) {
            stone.updateX(1000);
        }

        if ((stone !== undefined) && hero.hasHitObstacle(stone)) {
            debugger;
            console.log('HIT!');
            stone.remove();
            stone = undefined;
        }
        hero.update();
        stage.draw();
    }
    gameAnimation();
}
engine();
>>>>>>> master
