function engine() {
    if (!Images.areAllLoaded()) {
        setTimeout(engine, 50);
        return;
    }
    function countdown(minutes) {
        var seconds = 60;
        var mins = minutes
        function tick() {
            var counter = document.getElementById("timer");
            var current_minutes = mins-1
            seconds--;
            counter.innerHTML =
            current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if( seconds > 0 ) {
                  setTimeout(tick, 1000);
            }
            else {
            if(mins > 1){

               // countdown(mins-1);
               setTimeout(function () { countdown(mins - 1); }, 1000);

                }
            }
        }
        tick();
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
    var coin = new Coin(gameLayer, Images['coin.png'], new Position(700, 100), 50, 350);
    console.log(coin);
    // var cactus = new Obstacle(gameLayer, Images['Cactus.png'], new Position(400, 590));
   var stopWatch=new Timer();

    hero.lockRow = 0;
    hero.start(115);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        debugger;
        background.updateX(7);
        coin.updateX(-5);
        stopWatch.start();
        stone.updateX(-5);
        if (stone.position.x <= 0) {
            stone.position.x = stage.getWidth();
        }
        if(stone.position.x==hero.x){
            stopWatch.stop();
            alert(stopWatch.duration().toString());
        }
        // cactus.updateX(-7);
        bgLayer.draw();
        gameLayer.draw();
    }
    countdown(2);
    gameAnimation();
}
engine();
