Worker = function(game, x, y, name, peeDelay) {
    Phaser.Sprite.call(this, game, x, y, 'person');
    this.name = name;
    this.game.physics.arcade.enable(this);
    this.inputEnabled = true;
    this.events.onInputDown.add(this.goToBathroom, this);

    this.peeDelay = peeDelay;

    this.game.time.events.loop(this.peeDelay, this.updatePee, this);

    this.needToPee = 0;
    this.state = 'working';
    this.waypoints = {};
    this.anchor.setTo(0.5, 0.5);

    var nameText = this.game.make.text(0, -25, this.name, {fontSize: '20px'});
    nameText.anchor.setTo(0.5, 0.5);

    this.peeText = this.game.make.text(0, -50, this.needToPee + '%', {fontSize: '20px'});
    this.peeText.anchor.setTo(0.5, 0.5);

    this.addChild(nameText);
    this.addChild(this.peeText);
};

Worker.prototype = Object.create(Phaser.Sprite.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.update = function() {
    this.peeText.setText(this.needToPee + '%');
};

Worker.prototype.updatePee = function() {
    if (this.state == 'working')
    {
        this.needToPee += 10;
    }
}

Worker.prototype.goToBathroom = function() {
    if (this.state != 'returningToWork') {
        this.game.physics.arcade.moveToObject(this, this.waypoints.toToilet, 200);
        this.state = 'goingToBathroom';
    };
};

Worker.prototype.handleWaypoint = function(waypoint) {
    if (this.state == 'goingToBathroom')
    {
        if (waypoint.type == 'toilet')
        {
            this.needToPee = 0;
            this.state = 'returningToWork';
            this.game.physics.arcade.moveToObject(this, this.waypoints.toWork, 200);
        }
        else if (waypoint.type == 'waypoint')
        {
            this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toToilet, 200);
        };
    }
    else if(this.state == 'returningToWork')
    {
        if (waypoint == this.waypoints.toToilet)
        {
            this.game.physics.arcade.moveToObject(this, this.waypoints.origin, 200);
        }
        else if (waypoint == this.waypoints.origin)
        {
            this.state = 'working';
            this.body.velocity.setTo(0, 0);
        }
        else if (waypoint.type == 'waypoint')
        {
            this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toWork);
        }
    }
    else
    {
    }
};

module.exports = Worker;
