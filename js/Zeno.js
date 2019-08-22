let Zeno = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Zeno () {
    Phaser.Scene.call(this, { key: 'zeno' });

    this.FLAG_SPEED = 2;
    this.ZENO_SPEED = 1;
    this.MAX_LEFT = 4*20;

    this.zenoInputSuccess = false;
    this.flagInputSuccess = false;

  },

  create: function () {
    this.HALF_WAY = this.game.canvas.width / 2;

    this.cameras.main.setBackgroundColor('#dad');

    this.MAX_RIGHT = this.game.canvas.width - 4*20;
    this.MAX_LEFT = 0 + 4*20;

    this.gameIsOver = false;

    // Sound
    this.victorySFX = this.sound.add('victory');
    this.victorySFX.volume = 0.2;
    this.gameOverSFX = this.sound.add('swoopdown');
    this.gameOverSFX.volume = 0.2;

    // Create the sprite that represents the entire minigame, scale up
    this.zeno = this.add.sprite(4*10, this.game.canvas.height/2 + 4*15, 'atlas', 'zeno/zeno/zeno_1.png');
    this.zeno.setScale(4,4);

    let flagIndicatorString = "FLAG >";
    let flagIndicatorStyle = { fontFamily: 'Commodore', fontSize: '22px', fill: '#000', wordWrap: true, align: 'center' };
    this.flagIndicatorText = this.add.text(this.game.canvas.width - 30*4,240,flagIndicatorString,flagIndicatorStyle);
    this.flagIndicatorText.visible = false;

    this.flag = this.add.sprite(this.game.canvas.width - 4*20, this.game.canvas.height/2 + 4*10, 'atlas', 'zeno/flag.png');
    this.flag.setScale(4,4);

    let groundRect = new Phaser.Geom.Rectangle(0, this.game.canvas.height/2 + 4*26, this.game.canvas.width, 200);
    this.ground = this.add.graphics({ fillStyle: { color: 0x000000 } });
    this.ground.fillRectShape(groundRect);

    let dotRect = new Phaser.Geom.Rectangle(this.game.canvas.width/2, this.game.canvas.height/2 + 4*27+2, 4, 12);
    this.dot1 = this.add.graphics({ fillStyle: { color: 0xffffff } });
    this.dot1.fillRectShape(dotRect);

    let dot2Rect = new Phaser.Geom.Rectangle(this.game.canvas.width, this.game.canvas.height/2 + 4*27+2, 4, 12);
    this.dot2 = this.add.graphics({ fillStyle: { color: 0xffffff } });
    this.dot2.fillRectShape(dot2Rect);

    // Add the various animations
    this.createAnimation('idle',4,4,5,0);
    this.createAnimation('running',1,3,5,-1);
    this.createAnimation('victory',4,8,5,0);

    // Sisyphus starts off pushing by default
    this.zeno.anims.play('idle');

    // Add input tracking
    this.zenoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.flagKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    // Track how many input frames there are (for removing the instructions)
    this.zenoInputs = 0;
    this.flagInputs = 0;

    // Add instructions
    let zenoInstructionStyle = { fontFamily: 'Commodore', fontSize: '18px', fill: '#000', wordWrap: true, align: 'center' };
    let zenoInstructionString = "PLAYER 1\nRAPIDLY PRESS\nSPACE TO RUN";
    this.zenoInstructionsText = this.add.text(0.6*this.game.canvas.width/4,160,zenoInstructionString,zenoInstructionStyle);
    this.zenoInstructionsText.setOrigin(0.5);

    let flagInstructionStyle = { fontFamily: 'Commodore', fontSize: '18px', fill: '#000', wordWrap: true, align: 'center' };
    let flagInstructionString = "PLAYER 2\nRAPIDLY PRESS THE\nRIGHT ARROW\nTO MOVE THE FLAG";
    this.flagInstructionsText = this.add.text(3.2*this.game.canvas.width/4,100,flagInstructionString,flagInstructionStyle);
    this.flagInstructionsText.setOrigin(0.5);

    this.inputEnabled = true;

    setInterval(() => {
      if (!this.inputEnabled) {
        return;
      }

      if (this.zenoKeyCount > 1) {
        if (!this.zenoInputSuccess) this.zeno.anims.play('running');
        this.zenoInputSuccess = true;
        this.zenoInstructionsText.visible = false;
      }
      else {
        this.zenoInputSuccess = false;
        this.zeno.anims.play('idle');
      }

      if (this.flagKeyCount > 1) {
        this.flagInputSuccess = true;
        this.flagInstructionsText.visible = false;
      }
      else {
        this.flagInputSuccess = false;
      }

      this.flagKeyCount = 0;
      this.zenoKeyCount = 0;
    },500);
  },

  update: function (time,delta) {

    if (this.gameIsOver) return;

    this.handleInput();
    this.updateZeno();
    this.updateFlag();

    if (this.flag.x <= this.zeno.x + this.zeno.width/2) {
      this.gameIsOver = true;
      this.zeno.play('victory');
      this.inputEnabled = false;
      this.victorySFX.play();

      setTimeout(() => {
        this.gameOver();
      },1250);
    }
  },

  handleInput: function () {
    if (!this.inputEnabled) return;

    if (Phaser.Input.Keyboard.JustDown(this.flagKey)) {
      this.flagKeyCount++;
    }
    if (Phaser.Input.Keyboard.JustDown(this.zenoKey)) {
      this.zenoKeyCount++;
    }

    if (this.flagInputSuccess) {
      this.flag.x += this.FLAG_SPEED;
    }

    if (this.zenoInputSuccess) {
      this.zenoInputs++;
      if (this.zeno.x === this.HALF_WAY) {
        this.dot1.x -= this.ZENO_SPEED;
        this.dot2.x -= this.ZENO_SPEED;
        this.flag.x -= this.ZENO_SPEED;
      }
      else {
        this.zeno.x += this.ZENO_SPEED;
        if (this.zeno.x > this.HALF_WAY) {
          this.zeno.x = this.HALF_WAY;
        }
      }
    }
    else {
      this.zeno.anims.play('idle');
    }

    if (this.dot1.x < -this.game.canvas.width/2) {
      this.dot1.x += this.game.canvas.width;
    }
    if (this.dot2.x < -this.game.canvas.width) {
      this.dot2.x += this.game.canvas.width;
    }

    if (this.dot1.x > this.game.canvas.width/2) {
      this.dot1.x -= this.game.canvas.width;
    }
    if (this.dot2.x > this.game.canvas.width) {
      this.dot2.x -= this.game.canvas.width;
    }

    if (this.flagKeyCount > 10) {
      this.flagInstructionsText.visible = false;
    }

    if (this.zenoKeyCount > 10) {
      this.zenoInstructionsText.visible = false;
    }
  },

  updateZeno: function () {
    // this.zeno.x += this.ZENO_SPEED;

  },

  updateFlag: function () {
    if (this.flag.x >= this.game.canvas.width) {
      this.flagIndicatorText.visible = true;
      this.flagIndicatorText.text = `FLAG >`
    }
    else {
      this.flagIndicatorText.visible = false;
    }

  },

  gameOver: function () {
    this.gameIsOver = true;

    this.gameOverSFX.play();

    let screenRect = new Phaser.Geom.Rectangle(0,0, this.game.canvas.width, this.game.canvas.height);
    let gameOverBackground = this.add.graphics({ fillStyle: { color: '#000' } });
    gameOverBackground.fillRectShape(screenRect);
    let gameOverStyle = { fontFamily: 'Commodore', fontSize: '24px', fill: '#aaf', wordWrap: true, align: 'center' };
    let gameOverString = "ZENO FINISHED THE RACE!";
    let gameOverText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2,gameOverString,gameOverStyle);
    gameOverText.setOrigin(0.5);

    setTimeout(() => {
      this.scene.start('menu');
    },2000);
  },

  // createAnimation(name,start,end)
  //
  // Helper function to generate the frames and animation for Sisyphus between set limits
  createAnimation: function (name,start,end,framerate,repeat) {
    if (this.anims.get(name) !== undefined) return;

    let frames = this.anims.generateFrameNames('atlas', {
      start: start, end: end, zeroPad: 0,
      prefix: 'zeno/zeno/zeno_', suffix: '.png'
    });
    let config = {
      key: name,
      frames: frames,
      frameRate: framerate,
      repeat: repeat,
    };
    this.anims.create(config);
  }

});
