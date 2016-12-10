var Worker = function(game, x, y, name, peeInc) {
    Phaser.Sprite.call(this, game, x, y, 'person');
    this.name = name;
    this.game.physics.arcade.enable(this);
    this.inputEnabled = true;
    this.events.onInputDown.add(this.goToBathroom, this);

    this.peeInc = peeInc;

    this.game.time.events.loop(500, this.updatePee, this);

    this.state = 'working';
    this.waypoints = {};
    this.anchor.setTo(0.5, 0.5);

    var nameText = this.game.make.text(0, -25, this.name, {fontSize: '20px'});
    nameText.anchor.setTo(0.5, 0.5);

    this.peeText = this.game.make.text(0, -50, '', {fontSize: '20px'});
    this.peeText.anchor.setTo(0.5, 0.5);

    this.addChild(nameText);
    this.addChild(this.peeText);

    this.setPee(0);
};

Worker.prototype = Object.create(Phaser.Sprite.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.setPee = function(pee) {
    if (pee > 100)
    {
        this.puddleSignal.dispatch();
        pee = 0;
    }
    if (pee < 0)
    {
        pee = 0;
    }
    this.needToPee = pee;
    this.peeText.setText(Math.round(this.needToPee) + '%');
};

Worker.prototype.updatePee = function() {
    if (this.state === 'working' || this.state === 'goingToBathroom')
    {
        this.setPee(this.needToPee + this.peeInc);
    }
    else if(this.state === 'peeing' && this.needToPee > 0)
    {
        this.setPee(this.needToPee - 5);
    }
};

Worker.prototype.lockOn = function(wp)
{
    this.body.position.setTo(wp.body.position.x, wp.body.position.y);
    this.body.velocity.setTo(0, 0);
};

Worker.prototype.goToBathroom = function() {
    if (this.state !== 'returningToWork') {
        this.game.physics.arcade.moveToObject(this, this.waypoints.toToilet, 200);
        this.state = 'goingToBathroom';
    }
};

Worker.prototype.handleWaypoint = function(waypoint) {
     if (this.state === 'goingToBathroom')
    {
         this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toToilet, 200);
    }
    else if(this.state === 'returningToWork')
    {
        if (waypoint === this.waypoints.toToilet)
        {
            this.game.physics.arcade.moveToObject(this, this.waypoints.origin, 200);
        }
        else
        {
            this.game.physics.arcade.moveToObject(this, waypoint.waypoints.toWork);
        }
    }
};

Worker.prototype.handleWorkplace = function(waypoint) {
    if (this.state === 'returningToWork' && waypoint === this.waypoints.origin)
    {
        this.state = 'working';
        this.lockOn(waypoint);
    }
};

Worker.prototype.handleQueue = function(waypoint) {
    if (this.state === 'goingToBathroom')
    {
        var wp = waypoint.waypoints.toToilet;
        if (wp.occupied)
        {
            if (waypoint.occupied && waypoint.occupant !== this)
            {
                this.game.physics.arcade.moveToObject(this, waypoint.waypoints.previousSpace, 200);
            }
            else
            {
                waypoint.occupied = true;
                waypoint.occupant = this;
                this.lockOn(waypoint);
            }
        }
        else
        {
            this.game.physics.arcade.moveToObject(this, wp, 200);
            waypoint.occupied = false;
        }
    }
};

Worker.prototype.handleToilet = function(waypoint) {
    if (waypoint.occupied && waypoint.occupant !== this)
    {
        this.game.physics.arcade.moveToObject(this, waypoint.waypoints.previousSpace, 200);
    }
    else
    {
        if (this.needToPee > 0)
        {
            waypoint.occupied = true;
            waypoint.occupant = this;
            this.state = 'peeing';
            this.lockOn(waypoint);
        }
        else
        {
            waypoint.occupied = false;
            this.state = 'returningToWork';
            this.game.physics.arcade.moveToObject(this, this.waypoints.toWork, 200);
        }
    }
};

Worker.prototype.handleMarker = function(waypoint) {
    switch (waypoint.type)
    {
    case 'toilet':
        this.handleToilet(waypoint);
        break;
    case 'waypoint':
        this.handleWaypoint(waypoint);
        break;
    case 'queue':
        this.handleQueue(waypoint);
        break;
    case 'workplace':
        this.handleWorkplace(waypoint);
        break;
    }
};

module.exports = Worker;
