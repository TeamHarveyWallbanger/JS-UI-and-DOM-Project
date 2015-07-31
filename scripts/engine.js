function engine() {
    if (!Images.areAllLoaded()) {
        setTimeout(engine, 50);
        return;
    }
    var i,
        len,
        JUMP_KEY_CODE = 32, //space
        HERO_WIDTH = 90,
        HERO_HEIGHT = 150,
        STARTING_HERO_POSITION = new Position(100, 600),
        OBSTACLES_SPAWN_POSITION = new Position(1200, (STARTING_HERO_POSITION.y + HERO_HEIGHT)),
        bgLayer,
        gameLayer,
        background,
        stage = new Kinetic.Stage({
            container: 'kinetic-container',
            width: 1000,
            height: 750
        }),
        hero,
        obstacle,
        newCoins = [],
        coins = [];

    bgLayer = new Kinetic.Layer();
    stage.add(bgLayer);

    gameLayer = new Kinetic.Layer();
    stage.add(gameLayer);

    background = new Background(bgLayer, Images['background.png'], stage.getWidth(), stage.getHeight());

    hero = new Hero(gameLayer, Images['hero.png'], STARTING_HERO_POSITION, HERO_WIDTH, HERO_HEIGHT);

    obstacle = ObstaclesGenerator.getRandomObstacle(gameLayer, OBSTACLES_SPAWN_POSITION);

    function spawnCoin() {
        var RADIUS = 30,
            randomY = Helper.randomIntInRange(150, 400),
            coin = new Coin(gameLayer, Images['coin.png'], new Position(1030, randomY), RADIUS, 350);
        coins.push(coin);
    }
    // setInterval(spawnCoin, 1000);

    document.addEventListener('keyup', function(info) {
        if (info.keyCode !== JUMP_KEY_CODE) {
            return;
        }

        if (hero._running) {
            hero.jump();
        }
    }, false);

    function gameAnimation() {
        background.updateX(7);

        obstacle.updateX(-10);

        Helper.chance(5, spawnCoin);
        for (i = 0, len = coins.length; i < len; i+=1) {
            if (coins[i] !== null) {
                coins[i].updateX(-10);
            }

            if (coins[i] !== null && coins[i].position.x <= -(coins[i].radius)) {
                coins[i].remove();
                coins[i] = null;
            }

            if ((coins[i] !== null) && hero.hasHitCoin(coins[i])) {
                console.log('COIN HIT!');
                coins[i].remove();
                coins[i] = null;
            }
        }
        Helper.removeArrayNulls(coins);

        if (obstacle.position.x <= -(obstacle.width)) {
            obstacle.remove();
            obstacle = ObstaclesGenerator.getRandomObstacle(gameLayer, OBSTACLES_SPAWN_POSITION);
        }

        if (hero.hasHitObstacle(obstacle)) {
            console.log('OBSTACLE HIT!');
            var div = document.createElement('div');
            div.innerText = "GAME OVER";
            div.style.fontSize = '200px';
            document.body.appendChild(div);

            return;
        }

        hero.update();
        stage.draw();

        requestAnimationFrame(gameAnimation);
    }
    gameAnimation();
}
engine();
