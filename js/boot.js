var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() { 
		// Set a background color and the physic system
		game.stage.backgroundColor = '#9d0101';
		game.physics.startSystem(Phaser.Physics.ARCADE);

        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            document.body.style.backgroundColor = '#9d0101';
            game.scale.minWidth = 320;
            game.scale.minHeight = 180;
            game.scale.maxWidth = 1280;
            game.scale.maxHeight = 720;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.setScreenSize(true);
        }
        
		game.state.start('load');
	}
};