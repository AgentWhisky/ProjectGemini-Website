
class Background {
    constructor() {
        this.width = bgSprite.width;
        this.x1 = 0;
        this.x2 = this.x1 + this.width;
        this.x3 = this.x2 + this.width;
        this.x4 = this.x3 + this.width;
        this.y = cnvHeight - groundHeight - bgSprite.height;
    }

    show() {
        image(bgSprite,this.x1, this.y);
        image(bgSprite,this.x2, this.y);
        image(bgSprite,this.x3, this.y);
        image(bgSprite,this.x4, this.y);
    }
    update() {
        this.x1 -= panSpeed;
        this.x2 -= panSpeed;
        this.x3 -= panSpeed;
        this.x4 -= panSpeed;

        if(this.x1 + this.width < 0) {
            this.x1 = this.x4 + this.width;
        }
        if(this.x2 + this.width < 0) {
            this.x2 = this.x1 + this.width;
        }
        if(this.x3 + this.width < 0) {
            this.x3 = this.x2 + this.width;
        }
        if(this.x4 + this.width < 0) {
            this.x4 = this.x3 + this.width;
        }
    }
}