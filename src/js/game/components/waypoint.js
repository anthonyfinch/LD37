var Waypoint = function(game, x, y, wptype) {
    Phaser.Sprite.call(this, game, x, y, 'waypoint');
    this.waypoints = {};
    this.type = wptype;
    this.occupied = false;
    this.anchor.setTo(0.5, 0.5);
};

Waypoint.prototype = Object.create(Phaser.Sprite.prototype);
Waypoint.prototype.constructor = Waypoint;

module.exports = Waypoint;
