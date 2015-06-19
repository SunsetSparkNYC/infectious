var gameoverState = {

	create: function() {
        game.world.resize(800, 720);
        var gameOverPhrases = [
                'YOU FAILED!!!',
                'NOT COOL DUDE!!!',
                'EPIC FAIL!!!!' ,
                'ZOMBIES WIN AND YOU DIED' ,
                'ZOMBIES ATE YOUR BRAIN' ,
        ];
        
        var randIdx = Math.floor(Math.random() * gameOverPhrases.length)
        
		// Name of the game
		var nameLabel = game.add.text(game.world.centerX, 160, 'Game Over', { font: '48pt "Press Start 2P"', fill: '#ffffff', wordWrap: true, wordWrapWidth: game.world.width-80 });
		nameLabel.anchor.setTo(0.5, 0.5);

		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height-240, gameOverPhrases[randIdx], { font: '25pt "Press Start 2P"', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);	
		game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 

		// Add a mute button
		this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
		this.muteButton.input.useHandCursor = true;
		if (game.sound.mute) {
			this.muteButton.frame = 1;
		}

        game.input.onDown.addOnce(this.start, this);
	},

	toggleSound: function() {
		game.sound.mute = ! game.sound.mute;
		this.muteButton.frame = game.sound.mute ? 1 : 0;	
	},

	start: function() {
		game.state.start('menu');	
    }
};