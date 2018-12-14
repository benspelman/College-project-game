let gameScene = new Phaser.Scene('Game');

gameScene.init = function () {
    this.playerSpeed = 3;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
    this.enemySpeed = 0.009;
    this.enemyStill = 0;
}

gameScene.preload = function () {

    this.load.image('background', 'assets/background.png');
    this.load.image('alien', 'assets/alien2.png');
    this.load.image('van1', 'assets/van1.png');

    let leftKey;
    let rightKey;
    let cKey;

    this.load.audio('gameAudio', ['assets/gameAudio.mp3']);
    var gameAudio;
    var youWin;

};


gameScene.create = function () {

    let bgPosition = -420;

    this.bg = this.add.sprite(0, 0, 'background');
    this.van1 = this.add.sprite(0, 0, 'van1');
    this.van2 = this.add.sprite(0, 0, 'van1');
    this.van3 = this.add.sprite(0, 0, 'van1');
    this.van4 = this.add.sprite(0, 0, 'van1');
    this.player = this.add.sprite(0, 0, 'alien');

    this.bg.setPosition(640 / 2, bgPosition);
    this.player.setPosition(640 / 2, 320);
    this.van1.setPosition(640 / 2, -0);
    this.van2.setPosition(480, -220);
    this.van2.flipX = true;
    this.van4.flipX = true;
    this.van3.setPosition(200, -400);
    this.van4.setPosition(455, -600);

    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    gameAudio = this.sound.add('gameAudio');
    gameAudio.play();

    youWin = this.add.text(128, -400, 'You win!', {
        font: '100px Gabriella',
        fill: '#ffffff'
    })
    youWin.setVisible = true;

};

gameScene.update = function () {

    if (rightKey.isDown) {
        this.player.x += this.playerSpeed;
        this.player.flipX = false;
    }

    if (leftKey.isDown) {
        this.player.x -= this.playerSpeed;
        this.player.flipX = true;
    }

    /* mutes the audio */
    if (cKey.isDown) {
        game.sound.mute = true;
    }

    /* un-mutes the audio */
    if (mKey.isDown) {
        game.sound.mute = false;
    }

    /* this loop makes the background move from the bottom of the image stop at the top */
    for (let i = 100; i > 0; i--) {
        this.bg.y += this.enemySpeed;
        this.van1.y += this.enemySpeed;
        this.van2.y += this.enemySpeed;
        this.van3.y += this.enemySpeed;
        this.van4.y += this.enemySpeed;
        if (this.bg.y > 750) {
            this.bg = 540;
            this.enemySpeed = 0;
        }
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.van1.getBounds()) || Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.van2.getBounds()) ||
        Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.van3.getBounds()) ||
        Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.van4.getBounds())) {
        this.gameOver();
    }
}

gameScene.gameOver = function () {

    this.cameras.main.shake(500);

    this.time.delayedCall(500, function () {
        this.scene.restart();
    }, [], this);

    gameAudio.stop();
}

let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 640,
    height: 360,
    scene: gameScene,
};



let game = new Phaser.Game(config);
