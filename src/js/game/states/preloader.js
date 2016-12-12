var preloader = {};

preloader.preload = function () {
    this.game.load.image('logo', 'images/wiz-face.png');
    this.game.load.image('tilesheet', 'images/tileset2.png');
    this.game.load.image('background', 'images/background.png');
    this.game.load.spritesheet('person1', 'images/person2.png', 48, 72);
    this.game.load.spritesheet('person2', 'images/person3.png', 48, 72);
    this.game.load.spritesheet('person3', 'images/person4.png', 48, 72);
    this.game.load.spritesheet('person4', 'images/person5.png', 48, 72);
    this.game.load.spritesheet('person5', 'images/person6.png', 48, 72);
    this.game.load.spritesheet('person6', 'images/person7.png', 48, 72);
    this.game.load.image('waypoint', 'images/waypoint.png');
    this.game.load.tilemap('level', 'tilemaps/building.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');
};

preloader.create = function () {
    this.game.state.start('loading');
};

module.exports = preloader;
