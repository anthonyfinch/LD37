Waypoint = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'person');
    this.waypoints = {};
    this.type = 'travelpoint';
};

Waypoint.prototype = Object.create(Phaser.Sprite.prototype);
Waypoint.prototype.constructor = Waypoint;

module.exports = Waypoint;
