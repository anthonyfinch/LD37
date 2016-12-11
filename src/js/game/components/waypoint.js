var Waypoint = function(game, x, y, wptype) {
    Phaser.Sprite.call(this, game, x, y, 'waypoint');
    this.waypoints = {};
    this.type = wptype;
    this.occupied = false;
    this.anchor.setTo(0.5, 0.75);
    this.width = 48;
    this.height = 72;
    this.inputEnabled = true;
    this.events.onInputDown.add(this.debugMe, this);
};

Waypoint.prototype = Object.create(Phaser.Sprite.prototype);
Waypoint.prototype.constructor = Waypoint;

Waypoint.prototype.debugMe = function() {
    console.log(this);
};


module.exports = Waypoint;
