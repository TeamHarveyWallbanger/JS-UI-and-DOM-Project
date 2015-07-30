// hero: {
// 	collider: rect,
// 	currentFrame: image,
// 	_moveFrames: [images],
// 	_jumpFrames: [images],
// 	startRunAnimation(),
// 	endRunAnimation(),
// 	startJumpAnimation(),
// 	endJumpAnimation()
// }

(function hero() {
    var heroStage = new Kinetic.Stage({
            container: 'kinetic-container',
            width: 1000,
            height: 750
        }),
        heroLayer = new Kinetic.Layer(),
        currentFrame,
        _moveFrames = {
            move: [{
                x: 19,
                y: 50,
                width: 126,
                height: 157
            },
                {
                    x: 195,
                    y: 50,
                    width: 126,
                    height: 157
                },
                {
                    x: 362,
                    y: 50,
                    width: 126,
                    height: 157
                },
                {
                    x: 504,
                    y: 50,
                    width: 126,
                    height: 157
                },
                {
                    x: 676,
                    y: 50,
                    width: 126,
                    height: 157
                },
                {
                    x: 843,
                    y: 50,
                    width: 126,
                    height: 157
                }]
        },
        _jumpFrames = {
            jump: [{
                x: 34,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 194,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 341,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 499,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 651,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 800,
                y: 306,
                width: 122,
                height: 148
            }, {
                x: 13,
                y: 562,
                width: 122,
                height: 148
            }, {
                x: 173,
                y: 562,
                width: 122,
                height: 148
            }, {
                x: 333,
                y: 562,
                width: 122,
                height: 148
            }, {
                x: 493,
                y: 562,
                width: 122,
                height: 148
            }, {
                x: 678,
                y: 562,
                width: 122,
                height: 148
            }, {
                x: 823,
                y: 562,
                width: 122,
                height: 148
            }]
        },
        heroImageObj = new Image(),
        collider = new Kinetic.Rect({
            x: 375,
            y: 100,
            width: 124,
            height: 152
        });

    heroImageObj.src = "../assets/Hero.png";

    heroImageObj.onload = function () {
        var moveSprite = new Kinetic.Sprite({
                x: 375,
                y: 100,
                image: heroImageObj,
                animation: 'move',
                animations: _moveFrames,
                frameRate: 7
            }),
            jumpSprite = new Kinetic.Sprite({
                x: 0,
                y: 0,
                image: heroImageObj,
                animation: 'jump',
                animations: _jumpFrames,
                frameRate: 7
            })
    };

    heroLayer.add(moveSprite);
    heroLayer.add(jumpSprite);

    heroStage.add(heroLayer);

    //$(window).keypress(function (e) {
    //    if (e.KeyCode === 0 || e.KeyCode === 32) {
    //        endRunAnimation();
    //        startJumpAnimation();
    //    } else {
    //        endJumpAnimation();
    //        startRunAnimation();
    //    }
    //});


    function startRunAnimation() {
        while(!kd.SPACE.down) {
            for (var i = 0; i < _moveFrames.length; i+=1) {
                currentFrame = _moveFrames[i];
            }


        }

        return;
    }

    function endRunAnimation() {
        while(kd.SPACE.down) {
            break;
        }

        return;
    }

    function startJumpAnimation() {

    }

    function endJumpAnimation() {

    }

    return hero();
}());