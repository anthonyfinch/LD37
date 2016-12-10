var Waypoint = require('../components/waypoint.js'),
    Worker = require('../components/worker.js');
var game = {};

game.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.stage.backgroundColor = '#fce08c';
    this.map = this.game.add.tilemap('level');
    this.map.addTilesetImage('tileset', 'tilesheet');
    this.building = this.map.createLayer('building');


    this.workers = this.game.add.group();
    this.workers.classType = Worker;
    this.worker1 = this.workers.create(640, 224);
    this.worker2 = this.workers.create(640, 384);

    this.waypoints = this.game.add.group();
    this.waypoints.classType = Waypoint;
    this.waypoints.enableBody = true;

    this.waypoint1 = this.waypoints.create(128, 224);
    this.waypoint2 = this.waypoints.create(128, 768);
    this.waypoint3 = this.waypoints.create(480, 768);

    this.waypoint1.nextWP = this.waypoint2;
    this.waypoint2.nextWP = this.waypoint3;

    this.waypoint3.stopPoint = true;

    this.worker1.wStartDescent = this.waypoint1;
    this.worker2.wStartDescent = this.waypoint2;


};

game.workerClick = function () {
    this.worker1.goToBathroom();
};

game.update = function () {
    this.game.physics.arcade.overlap(this.workers, this.waypoints, this.handleWayPoint, this.closeEnough, this);
};

game.closeEnough = function (worker, waypoint) {
    return this.game.physics.arcade.distanceBetween(worker, waypoint) < 3;
};

game.handleWayPoint = function (worker, waypoint) {
    worker.handleWaypoint(waypoint);
};


module.exports = game;
