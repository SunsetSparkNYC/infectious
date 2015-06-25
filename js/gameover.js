var gameoverState = {

	create: function() {
//        game.world.resize(1280, 720);
        var gameOverPhrases = [
                'YOU FAILED!!!',
                'NOT COOL DUDE!!!',
                'EPIC FAIL!!!!' ,
                'ZOMBIES WIN AND YOU DIED' ,
                'ZOMBIES ATE YOUR BRAIN' ,
                '"YOU LOSE I WIN" (it was the zombie that said it)',
        ];
        
        var randIdx = Math.floor(Math.random() * gameOverPhrases.length)
        
		// Name of the game
		var nameLabel = game.add.text(game.camera.width / 2, 160, 'Game Over', { font: '48pt "Press Start 2P"', fill: '#ffffff', wordWrap: true, wordWrapWidth: game.camera.width-80 });
		nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.fixedToCamera = true;

		// How to start the game
		var tauntLabel = game.add.text(game.camera.width / 2, game.world.height-240, gameOverPhrases[randIdx], { font: '25pt "Press Start 2P"', fill: '#ffffff', wordWrap: true, wordWrapWidth: game.world.width-100 });
		tauntLabel.anchor.setTo(0.5, 0.5);	
        tauntLabel.fixedToCamera = true;
		game.add.tween(tauntLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 
        
        // Score
		var endScoreLabel = game.add.text(game.camera.width / 2, game.world.centerY-50, game.global.score + ' Points', { font: '35pt "Press Start 2P"', fill: '#ffffff' });
        endScoreLabel.anchor.setTo(0.5, 0.5);
        endScoreLabel.fixedToCamera = true;
        
        if (game.global.score >= game.global.highScore) {
            game.global.highScore = game.global.score;
        }

        game.input.onDown.addOnce(this.start, this);
	},

	start: function() {
		game.state.start('menu');	
    }
};