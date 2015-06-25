var playState = {

	create: function() {
        
		this.scoreLabel = game.add.text(10, 40, 'Score ' + game.global.score, { font: '20pt "Press Start 2P"', fill: '#000aff' });
        this.scoreLabel.fixedToCamera = true;
		this.scoreLabel.anchor.setTo(0, 0.5);
        this.scoreLabel.setShadow(0, 3, 'rgba(0,0,0,0.3)', 5);

        this.timeLeft = 60;
		// How to start the game
		var timeLabel = game.add.text(game.camera.width / 2, 40, 'Time', { font: '20pt "Press Start 2P"', fill: '#000aff' });
        timeLabel.fixedToCamera = true;
		timeLabel.anchor.setTo(0.5, 0.5);
        timeLabel.setShadow(0, 3, 'rgba(0,0,0,0.3)', 5);
        
        this.timeNumLabel = game.add.text(game.camera.width / 2, 90, this.timeLeft, { font: '20pt "Press Start 2P"', fill: '#000aff' });
        this.timeNumLabel.fixedToCamera = true;
		this.timeNumLabel.anchor.setTo(0.5, 0.5);
        this.timeNumLabel.setShadow(0, 3, 'rgba(0,0,0,0.3)', 5);
        
        this.zombies = game.add.group();
        this.zombies.createMultiple(10, 'zombie');
        game.time.events.loop(750, this.addZombie, this);
        
        // Controls
        this.leftArrow = game.add.text(0, game.world.centerY, '<', { font: '60pt "Press Start 2P"', fill: '#000' });
        this.leftArrow.fixedToCamera = true;
        this.rightArrow = game.add.text(game.camera.width, game.world.centerY, '>', { font: '60pt "Press Start 2P"', fill: '#000' });
        this.rightArrow.fixedToCamera = true;
        
        
        this.leftArrow.inputEnabled = true;
        this.rightArrow.inputEnabled = true;
        this.leftArrow.anchor.setTo(0, 0.5);
        this.rightArrow.anchor.setTo(1, 0.5);
        
        this.leftArrow.events.onInputDown.add(function () {this.movingLeft=true;}, this);
        this.rightArrow.events.onInputDown.add(function () {this.movingRight=true;}, this);
        this.leftArrow.events.onInputUp.add(function () {this.movingLeft=false;}, this);
        this.rightArrow.events.onInputUp.add(function () {this.movingRight=false;}, this);
        
        game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        game.time.events.loop(Phaser.Timer.SECOND, this.updateZombies, this);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        game.world.resize(4096, game.world.height);
        game.add.sprite(0, 0, 'bg' + Math.floor(Math.random() * 3)).sendToBack();
        
	},

	update: function() {
        if (this.timeLeft  <= 0) {
            game.state.start('gameover');
        }
        
        if (this.movingLeft || this.cursors.left.isDown) {
            game.camera.x -= 30;
        } else if (this.movingRight|| this.cursors.right.isDown) {
            game.camera.x += 30;
        }
	},
    
    updateTimer: function () {
        this.timeLeft = this.timeLeft - 1;
        this.timeNumLabel.text = this.timeLeft;
    },
    
    updateZombies: function () {
        this.zombies.forEachAlive(function (zombie) {
            var scaleFactor = Math.random() * 0.3 + 1;
            var newScale = zombie.scale.x * scaleFactor;
            if (newScale > 1.6) {
                newScale = 1.6;
                this.takeHit();
                zombie.kill();
            }
            zombie.scale.set(newScale, newScale);
        }, this);
    },
    
    attackZombie: function (zombie) {
        zombie.hits += 1;
        if (zombie.hits >= 3) {
            game.global.score += 500;
            zombie.kill();
            
            this.timeLeft = this.timeLeft + 1;
            this.timeNumLabel.text = this.timeLeft;
        } else {
            game.global.score += 250;
        }
        this.scoreLabel.text = 'Score ' + game.global.score;
    },
    
    takeHit: function () {
        this.timeLeft = this.timeLeft - 6;
        this.timeNumLabel.text = this.timeLeft;
    },
    
    addZombie: function() {
        var zombie = this.zombies.getFirstDead();
        if (!zombie) { 
            return;
        }
        zombie.anchor.setTo(0.5, 1);
        zombie.hits = 0;
        zombie.reset(game.world.randomX, game.camera.height);
        zombie.scale.set(0.4, 0.4);
        
        zombie.inputEnabled = true;
        zombie.events.onInputUp.add(this.attackZombie, this);
    },
};