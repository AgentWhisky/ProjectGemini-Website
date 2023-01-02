const defaultBallSize = 11;
const defaultBallSpeed = 5;

const defaultBallLoc = [cnvWidth/2, cnvHeight-(cnvHeight/4)];


class Ball {
    constructor(center, radius) {
        this.hitbox = new Hitbox_sq(center, radius*2, radius*2)

        this.vector = this.#initVector();
    }
    show() {
        image(spriteCache["ball_blue"], this.hitbox.x, this.hitbox.y);

        //this.hitbox.draw();
    }
    update(game) {

        // *** Movement ***

        // Move X
        let cnvCollideX = this.hitbox.moveX(this.vector[0], true);

        // Move Y
        let cnvCollideY = this.hitbox.moveY(this.vector[1], true);

        // *** Wall Collision ***
        // Wall Collision X
        if(cnvCollideX) {
            this.vector[0] = -this.vector[0];
        }

        // Wall Collision Y
        if(cnvCollideY) {
            if(this.hitbox.getBottom() >= cnvHeight - 1) {
                return true;
            }
            else {
                this.vector[1] = -this.vector[1];
            }
        }

        // Paddle Collision
        this.collideRect(game.paddle);

        // Brick Collision
        for(let i = 0; i < game.bricks.length; i++) {
            let collide = this.collideRect(game.bricks[i]);

            if(collide) {
                let destroy = game.bricks[i].ballHit();

                if(destroy) {
                    game.score += game.bricks[i].score;
                    game.bricks.splice(i, 1);
                }
            }
        }
        return false;

    }

    // Handle Ball Collision with Rectangles (Paddle and Bricks)
    collideRect(rect) {
        // If the two hitboxes collided
        if(this.hitbox.collideHitbox(rect.hitbox)) {
            let ballCenter = this.hitbox.getCenter();

            // Reverse Vector X-Component
            if(ballCenter[0] > rect.hitbox.getRight()) {
                this.vector[0] = -this.vector[0];
                this.hitbox.setLeft(rect.hitbox.getRight());
            }
            if(ballCenter[0] < rect.hitbox.getLeft()) {
                this.vector[0] = -this.vector[0];
                this.hitbox.setRight(rect.hitbox.getLeft());
            }

            // Reverse Vector Y-Component
            if(ballCenter[1] > rect.hitbox.getBottom()) {
                this.vector[1] = -this.vector[1];
                this.hitbox.setTop(rect.hitbox.getBottom());
            }
            if(ballCenter[1] < rect.hitbox.getTop()) {
                this.vector[1] = -this.vector[1];
                this.hitbox.setBottom(rect.hitbox.getTop());
            }

            return true;
        }
        return false;
    }

    // Private Functions
    #initVector() {
        // Get X-Component
        let vX = Math.random() * defaultBallSpeed;

        // Get Y-Component
        let vY = Math.sqrt(((defaultBallSpeed*defaultBallSpeed) - (vX * vX)));
        vY = -vY;

        // Get X-Component Direction
        let dirX = Math.random();

        // Set as Going Left
        if(dirX < 0.5) {
            vX = -vX;
        }

        return [vX, vY];

    }
}