let defaultBallPauseTime = 5*60;

class Breakout {
    constructor() {
        // Create Paddle
        this.paddle = new Paddle();

        this.balls = [];
        for(let i = 0; i < 1; i++) {
            this.addBall();
        }

        this.bricks = genBricks();

        this.score = 0;
        this.lives = 3;

        this.ballPauseTime = defaultBallPauseTime;
    }
    show() {
        // Draw Paddle
        this.paddle.show();

        // Draw Balls
        for(let ball of this.balls) {
            ball.show();
        }

        // Draw Bricks
        for(let brick of this.bricks) {
            brick.show();
        }

        this.drawInfo();


    }
    update() {
        // Update Paddle
        this.paddle.update();

        if(this.ballPauseTime === 0) {
            // Update Balls
            for(let i = 0; i < this.balls.length; i++) {
                let die = this.balls[i].update(this);

                if(die) {
                    if(!(this.balls.length > 1)) {
                        this.loseLife();
                    }
                    this.balls.splice(i, 1);
                }
            }
        }
        else {
            this.ballPauseTime--;
        }

        // Update Bricks
        for(let brick of this.bricks) {
            brick.update();
        }
    }

    // Helper Functions
    addBall() {
        this.balls.push(new Ball(defaultBallLoc, defaultBallSize));
    }

    drawInfo() {
        let textColor = "#C6C605";



        // Show Score
        textSize(32);
        fill(color(textColor));
        text("Score: " + this.score, cnvWidth - cnvWidth/4, 40);


        // Show Lives
        textSize(32);
        fill(color(textColor));
        text("Lives: " + this.lives, cnvWidth/4 - cnvWidth/8, 40);


        // Ball Pause Time
        if(this.ballPauseTime > 0) {
            textSize(32);
            fill(color(textColor));
            text("Get Ready: " + Math.ceil(this.ballPauseTime/60), cnvWidth/2 - cnvWidth/12, cnvHeight/2);
        }

    }

    loseLife() {
        this.lives--;

        if(this.lives > 0) {
            this.addBall();

            this.ballPauseTime = defaultBallPauseTime;
        }
    }


}

