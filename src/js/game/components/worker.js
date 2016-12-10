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
    if (this.state == 'working') {
        this.game.physics.arcade.moveToObject(this, this.waypoints.toToilet, 200);
        this.state = 'goingToBathroom';
    };
};

Worker.prototype.handleWaypoint = function(waypoint) {
    if (this.state == 'goingToBathroom')
    {
        if (waypoint.type == 'toilet')
        {
            this.state = 'returningToWork';
            this.game.physics.arcade.moveToObject(this, this.waypoints.toWork, 200);
        }
        else if (waypoint.type == 'waypoint')
        {
            this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toToilet, 200);
        };
    }
    else if(this.state =='returningToWork')
    {
        if (waypoint == this.waypoints.toToilet)
        {
            this.body.velocity = 0;
        }
        else if (waypoint.type == 'waypoint')
        {
            this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toWork);
        }
    }
};

module.exports = Worker;
