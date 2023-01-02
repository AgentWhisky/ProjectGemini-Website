const defaultPaddleWidth = 300;
const defaultPaddleHeight = 10;
const defaultPaddleY = cnvHeight-100;

const defaultMoveSpeed = 10;

const paddleSmall = 1;
const paddleNormal = 2;
const paddleLarge = 3;

class Paddle {
    constructor() {
        this.state = paddleNormal;

        this.hitbox = new Hitbox_sq([cnvWidth/2, defaultPaddleY], spriteCache["paddle_normal"].width, spriteCache["paddle_normal"].height);

    }
    show() {
        let sprite;

        if(this.state === paddleSmall) {
            sprite = spriteCache["paddle_small"];
        }
        else if(this.state === paddleNormal) {
            sprite = spriteCache["paddle_normal"];
        }
        else if(this.state === paddleLarge) {
            sprite = spriteCache["paddle_large"];
        }

        image(sprite, this.hitbox.x, this.hitbox.y);

        //this.hitbox.draw();
    }
    update() {

        // NEW
        let a = keyIsDown(keyA);
        let d = keyIsDown(keyD);

        if(!a && d) {
            // Move Right
            this.hitbox.moveX(defaultMoveSpeed, true);
        }
        if(a && !d) {
            // Move Left
            this.hitbox.moveX(-defaultMoveSpeed, true);
        }
    }

    // Private Functions

}
