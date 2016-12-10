var Waypoint = require('../components/waypoint.js'),
    Worker = require('../components/worker.js');
var game = {};

game.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.stage.backgroundColor = '#fce08c';
    this.map = this.game.add.tilemap('level');
    this.map.addTilesetImage('tileset', 'tilesheet');
    this.building = this.map.createLayer('building');

    this.setUpWorkers();

};

game.setUpWorkers = function() {
    this.workers = this.game.add.group();
    this.workers.classType = Worker;

    this.waypoints = this.game.add.group();
    this.waypoints.classType = Waypoint;
    this.waypoints.enableBody = true;

    var jeremy, fred, carla, esmerelda, lucy, ben;

    jeremy = this.workers.create(640, 224);
    carla = this.workers.create(416, 224);
    fred = this.workers.create(640, 384);
    esmerelda = this.workers.create(416, 384);
    lucy = this.workers.create(640, 544);
    ben = this.workers.create(416, 544);

    var thirdFloor, secondFloor, firstFloor, groundFloor, toiletDoor;

    thirdFloor = this.waypoints.create(128, 224);
    groundFloor = this.waypoints.create(128, 768);
    toiletDoor = this.waypoints.create(480, 768);
    toiletDoor.type = 'toiletdoor';
    toiletDoor.stopPoint = true;

    thirdFloor.waypoints.toToilet = groundFloor;
    groundFloor.waypoints.toToilet = toiletDoor;

    jeremy.waypoints.toToilet = thirdFloor;
    fred.waypoints.toToilet = groundFloor;

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
