var
        text_back,
        imageTween,
        speed = 0,
        maxSpeed = 88,
        image,
        bg,
        launchX = 400,
        launchY = 450,
        platformSprite1,
        counter = 0,
        maxCounter = 0,
        textPointString,
        textPoint,
        textMaxPoint;

Game.Play = function (game) {
    this.game = game;
};

Game.Play.prototype = {
    preload: function () {

    },
    create: function () {

        var
                self = this;

        /*
         * 
         * add background
         */
        bg = this.game.add.image(0, 0, "bg");
        bg.x = -(bg.width - Game.w) / 2;
        bg.y = -(bg.height - Game.h)

        bg.align = "center";

        /*
         * 
         * turn on Box2D
         */
        this.game.physics.startSystem(Phaser.Physics.BOX2D);
        this.game.physics.box2d.friction = 0.6;
        this.game.physics.box2d.setBoundsToWorld();
        this.game.physics.box2d.restitution = 0.6;
        this.game.physics.box2d.gravity.y = 1100;

        /*
         * 
         * static platform
         */
        platformSprite1 = this.game.add.sprite(0, 0, 'platform');
        platformSprite1.y = Game.h - platformSprite1.height + (platformSprite1.height / 2) - 10;
        platformSprite1.width = 2000
        this.game.physics.box2d.enable(platformSprite1);
        platformSprite1.body.static = true;
        platformSprite1.anchor.setTo(0, 0);

        /*
         * 
         * ball 
         */

        image = this.game.add.sprite(50 + (Math.random() * (Game.w - 50)) - 50, 0, "ball");
        image.smoothed = false;
        image.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
        image.play('fly');
        this.game.physics.box2d.enable(image, false);
        image.body.setCircle(42);

        /*
         * contact event
         */
        image.body.setBodyContactCallback(platformSprite1, this.hitCount, this);
        image.body.setCategoryPostsolveCallback(0x8000, self.callback, this);

        /*
         * button hit
         */
        image.inputEnabled = true;
        image.events.onInputDown.add(this.velocity, this);

        /* 
         * score def
         */
        textPointString = this.game.add.bitmapText(Game.w - 370, Game.h - 60, 'gem', '', 50);
        textPointString.align = 'center';
        textPointString.tint = 0xffffff;
        textPointString.setText("dekázásod: ");

        textPoint = this.game.add.bitmapText(Game.w - 155, Game.h - 60, 'gem', '', 50);
        textPoint.align = 'right';
        textPoint.tint = 0xffffff;
        textPoint.setText("0");

        textMaxPoint = this.game.add.bitmapText(Game.w - 100, Game.h - 60, 'gem', '', 50);
        textMaxPoint.align = 'right';
        textMaxPoint.tint = 0xffffff;
        textMaxPoint.setText("/ 15");

    },
    update: function () {
        var
                self = this;

    },
    callback: function (body1, body2, fixture1, fixture2, contact, impulseInfo) {

        // body1 is the ship because it's the body that owns the callback
        // body2 is the body it impacted with, in this case the world boundary
        // fixture1 is the fixture of body1 that was touched
        // fixture2 is the fixture of body2 that was touched
        // impulseInfo is a box2d.b2ContactImpulse object

        // The impulse info is split into a normal component (used to push the ship directly out of the wall)
        // and a tangential component (along the wall surface like friction, causes the ship to spin around)    
//        if (impulseInfo.count > 0)
//        {
//            console.log(impulseInfo.normalImpulses[0]);
//            console.log(impulseInfo.tangentImpulses[0]);
//        }


    },
    mouseDragStart: function () {

        this.game.physics.box2d.mouseDragStart(this.game.input.activePointer);

    },
    mouseDragMove: function () {

        this.game.physics.box2d.mouseDragMove(this.game.input.activePointer);

    },
    mouseDragEnd: function () {

        this.game.physics.box2d.mouseDragEnd();

    },
    getLaunchVelocity: function () {

        var dx = this.game.input.mousePointer.x - launchX;
        var dy = this.game.input.mousePointer.y - launchY;
        var
                mx = this.game.input.mousePointer.x,
                my = this.game.input.mousePointer.y,
                ix = image.x,
                iy = image.y,
                iw = image.width,
                ih = image.height,
                kx,
                ky,
                veloX,
                veloY;

        image.anchor.setTo(0, 0);
        veloX = (ix - mx);
        veloY = ((iy - (ih / 2)) - my);

        // Give it some more beans
        veloX *= 15;
        veloY *= 10;

        return {x: veloX, y: veloY};
    },
    velocity: function () {
        var
                self = this;

        /* 
         * count hits
         */

        counter++;
        textPoint.setText(counter);

        var launchVelocity = this.getLaunchVelocity();
        image.anchor.setTo(0.5, 0.5);

        image.body.velocity.x = launchVelocity.x;
        image.body.velocity.y = launchVelocity.y;

    },
    hitCount: function () {
        var
                self = this;

        counter = 0;
        textPoint.setText("0");

        if (counter > maxCounter)
            maxCounter = counter;

    }
};
