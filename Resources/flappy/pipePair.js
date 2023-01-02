
class PipePair {
    constructor(x) {
        this.x = x;

        this.pipeSpace = 200;

        this.heightTop = this.randomHeight();
        this.heightBottom = cnvHeight - this.heightTop - this.pipeSpace;


        this.topPipe = new Pipe(x, this.heightTop, true);
        this.bottomPipe = new Pipe(x, this.heightBottom, false);

        this.valid = true;
    }

    show() {
        this.topPipe.show();
        this.bottomPipe.show();
    }
    update() {
        this.bottomPipe.update();
        this.topPipe.update();

        this.x = this.topPipe.x;
    }

    collide(player) {
        return this.topPipe.collide(player) || this.bottomPipe.collide(player);
    }

    offScreen() {
        return this.x + pipeWidth < 0;
    }

    randomHeight() {
        return Math.floor(Math.random() * cnvHeight/3) + 50;
    }
}