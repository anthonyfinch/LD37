var Waypoint = require('../components/waypoint.js'),
    Worker = require('../components/worker.js');
var game = {};

game.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.maxPuddles = 3;

    this.game.stage.backgroundColor = '#fce08c';
    this.bg = this.game.add.image(0, 0, 'background');
    this.map = this.game.add.tilemap('level');
    this.map.addTilesetImage('building', 'tilesheet');
    this.building = this.map.createLayer('building');

    this.puddles = 0;
    this.puddleText = this.game.add.bitmapText(10, 10, 'carrier_command', '', 20);
    this.timeWorked = 0;
    this.timeText = this.game.add.bitmapText(10, 40, 'carrier_command', '', 20);


    this.game.time.events.loop(1000, this.updateTime, this);

    this.puddleSignal = new Phaser.Signal();
    this.puddleSignal.add(this.updatePuddles, this);

    this.toiletSignal = new Phaser.Signal();
    this.toiletSignal.add(this.toiletSounds, this);

    this.flush = this.game.add.audio('flush');
    this.pee = this.game.add.audio('pee');
    this.setUpWorkers();

    this.puddleText.setText('Puddles: ' + this.puddles + '/' + this.maxPuddles);
    this.walkables = this.map.createLayer('walkables');
    this.wcText = this.game.add.bitmapText(505, 695, 'carrier_command', 'WC', 25);
};

game.updateTime = function() {
    this.timeWorked += 1;
    this.timeText.setText('Time Worked: ' + this.timeWorked + ' mins');
};

game.toiletSounds = function(activity) {
    // if (activity === 'peeing') {
    //     // this.pee.play();
    // }
    if (activity === 'flushing') {
        this.pee.stop();
        this.flush.play();
    }
};

game.updatePuddles = function() {
    this.puddles += 1;
    this.puddleText.setText('Puddles: ' + this.puddles + '/' + this.maxPuddles);

    if (this.puddles >= this.maxPuddles)
    {
        this.game.state.start('gameover', true, false, this.timeWorked);
    }
};

game.setUpWorkers = function() {
    this.waypoints = this.game.add.group();
    this.waypoints.classType = Waypoint;
    this.waypoints.enableBody = true;

    this.workers = this.game.add.group();
    this.workers.classType = Worker;


    var thirdFloor, secondFloor, firstFloor, groundFloor, toilet;
    var jeremyOrigin, fredOrigin, carlaOrigin, esmereldaOrigin, lucyOrigin, benOrigin;
    var q1, q2, q3;

    thirdFloor = this.waypoints.create(86, 320, 'waypoint');
    secondFloor = this.waypoints.create(215, 464, 'waypoint');
    firstFloor = this.waypoints.create(85, 659, 'waypoint');
    groundFloor = this.waypoints.create(181, 767, 'waypoint');

    jeremyOrigin = this.waypoints.create(700, 302, 'workplace');
    carlaOrigin = this.waypoints.create(320, 302, 'workplace');
    fredOrigin = this.waypoints.create(656, 478, 'workplace');
    esmereldaOrigin = this.waypoints.create(432, 478, 'workplace');
    lucyOrigin = this.waypoints.create(549, 655, 'workplace');
    benOrigin = this.waypoints.create(380, 655, 'workplace');

    toilet = this.waypoints.create(505, 767, 'toilet');

    q1 = this.waypoints.create(457, 767, 'queue');
    q2 = this.waypoints.create(409, 767, 'queue');
    q3 = this.waypoints.create(361, 767, 'queue');
    // q4 = this.waypoints.create(313, 767, 'queue');

    this.waypoints.setAll('visible', false);

    var jeremy, fred, carla, esmerelda, lucy, ben;

    jeremy = this.workers.create(700, 302, 'person1', 1.5, 'person1');
    carla = this.workers.create(320, 302, 'person2', 1, 'person2');
    fred = this.workers.create(656, 478, 'person3', 1.1, 'person3');
    esmerelda = this.workers.create(432, 478, 'person4', 2, 'person4');
    lucy = this.workers.create(549, 655, 'person5', 1.4, 'person5');
    ben = this.workers.create(380, 655, 'person6', 0.9, 'person6');

    this.workers.setAll('puddleSignal', this.puddleSignal, false, false, 0, true);
    this.workers.setAll('toiletSignal', this.toiletSignal, false, false, 0, true);

    thirdFloor.waypoints.toToilet = secondFloor;
    secondFloor.waypoints.toToilet = firstFloor;
    firstFloor.waypoints.toToilet = groundFloor;
    groundFloor.waypoints.toToilet = q3;
    // q4.waypoints.toToilet = q3;
    q3.waypoints.toToilet = q2;
    q2.waypoints.toToilet = q1;
    q1.waypoints.toToilet = toilet;

    // q3.waypoints.previousSpace = q4;
    q2.waypoints.previousSpace = q3;
    q1.waypoints.previousSpace = q2;
    toilet.waypoints.previousSpace = q1;

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
    this.game.physics.arcade.overlap(this.workers, this.waypoints, this.handleWaypoint, this.closeEnough, this);
};

game.closeEnough = function (worker, waypoint) {
    return this.game.physics.arcade.distanceBetween(worker, waypoint) < 9;
};

game.handleWaypoint = function (worker, waypoint) {
    worker.handleMarker(waypoint);
};


module.exports = game;
