/*global Game*/
Game.Menu = function (game) {
    this.game = game;
};

Game.Menu.prototype = {
    create: function () {
        

    },
    update: function () {
        //Click to Start
//        if (this.game.input.activePointer.isDown) {
            this.game.state.start('Play');
//        }
    }
};
