var game = {};

game.create = function () {
    this.game.stage.backgroundColor = '#5fcde4';

    var pbw = this.game.add.bitmapText(
        this.game.world.centerX,
        20,
        'carrier_command',
        '-A Pixel Beard Wizard Production-',
        16
    );
    pbw.anchor.setTo(0.5, 0.5);

    var title = this.game.add.bitmapText(
        this.game.world.centerX,
        100,
        'carrier_command',
        'Bathroom Break\nManager',
        40
    );
    title.anchor.setTo(0.5, 0.5);
    title.align = 'center';

    var titleBg;
    var w = title.width + 40;
    var h = title.height + 40;

    var bmd = this.game.add.bitmapData(w, h);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, w, h);
    bmd.ctx.fillStyle = '#111111';
    bmd.ctx.fill();
    titleBg = this.game.add.sprite(game.world.centerX, 100, bmd);
    titleBg.anchor.setTo(0.5, 0.5);

    this.game.world.bringToTop(title);

    var desc_text = 'THE ESTEEMED LAWFIRM OF BILGELY, FLATULOUS AND DAMPPATCH KNOW A THING OR TWO ABOUT PENNY-PINCHING. THEY\'VE EVEN CUT THE OFFICE DOWN TO ONE BATHROOM. FORTUNATELY THEY\'VE HIRED YOU FOR THE GLAMOROUS POSITION OF BATHROOM BREAK manager.\n\n\nHOW TO PLAY: CLICK A WORKER IN THEIR OFFICE TO SEND THEM TO THE WC TO RELIEVE THEMSELVES. IF THE WC IS OCCUPIED, THEY WILL FORM A LINE, BUT BE WARNED,IF IT GETS TOO LONG, THEY WILL RETURN TO THEIR OFFICE.THE GAME IS OVER IF YOU HAVE A FEW TOO MANY "ACCIDENTS."';

    var desc = this.game.add.bitmapText(
        50,
        200,
        'carrier_command',
        '',
        15
    );

    desc.maxWidth = 700;
    desc.lineSpacing =20;

    desc.text = desc_text;

    this.text = this.game.add.bitmapText(
        this.game.world.centerX,
        700,
        'carrier_command',
        'click to play'
    );
    this.text.anchor.setTo(0.5, 0.5);

    this.game.input.onDown.addOnce((function() {this.game.state.start('game');}), this);

};


module.exports = game;
