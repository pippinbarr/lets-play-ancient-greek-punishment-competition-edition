let Sisyphus = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Sisyphus () {
    Phaser.Scene.call(this, { key: 'sisyphus' });

    this.MAX_TIME_PER_INPUT = 100;
    this.MAX_FRAME_TIME = 800;
    this.MIN_FRAME_TIME = 100;
    // Used to track rate of keypresses
    this.timeSinceLastRockInput = 100000;
    this.timeSinceLastSisyphusInput = 100000;
    // Force exerted between rock and Sisypus
    // -1 = no rock force (Sisyphus pushes top speed)
    // 0 = equillibrium and no movement
    // +1 = total rock force (Sisyphus retreats)
    this.rockForce = 0;
    // Track their use of playing with the keys so we know they get it
    this.MIN_KEY_COUNT = 10;
    this.rockKeyCount = 0;
    this.sisyphusKeyCount = 0;
  },

  create: function () {
    this.cameras.main.setBackgroundColor('#aaf');

    this.gameIsOver = false;

    // Sound
    this.victorySFX = this.sound.add('victory');
    this.victorySFX.volume = 0.2;
    this.gameOverSFX = this.sound.add('swoopdown');
    this.gameOverSFX.volume = 0.2;

    this.hill = this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2,'atlas','sisyphus/hill.png');
    this.hill.setScale(4,4);

    // Create the sprite that represents the entire minigame, scale up
    this.sisyphus = this.add.sprite(this.game.canvas.width/2 + 4*20, this.game.canvas.height/2 - 4*15, 'atlas', 'sisyphus/sisyphus/sisyphus_1.png');
    this.sisyphus.setScale(4,4);

    // Add the various animations
    this.createAnimation('start',1,52);
    this.createAnimation('reverseStart',52,1);
    this.createAnimation('uphill',51,95);
    this.createAnimation('downhill',95,51);

    // Sisyphus starts off pushing by default
    this.sisyphus.anims.play('uphill');
    this.sisyphus.anims.pause();

    this.defaultFrameTime = this.sisyphus.anims.currentAnim.msPerFrame;

    // Add input tracking
    this.sisyphusKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.rockKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    // Add instructions
    let sisyphusInstructionStyle = { fontFamily: 'Commodore', fontSize: '18px', fill: '#000', wordWrap: true, align: 'center' };
    let sisyphusInstructionString = "PLAYER 1\nRAPIDLY PRESS\nRIGHT ARROW\nTO PUSH THE\nROCK UPHILL";
    this.sisyphusInstructionsText = this.add.text(1.5*this.game.canvas.width/5,150,sisyphusInstructionString,sisyphusInstructionStyle);
    this.sisyphusInstructionsText.setOrigin(0.5);

    let rockInstructionStyle = { fontFamily: 'Commodore', fontSize: '18px', fill: '#000', wordWrap: true, align: 'center' };
    let rockInstructionString = "PLAYER 2\nRAPIDLY PRESS\nLEFT ARROW\nTO PUSH\nSISYPHUS\nDOWNHILL";
    this.rockInstructionsText = this.add.text(2.8*this.game.canvas.width/5,150,rockInstructionString,rockInstructionStyle);
    this.rockInstructionsText.setOrigin(0.5);
  },

  update: function (time,delta) {

    if (this.gameIsOver) return;

    this.timeSinceLastRockInput += delta;
    this.timeSinceLastSisyphusInput += delta;

    let anims = this.sisyphus.anims;

    let index = anims.currentFrame.index;

    if (this.timeSinceLastSisyphusInput < this.MAX_TIME_PER_INPUT) {
      this.rockForce = Math.max(this.rockForce - 0.05,-1);
    }
    else {
      this.rockForce = Math.min(this.rockForce + 0.05,1);
    }

    if (this.timeSinceLastRockInput < this.MAX_TIME_PER_INPUT) {
      this.rockForce = Math.min(this.rockForce + 0.05,1);
    }

    switch (anims.currentAnim.key) {
      case 'start':
      if (anims.currentFrame.index === anims.currentAnim.frames.length - 1) {
        anims.play('uphill');
      }

      if (this.rockForce > 1) {
        anims.play('start');
        anims.play('start',false,anims.currentAnim.frames.length - index);
      }
      else if (this.rockForce < 0) {
        anims.play('start');
        anims.play('start',false,anims.currentAnim.frames.length - index);
      }
      break;

      case 'uphill':
      if (anims.currentFrame.index === anims.currentAnim.frames.length) {
        this.gameIsOver = true;
        this.victorySFX.play();
        setTimeout(() => {
          this.gameOver();
        },1000)
      }
      else if (this.rockForce > 0) {
        anims.play('downhill');
        anims.play('downhill',false,anims.currentAnim.frames.length - index);
      }
      break;

      case 'downhill':
      if (this.rockForce < 0) {
        anims.play('uphill');
        anims.play('uphill',false,anims.currentAnim.frames.length - index);
      }
      break;
    }

    anims.msPerFrame = (1 - Math.abs(this.rockForce)) * this.MAX_FRAME_TIME + this.MIN_FRAME_TIME;

    this.handleInput();
  },

  handleInput: function () {
    if (Phaser.Input.Keyboard.JustDown(this.rockKey)) {
      this.timeSinceLastRockInput = 0;
      if (this.rockInstructionsText.visible) {
        this.rockKeyCount++;
        if (this.rockKeyCount >= this.MIN_KEY_COUNT) {
          this.rockInstructionsText.visible = false;
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.sisyphusKey)) {
      this.timeSinceLastSisyphusInput = 0;
      if (this.sisyphusInstructionsText.visible) {
        this.sisyphusKeyCount++;
        if (this.sisyphusKeyCount >= this.MIN_KEY_COUNT) {
          this.sisyphusInstructionsText.visible = false;
        }
      }
    }
  },

  gameOver: function () {
    this.gameIsOver = true;

    this.gameOverSFX.play();

    let screenRect = new Phaser.Geom.Rectangle(0,0, this.game.canvas.width, this.game.canvas.height);
    let gameOverBackground = this.add.graphics({ fillStyle: { color: '#000' } });
    gameOverBackground.fillRectShape(screenRect);
    let gameOverStyle = { fontFamily: 'Commodore', fontSize: '24px', fill: '#aaf', wordWrap: true, align: 'center' };
    let gameOverString = "SISYPHUS REACHED THE TOP OF THE HILL!";
    let gameOverText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2,gameOverString,gameOverStyle);
    gameOverText.setOrigin(0.5);

    setTimeout(() => {
      this.scene.start('menu');
    },4000);
  },

  // createAnimation(name,start,end)
  //
  // Helper function to generate the frames and animation for Sisyphus between set limits
  createAnimation: function (name,start,end) {
    if (this.anims.get(name) !== undefined) return;

    let frames = this.anims.generateFrameNames('atlas', {
      start: start, end: end, zeroPad: 0,
      prefix: 'sisyphus/sisyphus/sisyphus_', suffix: '.png'
    });
    let config = {
      key: name,
      frames: frames,
      frameRate: 10,
      repeat: 0,
    };
    this.anims.create(config);
  }

});
