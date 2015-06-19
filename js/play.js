var playState = {

	create: function() {
        
		this.scoreLabel = game.add.text(10, 40, 'Score ' + game.global.score, { font: '38pt Arial', fill: '#000aff' });
        this.scoreLabel.fixedToCamera = true;
		this.scoreLabel.anchor.setTo(0, 0.5);

        this.timeLeft = 100;
		// How to start the game
		var timeLabel = game.add.text(game.world.centerX, 40, 'Time', { font: '38pt Arial', fill: '#000aff' });
        timeLabel.fixedToCamera = true;;
		timeLabel.anchor.setTo(0.5, 0.5);	
        
        this.timeNumLabel = game.add.text(game.world.centerX, 90, this.timeLeft, { font: '38pt Arial', fill: '#000aff' });
        this.timeNumLabel.fixedToCamera = true;
		this.timeNumLabel.anchor.setTo(0.5, 0.5);
        
        this.zombies = game.add.group();
        this.zombies.createMultiple(10, 'zombie');
        game.time.events.loop(750, this.addZombie, this);
        
        game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        game.time.events.loop(Phaser.Timer.SECOND, this.updateZombies, this);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        game.world.resize(5067, game.world.height);
        game.add.sprite(0, 0, 'bg' + Math.floor(Math.random() * 3)).sendToBack();
        
	},

	update: function() {
        if (this.timeLeft  <= 0) {
            game.state.start('gameover');
        }

        if (this.cursors.left.isDown)
        {
            game.camera.x -= 50;
        }
        else if (this.cursors.right.isDown)
        {
            game.camera.x += 50;
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
        } else {
            game.global.score += 100;
        }
        this.scoreLabel.text = 'Score ' + game.global.score;
    },
    
    takeHit: function () {
        this.timeLeft = this.timeLeft - 3;
        this.timeNumLabel.text = this.timeLeft;
    },
    
    addZombie: function() {
        var zombie = this.zombies.getFirstDead();
        if (!zombie) { 
            return;
        }
        zombie.anchor.setTo(0.5, 1);
        zombie.hits = 0;
        zombie.reset(game.world.randomX, game.world.height);
        zombie.scale.set(0.4, 0.4);
        
        zombie.inputEnabled = true;
        zombie.events.onInputUp.add(this.attackZombie, this);
    },
};