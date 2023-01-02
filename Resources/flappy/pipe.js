
class Pipe {
    constructor(x, height, isTop) {
        this.x = x;
        this.width = pipeWidth;
        this.height = height
        this.isTop = isTop;

        if(isTop) {
            this.topY = 0;
            this.bottomY = this.height;
        }
        else {
            this.topY = cnv.height - this.height;
            this.bottomY = cnv.height;
        }
    }

    show() {
        //fill(0, 204, 0);
        //rect(this.x, this.topY, this.width, this.height)

        if(this.isTop) {
            image(pipeSpriteInvert,this.x, this.bottomY - pipeSpriteInvert.height, this.width, pipeSpriteInvert.height);
        }
        else {
            image(pipeSprite,this.x, this.topY, this.width, pipeSprite.height);
        }


    }

    update() {
        this.x -= panSpeed;
    }

    collide(player) {
        if(player.x + player.size >= this.x && player.x - player.size  <= this.x + this.width) {

            if(this.isTop && player.y < this.bottomY) {
                return true;
            }
            if(!this.isTop && player.y > this.topY) {
                return true;
            }
        }
        return false;
    }

    offScreen() {
        return this.x + pipeWidth < 0;
    }
}
