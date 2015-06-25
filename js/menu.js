var menuState = {

	create: function() { 
        game.global.score = 0;
        
		// Name of the game
		var nameLabel = game.add.text(game.camera.width / 2, 160, 'Infectious', { font: '50pt "Press Start 2P"', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.fixedToCamera = true;

		// How to start the game
		var startLabel = game.add.text(game.camera.width / 2, game.world.height-240, 'Click to Play!', { font: '25pt "Press Start 2P"', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);	
        startLabel.fixedToCamera = true;
		game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 

        // High Score
		var endScoreLabel = game.add.text(game.camera.width / 2, game.world.centerY-50, 'High score ' + game.global.highScore, { font: '35pt "Press Start 2P"', fill: '#ffffff' });
        endScoreLabel.anchor.setTo(0.5, 0.5);
        endScoreLabel.fixedToCamera = true;
        
        game.input.onDown.addOnce(this.start, this);
	},

	start: function() {
		game.state.start('play');	
	}
};