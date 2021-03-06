let levelSpan = document.getElementById("level_span");
let livesSpan = document.getElementById("lives_span");
let gameoverpanel = document.querySelector(".gameover");
let replay = document.querySelector(".replay");
let map;
let allEnemies;
let player;
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

    /**
     *
     *
     * @returns {number} Horizontal map size
     * @memberof Map
     */
    getCanvasXSize() {
        return (this.cols * this.xSpace);
    }

    /**
     *
     *
     * @returns {number} Vertical map size
     * @memberof Map
     */
    getCanvasYSize() {
        return (this.rows * this.ySpace);
    }

    /**
     *
     *
     * @returns {number} Random enemy row between the min and max row
     * @memberof Map
     */
    getRandomEnemyRow() {
        return Math.floor(Math.random() * (this.enemyMaxY - (this.enemyMinY - 1))+(this.enemyMinY - 1));
    }

    /**
     *
     *
     * @returns {number} Random column number in the map
     * @memberof Map
     */
    getRandomCol() {
        return Math.floor(Math.random() * (this.cols - 1)) + 1;
    }

    /**
     *The horizonal pixel count of a random column
     *
     * @returns {number} Pixel number in the x
     * @memberof Map
     */
    getRandomColPixel() {
        let randomNum = this.getRandomCol();
        console.log(randomNum);
        return (randomNum * this.xSpace) + this.initx;
    }

    /**
     *The vertical pixel count of a random row
     *
     * @returns {number} Pixel number in the y
     * @memberof Map
     */
    getRandomEnemyRowPixel() {
        let randomNum = this.getRandomEnemyRow();
        console.log(randomNum);
        return (randomNum * this.ySpace) + this.inity;
    }
}

// Enemies our player must avoid
class Enemy{
    /**
     *Creates an instance of Enemy.
     * @param {number} [x=0] Initial x coordinate
     * @param {number} [y=0] Initial y coordinate
     * @memberof Enemy
     */
    constructor(x = 0, y = 0) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = "assets/img/enemy-bug.png";

