var Game = {
    w: window.innerWidth,
    h: window.innerHeight
};

// var w = 800;
// var h = 600;

Game.Boot = function (game) {
    this.game = game;
};

Game.Boot.prototype = {
    preload: function () {
        //Automatically Scale to fit available screen
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.maxHeight = window.innerHeight;
        this.game.scale.maxWidth = window.innerHeight * (Game.w / Game.h);

        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVeritcally = true;
//        this.game.scale.setScreenSize(true);
    },
    create: function () {
        this.game.state.start('Load');
    }
};

Game.Load = function (game) {
    this.game = game;
};

Game.Load.prototype = {
    preload: function () {
        // FONT
        game.load.bitmapFont('gem', 'assets/bitmap-fonts/din3_0.png?v=2', 'assets/bitmap-fonts/din3.fnt?v=2');

        // IMAGE
        game.load.image('ball', 'assets/images/sprite-sheet0.png?v=2', 0, 0);
        game.load.image('bg', 'assets/images/bg.jpg?v=2', 0, 0);
        game.load.image('platform', 'assets/images/platform.png?v=2', 0, 0);
        
        //Debug Plugin
        // this.game.add.plugin(Phaser.Plugin.Debug);

        //Loading Screen Message/bar
        var loadingText = this.game.add.text(Game.w, Game.h, 'Loading...', {font: '30px Helvetica', fill: '#000'});
        loadingText.anchor.setTo(0.5, 0.5);
        var preloading = this.game.add.sprite(Game.w / 2 - 64, Game.h / 2 + 50, 'loading');
        this.game.load.setPreloadSprite(preloading);




        // Music Track
        // this.game.load.audio('music','soundtrack.mp3');

    },
    create: function () {
        this.game.state.start('Menu');
    }
};
