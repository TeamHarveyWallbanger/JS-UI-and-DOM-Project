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
    var hero = new Animation(bgLayer, Images['hero.png'],  3, 6, 100, 500);
    var stone = new Obstacle(new Position(350, 590), bgLayer, Images['BunchOfRocks.png']);
    var cactus = new Obstacle(new Position(1500, 200), bgLayer, Images['Cactus.png']);
    hero.lockRow = 0;
    hero.start(115);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        background.updateX(7);
        stone.updateX(-7);
        cactus.updateX(-7);
        bgLayer.draw();
        gameLayer.draw();
    }

    gameAnimation();
}
engine();
