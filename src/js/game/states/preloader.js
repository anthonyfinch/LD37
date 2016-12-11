var preloader = {};

preloader.preload = function () {
    this.game.load.image('logo', 'images/wiz-face.png');
    this.game.load.image('tilesheet', 'images/tileset2.png');
    this.game.load.image('background', 'images/background.png');
    this.game.load.spritesheet('person', 'images/person2.png', 48, 72);
    this.game.load.image('waypoint', 'images/waypoint.png');
    this.game.load.tilemap('level', 'tilemaps/building.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
