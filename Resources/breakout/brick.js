const defaultScore = 10;
const defaultHitTimer = 10;

const green = 1;
const blue = 2;
const yellow = 3;
const red = 4;
const purple = 5;
const white = 6;

class Brick {
    constructor(center, width, height, health) {
        this.hitbox = new Hitbox_sq(center, spriteCache["brick_green"].width, spriteCache["brick_green"].height)
        this.health = health;

        this.score = defaultScore * health;
        this.lastHitTimer = 0; // Prevent Multiple Collisions at Once
    }
    show() {
        let sprite;

        if(this.health === green) {
            sprite = spriteCache["brick_green"];
        }
        else if(this.health === blue) {
            sprite = spriteCache["brick_blue"];
        }
        else if(this.health === yellow) {
            sprite = spriteCache["brick_yellow"];
        }
        else if(this.health === red) {
            sprite = spriteCache["brick_red"];
        }
        else if(this.health === purple) {
            sprite = spriteCache["brick_purple"];
        }
        else if(this.health === white) {
            sprite = spriteCache["brick_white"];
        }

        image(sprite, this.hitbox.x, this.hitbox.y);

        //this.hitbox.draw();
    }
    update() {
        if(this.lastHitTimer > 0) {
            this.lastHitTimer--;
        }
    }

    ballHit() {
        // Check Time
        if(this.lastHitTimer === 0) {
            this.health--;
            this.lastHitTimer = defaultHitTimer;
        }

        return this.health === 0;

    }
}

function genBricks() {

    let x;
    let y;

    let brickArr = [];

    let rows = 6;
    let cols = 13; // Needs to be Odd
    let space = 12; // Needs to be even
    let verticalSpace = 50;

    let width = spriteCache["brick_green"].width;
    let height = spriteCache["brick_green"].height;

    let health = 6;

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            x = Math.floor((space * (j+1)) + (width * j) + (width/2));
            y = Math.floor(50 + (space * (i+1)) + (height * i) + (height/2));

            brickArr.push(new Brick([x, y], width, height, health));
        }
        health--;
        if(health < 1) {
            health = 1;
        }
    }

    return brickArr;
}