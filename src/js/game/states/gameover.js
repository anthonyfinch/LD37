var gameover = {};

gameover.create = function() {
    this.game.stage.backgroundColor = '#fce08c';
    this.text = this.game.add.text(
        this.game.world.width / 2,
        this.game.world.height / 2,
        'Oh dear, that\'s game over.... click to try again?'
    );
    this.text.anchor.setTo(0.5, 0.5);

    this.game.input.onDown.addOnce(this.restartGame, this);
};

gameover.restartGame = function() {
    this.game.state.start('game');
}

module.exports = gameover;
