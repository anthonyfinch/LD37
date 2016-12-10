var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/wiz-face.png');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
