
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velY = 0;
        this.size = birdSprite.width;

        this.dead = false;
    }

    show() {
        if(this.velY === 0) {
            image(birdSprite,this.x, this.y,this.size, this.size);
        }
        else if(this.velY > 0) {
            image(birdSpriteUp,this.x, this.y,this.size, this.size);
        }
        else {
            image(birdSpriteDown,this.x, this.y);
        }
    }
    update() {
        this.velY += gravity;
        this.y += this.velY;

        // Pipe Collision
        if(pipes1.collide(this)) {
            this.dead = true;
        }
        if(pipes2.collide(this)) {
            this.dead = true;
        }

        // Ground Collision
        if(ground.collide(this)) {
            this.dead = true;
            this.y = ground.y - this.size;
        }

        if(this.dead) {
            panSpeed = 0;
        }

    }
    flap() {
        if(!this.dead) {
            this.velY = flapVel;
        }
    }
}