        // X Y coordinates of the the enemy sprite
        this.x = x;
        this.y = y;
        this.xOffset = 4;
        this.speed = this.setSpeed(player);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt, player, map) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        //check if enemy's position is oputside the canvas
        if (this.checkCollision(map, player)){
            player.reset();
            player.lives -= 1;
            player.updateLives();
        }
        if (map.getCanvasXSize()) {
            if (this.x > map.getCanvasXSize()){
                this.reset(map);
                console.log(this.x);
                console.log(this.y);
            }
        } else if (this.x > 505) {
            this.reset(map);
        }
    };

    /**
     *Speed of enemy according to player level
     *
     * @returns {number} Speed of enemy
     * @memberof Enemy
     */
    setSpeed(player){
        if(player){
            if(player.level <= 5){
                return (Math.random() * (100-40)) + 40;
            }else if (player.level > 5 && player.level <= 10){
                return (Math.random() * (120-60)) + 60;
            }else if (player.level > 10 && player.level <= 15){
                return (Math.random() * (140-80)) + 80;
            } else {
                return (Math.random() * (160-100)) + 100;
            }
        } else {
            return (Math.random() * (100-40)) + 40;
        }
    };

    // Draw the enemy on the screen, required method for game
    /**
     *Renders the enemy on canvas
     *
     * @memberof Enemy
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /**
     *Checks in enemy has colided with a player taking into account the offset
     *of the player and enemy avatar for more accurate collisions
     *
     * @returns {boolean} True if hit, Flase if not
     * @memberof Enemy
     */
    checkCollision(map, player) {
        if ((this.x + map.xSpace - this.xOffset) > (player.x + player.xOffset) && (this.x + this.xOffset) < (player.x + map.xSpace - player.xOffset) && this.y == player.y){
            return true;
        } else {
            return false;
        }
    }

    /**
     *Places enemy at starting position when it goes off map
     *
     * @memberof Enemy
     */
    reset(map){
        if(map instanceof Map){
            this.x = -map.xSpace;
            this.y = map.getRandomEnemyRowPixel();
        }else {
            this.x = -202;
            this.y = -21;
        } 
        this.speed = this.setSpeed(player);  
    };
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    /**
     *Creates an instance of Player.
     * @param {number} [startX=202] Starting x coordinate
     * @param {number} [startY=394] Starting y coordinate
     * @memberof Player
     */
    constructor(startX = 202, startY = 394) {
        this.sprite = "assets/img/char-boy.png";
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.xOffset = 18;
        this.level = 1;
        this.lives = 3;
        this.init();
    }

    /**
     *Displays the player's lives and level on the DOM
     *
     * @memberof Player
     */
    init(){
        this.updateLevel();
        this.updateLives();
    }

    /**
     *Returns player lives
     *
     * @memberof Player
     */
    get lives(){
        return this._lives;
    }
    /**
     *Sets player lives in the argument can be parsed as an integer
     *
     * @memberof Player
     */
    set lives(newLives){
        if(!isNaN(parseInt(newLives))) {
            this._lives = newLives;
        }
    }

    /**
     *Checks if player still has lives
     *
     * @returns {boolean} True if alive, Flase if dead
     * @memberof Player
     */
    isAlive() {
        return this.lives<1?false:true;
    }

    /**
     *Displays amount of lives on the DOM
     *
     * @memberof Player
     */
    updateLives(){
        if(livesSpan){
            livesSpan.textContent = this.lives;
        }
    }

    /**
     *Gets player level
     *
     * @memberof Player
     */
    get level(){
        return this._level;
    }

    /**
     *Sets player level if the arguments can be parsed as an integer
     *
     * @memberof Player
     */
    set level(newLevel){
        if(!isNaN(parseInt(newLevel))) {
            this._level = newLevel;
        }
    }

    /**
     *Displays player level on the DOM
     *
     * @memberof Player
     */
    updateLevel(){
        if(levelSpan){
            levelSpan.textContent = this.level;
        }
    }

    /**
     *Renders the player on the canvas
     *
     * @memberof Player
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     *Updates player conditions
     *
     * @memberof Player
     */
    update(map) {
        if(this.y < (map.ySpace + map.inity)) {
            this.levelUp();
            this.updateLevel();
            console.log("reached");
            this.reset(map);
            increaseEnemies(this, map);
        }
    }

    /**
     *Increases player's level by one
     *
     * @memberof Player
     */
    levelUp() {
        this.level += 1;
        console.log(this.level);
    }

    /**
     *Sets player to the starting position
     *
     * @memberof Player
     */
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    /**
     *Handles specific inputs we are looking out for like play movement
     *
     * @param {*} keycode
     * @memberof Player
     */
    handleInput(keycode, map){
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
function initObjects() {
    map = new Map(5, 6, 0, -21, 101, 83, 2, 4);
    allEnemies = [new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel()), new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel()), new Enemy(map.getRandomColPixel(), map.getRandomEnemyRowPixel())];
    player = new Player();
    gameoverpanel.style.display = "none";
}

/**
 * Increases the amount of enemies in the array depending on the player level
 *
 * @returns if no need to increase enemies
 */
function increaseEnemies(player, map){
    if(player.level <= 5) {
        return;
    }else if (player.level > 5 && player.level <=10 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(-map.xSpace, map.getRandomEnemyRowPixel()));
    }else if (player.level > 10 && player.level <=15 && allEnemies.length < 5){
        allEnemies.push(new Enemy(-map.xSpace, map.getRandomEnemyRowPixel()));
    }else if (player.level > 15 && allEnemies.length < 6){
        allEnemies.push(new Enemy(-map.xSpace, map.getRandomEnemyRowPixel()));
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode], map);
});


/**
 *Displays the gameover panel with level status
 *
 */
function gameover(player) {
    gameoverpanel.style.display = "flex";
    let finalLevel = document.querySelector(".final_level");
    finalLevel.textContent = player.level;
}


export {Map, map, Enemy, Player, allEnemies, player, gameover, initObjects, replay};