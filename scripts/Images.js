var Images = (function () {
    function onImageLoad() {
        loadedImagesCount += 1;
    }

    var i,
        image,
        IMAGE_FOLDER = '../assets/',
    IMAGE_NAMES = [
        'background.png',
        'coin.png',
        'hero.png',
        'BunchOfRocks.png',
        'Cactus.png',
        'CowboyCactus.png',
        'FriendlyCactus.png',
        'GrumpyRock.png',
        'ScaredCactus.png',
        'ThornyCactus.png'
    ],
        IMAGES_COUNT = IMAGE_NAMES.length,
        loadedImagesCount = 0,
        Images = {
            areAllLoaded: function () {
                return IMAGES_COUNT === loadedImagesCount;
            }
        };

    for (i = 0; i < IMAGES_COUNT; i += 1) {
        image = new Image();
        image.onload = onImageLoad;
        image.src = IMAGE_FOLDER + IMAGE_NAMES[i];
        Images[IMAGE_NAMES[i]] = image;
    }

    return Images;
})();