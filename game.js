window.onload = function() {
  var velocityY = 2;
  var gameWidth = 1000, gameHeight = 700;
  var game_assets = {
              "sprites": {
                  "images/hero_spritesheet.png": {
                  tile: 80,
                  tileh: 94,
                  map: {
                      hero_idle: [0, 0],
                      hero_walking: [1, 1],
                      hero_jumping: [2, 3],
                      hero_sitting: [0, 4]
                  }
                  }
              }
          };
  Crafty.init(gameWidth, gameHeight, document.getElementById('game'));
  Crafty.load(game_assets);

  function createHero() {
    var hero = Crafty.e('2D, Canvas, hero_idle, Gravity, SpriteAnimation, Twoway, Collision')
                .attr({ x: 0, y: 300 })
                .twoway(200)
                .gravity('Floor');
            hero.reel("walking", 1000, [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
                [5, 1]
            ]);
            hero.reel('jumping',1000, [
                [0, 3],
                [1, 3],
                [2, 3],
                [1, 3],
                [0, 3]
            ]);
            hero.reel('sitting', 1000, [
                [0, 4],
                [1,4]
            ]);
            hero.bind('KeyDown', function(evt) {
                if (evt.key == Crafty.keys.UP_ARROW) {
                    hero.animate('jumping', 1);
                }
                if (evt.key == Crafty.keys.DOWN_ARROW) {
                    hero.animate('sitting', 1);
                }
                if (evt.key == Crafty.keys.RIGHT_ARROW) {
                    hero.animate('walking', 1);
                    hero.unflip('X');
                }
                if (evt.key == Crafty.keys.LEFT_ARROW) {
                    hero.animate('walking', 1)
                    hero.flip('X');
                }
            });

  }

  function createBaseFloor(){
  	Crafty.e('Floor, 2D, Color, Canvas, Motion, Image').image('images/brickBlock.png', 'repeat')
	  .attr({x: 0, y: 500, w: 1500, h: 100})
	  .bind('EnterFrame', function(){
	  	this.x -= velocityY;
	  	if(this.x < -71){
	  		this.destroy();
	  		createBaseFloor();
	  	}
	  	});

  }

  Crafty.scene('loadGame', function(){
  	var i = 0;
  	for(i = 1; i<10; i++){
  		Crafty.e('Floor, 2D, Color, Canvas, Motion, Image').image('images/brickBlock.png', 'repeat')
	   .attr({x: 0, y: 500, w: 1200, h: 100})
	   .bind('EnterFrame', function(){
	  	this.x -= velocityY;
	  	if(this.x < -71){
	  		this.destroy();
	  		createBaseFloor();
	  	}
	  	});
      const distance = i*400;
      Crafty.e('2D, Canvas, Color, Obstacle')
                .attr({x: distance, y: 400, w: 80, h:100})
                .color('green')
                .bind('EnterFrame', function(){
            	  	this.x -= velocityY;
            	  	if(this.x < -71){
            	  		this.destroy();
            	  	}
            	  	});
  	}
    createHero();
  });

  Crafty.scene('loadGame');
};
