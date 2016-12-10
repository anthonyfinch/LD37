var preloader = {};

preloader.preload = function () {
    this.game.load.image('logo', 'images/wiz-face.png');
    this.game.load.image('tilesheet', 'images/tilesheet.png');
    this.game.load.image('person', 'images/person.png');
    this.game.load.tilemap('level', "tilemaps/base.json", null, Phaser.Tilemap.TILED_JSON);
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
