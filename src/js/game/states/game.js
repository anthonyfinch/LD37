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

    var thirdFloor, secondFloor, firstFloor, groundFloor, toilet;

    thirdFloor = this.waypoints.create(128, 224, 'waypoint');
    secondFloor = this.waypoints.create(192, 384, 'waypoint');
    firstFloor = this.waypoints.create(128, 544, 'waypoint');
    groundFloor = this.waypoints.create(192, 768, 'waypoint');

    toilet = this.waypoints.create(480, 768, 'toilet');

    thirdFloor.waypoints.toToilet = secondFloor;
    secondFloor.waypoints.toToilet = firstFloor;
    firstFloor.waypoints.toToilet = groundFloor;
    groundFloor.waypoints.toToilet = toilet;

    secondFloor.waypoints.toWork = thirdFloor;
    firstFloor.waypoints.toWork = secondFloor;
    groundFloor.waypoints.toWork = firstFloor;

    jeremy.waypoints.toToilet = thirdFloor;
    carla.waypoints.toToilet = thirdFloor;
    fred.waypoints.toToilet = secondFloor;
    esmerelda.waypoints.toToilet = secondFloor;
    lucy.waypoints.toToilet = firstFloor;
    ben.waypoints.toToilet = firstFloor;

    jeremy.waypoints.toWork = groundFloor;
    carla.waypoints.toWork = groundFloor;
    fred.waypoints.toWork = groundFloor;
    esmerelda.waypoints.toWork = groundFloor;
    lucy.waypoints.toWork = groundFloor;
    ben.waypoints.toWork = groundFloor;

};

game.update = function () {
    this.game.physics.arcade.overlap(this.workers, this.waypoints, this.handleWayPoint, this.closeEnough, this);
};

game.closeEnough = function (worker, waypoint) {
    return this.game.physics.arcade.distanceBetween(worker, waypoint) < 9;
};

game.handleWayPoint = function (worker, waypoint) {
    worker.handleWaypoint(waypoint);
};


module.exports = game;
