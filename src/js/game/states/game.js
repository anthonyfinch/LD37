var game = {};

game.create = function () {
    this.game.stage.backgroundColor = '#fce08c';
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-50, 'logo');
    this.logo.smoothed = false;
    this.logo.scale.setTo(6, 6);
    this.logo.anchor.setTo(0.5, 0.5);
    this.logo.alpha = 0;

    this.game.add.tween(this.logo).to(
        {alpha: 1},
        2000,
        Phaser.Easing.Linear.None,
        true,
        0,
        1000,
        true
    );

    this.text = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY + 100,
        'loading...',
        {fill: '#000'}
    );
    this.text.anchor.setTo(0.5, 0.5);

};

game.update = function () {
};


module.exports = game;
