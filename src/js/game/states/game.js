var game = {};

game.create = function () {
    this.game.stage.backgroundColor = '#fce08c';

    this.map = this.game.add.tilemap('level');

    this.map.addTilesetImage('tileset', 'tilesheet');

    this.building = this.map.createLayer('building');
};

game.update = function () {
};


module.exports = game;
