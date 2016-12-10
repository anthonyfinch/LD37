var Waypoint = require('../components/waypoint.js'),
    Worker = require('../components/worker.js');
var game = {};

game.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.stage.backgroundColor = '#fce08c';
    this.map = this.game.add.tilemap('level');
    this.map.addTilesetImage('tileset', 'tilesheet');
    this.building = this.map.createLayer('building');

    this.puddles = 0;
    this.puddleText = this.game.add.text(10, 10, '');
    this.puddleSignal = new Phaser.Signal();
    this.puddleSignal.add(this.updatePuddles, this);

    this.setUpWorkers();

};

game.updatePuddles = function() {
    this.puddles += 1;
};

game.setUpWorkers = function() {
    this.waypoints = this.game.add.group();
    this.waypoints.classType = Waypoint;
    this.waypoints.enableBody = true;

    this.workers = this.game.add.group();
    this.workers.classType = Worker;


    var thirdFloor, secondFloor, firstFloor, groundFloor, toilet;
    var jeremyOrigin, fredOrigin, carlaOrigin, esmereldaOrigin, lucyOrigin, benOrigin;
    var q1, q2, q3, q4, q5;

    thirdFloor = this.waypoints.create(144, 240, 'waypoint');
    secondFloor = this.waypoints.create(208, 400, 'waypoint');
    firstFloor = this.waypoints.create(144, 560, 'waypoint');
    groundFloor = this.waypoints.create(208, 784, 'waypoint');

    jeremyOrigin = this.waypoints.create(656, 240, 'workplace');
    carlaOrigin = this.waypoints.create(432, 240, 'workplace');
    fredOrigin = this.waypoints.create(656, 400, 'workplace');
    esmereldaOrigin = this.waypoints.create(432, 400, 'workplace');
    lucyOrigin = this.waypoints.create(656, 560, 'workplace');
    benOrigin = this.waypoints.create(432, 560, 'workplace');

    toilet = this.waypoints.create(496, 784, 'toilet');

    q1 = this.waypoints.create(432, 784, 'queue');
    q2 = this.waypoints.create(400, 784, 'queue');
    q3 = this.waypoints.create(368, 784, 'queue');
    q4 = this.waypoints.create(336, 784, 'queue');
    q5 = this.waypoints.create(306, 784, 'queue');

    var jeremy, fred, carla, esmerelda, lucy, ben;

    jeremy = this.workers.create(656, 240, 'Jeremy', 5000);
    carla = this.workers.create(432, 240, 'Carla', 10000);
    fred = this.workers.create(656, 400, 'Fred', 8000);
    esmerelda = this.workers.create(432, 400, 'Esmerelda', 3000);
    lucy = this.workers.create(656, 560, 'Lucy', 9000);
    ben = this.workers.create(432, 560, 'Ben', 11000);

    this.workers.setAll('puddleSignal', this.puddleSignal, false, false, 0, true);

    thirdFloor.waypoints.toToilet = secondFloor;
    secondFloor.waypoints.toToilet = firstFloor;
    firstFloor.waypoints.toToilet = groundFloor;
    groundFloor.waypoints.toToilet = q5;
    q5.waypoints.toToilet = q4;
    q4.waypoints.toToilet = q3;
    q3.waypoints.toToilet = q2;
    q2.waypoints.toToilet = q1;
    q1.waypoints.toToilet = toilet;

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

    jeremy.waypoints.origin = jeremyOrigin;
    carla.waypoints.origin = carlaOrigin;
    fred.waypoints.origin = fredOrigin;
    esmerelda.waypoints.origin = esmereldaOrigin;
    lucy.waypoints.origin = lucyOrigin;
    ben.waypoints.origin = benOrigin;

};

game.update = function () {
    this.game.physics.arcade.overlap(this.workers, this.waypoints, this.handleWayPoint, this.closeEnough, this);
    this.puddleText.setText('Puddles: ' + this.puddles);
};

game.closeEnough = function (worker, waypoint) {
    return this.game.physics.arcade.distanceBetween(worker, waypoint) < 9;
};

game.handleWayPoint = function (worker, waypoint) {
    worker.handleWaypoint(waypoint);
};


module.exports = game;
