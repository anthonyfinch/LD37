var gameover = {};

gameover.init = function(timeWorked) {
    this.timeWorked = timeWorked;
};

gameover.create = function() {
    this.game.stage.backgroundColor = '#5fcde4';
    this.text = this.game.add.bitmapText(
        this.game.world.centerX,
        this.game.world.centerY - 10,
        'carrier_command',
        'Well done! You managed to last for ' + this.timeWorked + ' minutes of the workday! Click to try again.'
    );
    this.text.anchor.setTo(0.5, 0.5);
    this.text.maxWidth = 700;

    this.game.input.onDown.addOnce(this.restartGame, this);
};

gameover.restartGame = function() {
    this.game.state.start('game');
};

module.exports = gameover;
