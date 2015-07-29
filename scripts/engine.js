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

        gameLayer = new Kinetic.Layer(),
        rect = new Kinetic.Rect({
            x: 100,
            y: 150,
            width: 75,
            height: 225,
            fill: 'white',
            stroke: 'darkgoldenrod',
            lineWidth: 5
        }),

        coin = new Kinetic.Circle({
            x: 750,
            y: 350,
            radius: 50,
            fill: 'red',
            draggable: false
        });



//    var backgroundImage = new Image();
//    backgroundImage.src = "../assets/Background.png";
//    backgroundImage.onload = function(){
//        Image = new Kinetic.Image({ x: 0, y: 0, width: 1000, height: 750,image: backgroundImage});
//        gameLayer.add(Image);
//        gameLayer.draw();
//    };



    stage.add(gameLayer);
    gameLayer.add(rect);
    gameLayer.add(coin);
    gameLayer.draw();


}
engine();