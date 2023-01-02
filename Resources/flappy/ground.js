class Ground {
    constructor() {
        this.width = groundSprite.width;
        this.x1 = 0;
        this.x2 = this.x1 + this.width
        this.x3 = this.x2 + this.width;
        this.y = cnvHeight - groundHeight;
        this.height = groundHeight;


    }

    show() {
        image(groundSprite,this.x1, this.y);
        image(groundSprite,this.x2, this.y);
        image(groundSprite,this.x3, this.y);

        //fill(color(groundColor));
        //rect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x1 -= panSpeed;
        this.x2 -= panSpeed;
        this.x3 -= panSpeed;

        if(this.x1 + this.width < 0) {
            this.x1 = this.x3 + this.width;
        }
        if(this.x2 + this.width < 0) {
            this.x2 = this.x1 + this.width;
        }
        if(this.x3 + this.width < 0) {
            this.x3 = this.x2 + this.width;
        }
    }

    collide(player) {
        return player.y + player.size > this.y;
    }
}