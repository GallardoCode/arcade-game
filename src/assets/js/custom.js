let levelSpan = document.getElementById('level_span');

/**
 *
 *
 * @class Map
 */
class Map {
    //Map will contain info about the grid layout to be made use of

    /**
     *Creates an instance of Map.
     * @param {number} [rows=1] How many rows the map will have.
     * @param {number} [cols=1] How many columns the map will have.
     * @param {number} [initx=0] How many pixels the avatars will be shifted horizontally to match the first tile.
     * @param {number} [inity=0] How many pixels the avatars will be shifted vertically to match the first tile.
     * @param {number} [xSpace=0] How many pixels the avatars have to shift horizontally to change from tile to tile.
     * @param {number} [ySpace=0] How many pixels the avatars have to shift vertically to change from tile to tile.
     * @param {number} [enemyMinY=1] The start of rows an enemy can occupy, 1 being the first row.
     * @param {number} [enemyMaxY=1] The end of rows an enemy can occupy, must be equal or larger than enemyMinY.  
     * @memberof Map
     */
    constructor(cols = 1, rows = 1, initx = 0, inity = 0, xSpace = 0, ySpace = 0, enemyMinY = 1, enemyMaxY = 1){
        this.rows = rows;
        this.cols = cols;
        this.initx = initx;
        this.inity = inity;
        this.xSpace = xSpace;
        this.ySpace = ySpace;
        this.enemyMinY = enemyMinY;
        this.enemyMaxY = enemyMaxY;
    }

    getCanvasXSize() {
        return (this.cols * this.xSpace);
    }

    getCanvasYSize() {
        return (this.rows * this.ySpace);
    }

    getRandomEnemyRow() {
        return Math.floor(Math.random() * (this.enemyMaxY - this.enemyMinY)) + this.enemyMinY;
    }

    getRandomCol() {
        return Math.floor(Math.random() * (this.cols - 1)) + 1
    }

    getRandomColPixel() {
        let randomNum = this.getRandomCol();
        console.log(randomNum);
        return (randomNum * this.xSpace) + this.initx;
    }

    getRandomEnemyRowPixel() {
        let randomNum = this.getRandomEnemyRow();
        console.log(randomNum);
        return (randomNum * this.ySpace) + this.inity;
    }
}

// Enemies our player must avoid
class Enemy{
    constructor(x = 0, y = 0) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = "assets/img/enemy-bug.png";

        // X Y coordinates of the the enemy sprite
        this.x = x;
        this.y = y;
        this.xOffset = 3;
        this.speed = this.setSpeed();
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        //check if enemy's position is oputside the canvas
        if (this.checkCollision()){
            player.reset();
        }
        if (map.getCanvasXSize()) {
            if (this.x > map.getCanvasXSize()){
                this.reset();
                console.log(this.x);
                console.log(this.y);
            }
        } else if (this.x > 505) {
            this.reset();
        }
    };

    setSpeed(){
        return 30;
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    checkCollision() {
        if ((this.x + map.xSpace - this.xOffset) > (player.x + player.xOffset) && (this.x + this.xOffset) < (player.x + map.xSpace - player.xOffset) && this.y == player.y){
            return true;
        } else {
            return false;
        }
    }

    reset(){
        if(map instanceof Map){
            this.x = map.xSpace * -2;
            this.y = map.getRandomEnemyRowPixel();
        }else {
            this.x = -202;
            this.y = -21;
        }
        this.speed = this.setSpeed();
    };
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(startX = 202, startY = 394) {
        this.sprite = "assets/img/char-boy.png";
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.xOffset = 17;
        this.level = 1;
        this.init();
    }

    init(){
        this.updateLevel();
    }

    get level(){
        return this._level;
    }

    set level(newLevel){
        if(!isNaN(parseInt(newLevel))) {
            this._level = newLevel;
        }
    }

    updateLevel(){
        if(levelSpan){
            levelSpan.textContent = this.level;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        if(this.y < (map.ySpace + map.inity)) {
            this.levelUp();
            this.updateLevel();
            console.log("reached");
            this.reset();
        }
    }

    levelUp() {
        this.level += 1;
        console.log(this.level);
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    handleInput(keycode){
        switch (keycode) {
        case "left": if (this.x >= (map.xSpace + map.initx)) {
            this.x -= map.xSpace;
        }
            break;
        case "up": if (this.y >= (map.ySpace + map.inity)) {
            this.y -= map.ySpace;
        }
            break;
        case "right": if (this.x < (map.getCanvasXSize() - map.xSpace + map.initx)) {
            this.x += map.xSpace;
        }
            break;
        case "down": if (this.y < (map.getCanvasYSize() - map.ySpace + map.inity )) {
            this.y +=map.ySpace;
        }
            break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let map = new Map(5, 6, 0, -21, 101, 83, 2, 4);
console.log(map.getCanvasXSize());
let allEnemies = [new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel()), new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel()), new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel())];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

export {Enemy, Player, allEnemies, player};