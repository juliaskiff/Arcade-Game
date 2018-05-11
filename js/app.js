// Grab the congratulation window
const modal = document.getElementById('modal-win');

// Enemy class: image, position and speed
const Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x <= 505) {
        this.x += this.speed * dt;
     } else {
        this.x = -100;
     };
     // if the player and the enemy collide:
    if(this.x < player.x + 50 && this.x > player.x - 50 && this.y < player.y + 50 && this.y > player.y - 50) {
        player.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class: image and initial position
const Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;
};
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player's position update
Player.prototype.update = function() {
    // If the player reaches the water
    if (this.y < 0 ) {
        modal.style.display = "block";
        this.reset();
    };
};

// Set player's movements
Player.prototype.handleInput = function (keyPress){
    modal.style.display = "none";
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

// Reset player's position
Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};

// Instantiate objects
// Enemies array
const allEnemies = [];
(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());

// Player object
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
