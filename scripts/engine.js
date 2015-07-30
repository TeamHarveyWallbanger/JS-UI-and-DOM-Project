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

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        background.updateX(7);

        bgLayer.draw();
        gameLayer.draw();
    }

    gameAnimation();
}
engine();
