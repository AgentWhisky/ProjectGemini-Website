class Hitbox_sq {
    constructor(center, width, height) {
        this.x = 0;
        this.y = 0;

        this.width = width;
        this.height = height;

        this.setCenter(center);

    }

    draw() {
        noFill();
        stroke(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);

        noFill();
        stroke(255, 0, 0);
        let center = this.getCenter();
        ellipse(center[0], center[1], 5);
    }

    getCenter() {
        return [
            this.x+(this.width/2),
            this.y+(this.height/2)
        ];
    }

    getLeft() {
        return this.x;
    }
    getRight() {
        return this.x + this.width;
    }
    getTop() {
        return this.y;
    }
    getBottom() {
        return this.y + this.height;
    }

    setCenter(loc) {
        this.x = loc[0] - (this.width/2);
        this.y = loc[1] - (this.height/2);

    }

    setLeft(left) {
        this.x = left;
    }
    setRight(right) {
        this.x = right - this.width;
    }

    setTop(top) {
        this.y = top;
    }
    setBottom(bottom) {
        this.y = bottom - this.height;
    }

    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }

    // Move distance on x-axis (negative is left)
    // lock is a boolean to keep hitbox on canvas
    moveX(distance, lock) {
        this.x += distance

        if(lock) {
            if(this.x + this.width > cnvWidth) {
                this.x = cnvWidth - this.width - 1;
                return true;
            }
            else if(this.x < 0) {
                this.x = 0;
                return true;
            }
        }
        return false;
    }
    // Move distance on y-axis (negative is up)
    // lock is a boolean to keep hitbox on canvas
    moveY(distance, lock) {
        this.y += distance;

        if(lock) {
            if(this.y + this.height > cnvHeight) {
                this.y = cnvHeight - this.height - 1;
                return true;
            }
            else if(this.y < 0) {
                this.y = 0;
                return true;
            }
        }
        return false;
    }

    // Function to return true of Hitboxes have collided
    collideHitbox(hitbox) {
        if(this.getLeft() < hitbox.getRight() && this.getRight() > hitbox.getLeft()) {
            if(this.getTop() < hitbox.getBottom() && this.getBottom() > hitbox.getTop()) {
                return true;
            }
        }
        return false;
    }
}