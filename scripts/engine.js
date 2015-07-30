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

    debugger;
    var hero = new Hero(gameLayer, Images['hero.png'], new Position(100, 500), 50, 150);

    document.addEventListener('keyup', function(info) {
        if (info.keyCode !== JUMP_KEY_CODE) {
            return;
        }

        if (hero._running) {
            hero.jump();
        }

    }, false);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        bgLayer.draw();
        gameLayer.draw();
    }
    gameAnimation();
}
engine();
