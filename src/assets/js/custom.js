// Enemies our player must avoid
class Enemy{
    constructor(x = 0, y = 0) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'assets/img/enemy-bug.png';

    // X Y coordinates of the the enemy sprite
    this.x = x;
    this.y = y;
    this.speed = 20;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = this.x < 500 ? this.x + (this.speed * dt) : 0;
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

/**
 *
 *
 * @class Map
 */
class Map {
    //Map will contain info about the rid layout to be made use of

    /**
     *Creates an instance of Map.
     * @param {number} [rows=1] How many rows the map will have.
     * @param {number} [cols=1] How many columns the map will have.
     * @param {number} [initx=0] How many pixels the avatars will be shifted horizontally to match the first tile.
     * @param {number} [inity=0] How many pixels the avatars will be shifted vertically to match the first tile.
     * @param {number} [xSpace=0] How many pixels the avatars have to shift horizontally to change from tile to tile.
     * @param {number} [ySpace=0] How many pixels the avatars have to shift vertically to change from tile to tile.
     * @param {number} [enemyMinY=1] The start of rows an enemy can occupy, 1 being the first row.
     * @param {number} [enemyMaxY=1] The end of rows an enemy can occupy, must be larger than enemyMinY.  
     * @memberof Map
     */
    constructor(rows = 1, cols = 1, initx = 0, inity = 0, xSpace = 0, ySpace = 0, enemyMinY = 1, enemyMaxY = 1){
        this.rows = rows;
        this.cols = cols;
        this.initx = initx;
        this.inity = inity;
        this.xSpace = xSpace;
        this.ySpace = ySpace;
        this.enemyMinY = enemyMinY;
        this.enemyMaxY = enemyMaxY;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,-22), new Enemy(202,61), new Enemy(101,144)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});

export {Enemy, allEnemies};