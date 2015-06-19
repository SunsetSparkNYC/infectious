var loadState = {

	preload: function () {		
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading...', { font: '20pt "Press Start 2P"', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.image('zombie', 'assets/zombie.png');
        game.load.image('bg0', 'assets/level1.jpg');
        game.load.image('bg1', 'assets/level2.jpg');
        game.load.image('bg2', 'assets/level3.jpg');
	},

	create: function() { 
		game.state.start('menu');
	}
};