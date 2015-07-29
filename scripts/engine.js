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

//============================================================= HEAD =============================================================
        gameLayer = new Kinetic.Layer();

        // coin = new Kinetic.Circle({
        //     x: 750,
        //     y: 350,
        //     radius: 50,
        //     fill: 'red',
        //     draggable: false
        // });


    stage.add(gameLayer);
    // gameLayer.add(coin);

//=============================================================

    var heroAnim = new Animation(gameLayer, Images['hero.png'], 3, 6, 0, 0, 5, 0);


    // var coinAnim = new Animation(gameLayer, Images['coin.png'], 1, 10, 150, 150, 5);

    // stage.add(gameLayer);

//============================================================= ANIMATION =============================================================
    function gameAnimation() {

        requestAnimationFrame(gameAnimation);
        heroAnim.update();
        // coinAnim.update();
        gameLayer.draw();

    }

    gameAnimation();
}
engine();
