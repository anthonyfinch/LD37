Waypoint = function(game, x, y, wptype) {
    Phaser.Sprite.call(this, game, x, y, 'waypoint');
    this.waypoints = {};
    this.type = wptype;
};

Waypoint.prototype = Object.create(Phaser.Sprite.prototype);
Waypoint.prototype.constructor = Waypoint;

module.exports = Waypoint;
