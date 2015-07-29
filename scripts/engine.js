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
    //     rect = new Kinetic.Rect({
    //         x: 100,
    //         y: 150,
    //         width: 75,
    //         height: 225,
    //         fill: 'white',
    //         stroke: 'darkgoldenrod',
    //         lineWidth: 5
    //     });


    // var backgroundImage = new Image();
    // backgroundImage.src = "../assets/Background.png";
    // backgroundImage.onload = function(){
    //     Image = new Kinetic.Image({ x: 0, y: 0, width: 1000, height: 750,image: backgroundImage});
    //     gameLayer.add(Image);
    //     gameLayer.draw();
    // };


    // console.log(Images['hero.png'].width);
    var heroAnim = new Animation(gameLayer, Images['hero.png'], 1, 6, 0, 0, 5);
    stage.add(gameLayer);

    // kinImage = new Kinetic.Image({
    //     x: 0,
    //     y: 0,
    //     width: Images['hero.png'].width / 6,
    //     height: Images['hero.png'].height / 3,
    //     image: Images['hero.png'],
    //     crop: {x: 0, y: 0, width: Images['hero.png'].width / 6, height: Images['hero.png'].height / 3}
    // });
    // gameLayer.add(kinImage);
    // gameLayer.draw();

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        // debugger;
        heroAnim.update();
        gameLayer.draw();
    }
    gameAnimation();
}
engine();