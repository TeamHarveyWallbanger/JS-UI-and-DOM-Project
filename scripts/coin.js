var Coin = (function() {
	function Coin(position, radious) {
		this.position = position;
		this.animation = new Animation('assets/coin.png', 1, 10);
		this.radious = radious;
	}

	return Coin;
    // var coinAnimation = new Animation('Sprites/Coin.png', 1, 10);

    // function updateWrapper() {
    //     coinAnimation.update();
    // }
    // setInterval(updateWrapper, 100);

    // function gameAnimation() {
    //     requestAnimationFrame(gameAnimation);
    //     if (!coinAnimation.loaded) {
    //         return;
    //     }
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     ctx.drawImage(coinAnimation.image, coinAnimation.getX(), coinAnimation.getY(), coinAnimation.frameWidth, coinAnimation.frameHeight, 0, 0, coinAnimation.frameWidth, coinAnimation.frameHeight);
    // }
    // gameAnimation();

    function generateRandomCoords(position, radious) {

        
        return new Coin(position, radious);
    }

})();

