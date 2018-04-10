var count = 0;
// Enemy class
const Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.speed * dt;
     } else {
        this.x = -100;
     };
    if(this.x < player.x + 50 && this.x > player.x - 50 && this.y < player.y + 50 && this.y > player.y - 50) {
        count = 0;
        player.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class

const Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.y < 0 ) {
        this.reset();
        count++;
    };
};

Player.prototype.handleInput = function (keyPress){
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (keyPress == 'right' && this.x < 400) {
        this.x += 100;
    }
    if (keyPress == 'up') {
        this.y -= 90;
    }
    if (keyPress == 'down' && this.y < 400) {
        this.y += 90;
    };
}; 

Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());

// Place the player object in a variable called player
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
