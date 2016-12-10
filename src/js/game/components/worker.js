Worker = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'person');
    this.game.physics.arcade.enable(this);
    this.inputEnabled = true;
    this.events.onInputDown.add(this.goToBathroom, this);

    this.state = 'working';
    this.waypoints = {};
};

Worker.prototype = Object.create(Phaser.Sprite.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.goToBathroom = function() {
    if (this.state = 'working') {
        this.game.physics.arcade.moveToObject(this, this.waypoints.toToilet, 200);
        this.state = 'goingToBathroom';
    };
};

Worker.prototype.handleWaypoint = function(waypoint) {
    if (waypoint.stopPoint)
    {
        this.body.velocity = 0;
    }
    else
    {
        this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toToilet, 200);
    }
};

module.exports = Worker;
