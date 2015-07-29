(function engine() {

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
        });


    var backgroundImage = new Image();
    backgroundImage.src = "../assets/Background.png";
    backgroundImage.onload = function(){
        Image = new Kinetic.Image({ x: 0, y: 0, width: 1000, height: 750,image: backgroundImage});
        gameLayer.add(Image);
        gameLayer.draw();
    };

    gameLayer.add(rect);
    stage.add(gameLayer);

    gameLayer.draw();


})();