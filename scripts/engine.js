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

    var coin = new Coin(gameLayer, Images['coin.png'], new Position(1000, 550), 50, 100);
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
        if (coin !== undefined) {

            coin.updateX(-5);
        }

        if (coin !== undefined && coin.position.x <= 0) {
            coin.position.x = 100;
        }

        if ((coin !== undefined) && hero.hasHitCoin(coin)) {
            console.log('HIT!');
            coin.remove();
            coin = undefined;
        }
        hero.update();
        stage.draw();
    }
    gameAnimation();
}
engine();
