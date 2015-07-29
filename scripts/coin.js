var coinMaker = (function main() {
    var heroAnim = new Animation('Sprites/Coin.png', 1, 10);

    function updateWrapper() {
        heroAnim.update();
    }
    setInterval(updateWrapper, 100);

    function gameAnimation() {
        requestAnimationFrame(gameAnimation);
        if (!heroAnim.loaded) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(heroAnim.image, heroAnim.getX(), heroAnim.getY(), heroAnim.frameWidth, heroAnim.frameHeight, 0, 0, heroAnim.frameWidth, heroAnim.frameHeight);
    }
    gameAnimation();
})();