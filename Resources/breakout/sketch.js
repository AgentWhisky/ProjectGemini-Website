// ***** Canvas *****
var cnv; // The Canvas
var cnvWidth = 1000;
var cnvHeight = 800;

// ***** Global Constants *****
const bgColor = "#000000";
const debug = true;

// Key Codes
const keyW = 87;
const keyA = 65;
const keyS = 83;
const keyD = 68;

// ***** Global Variables *****
let breakout;

let spriteCache = {};


// ***** p5.js Events *****

// Function to Preload Items (Sprites, Data, etc)
function preload() {
    // Background
    spriteCache["background"] = loadImage("Resources/breakout/sprites/background.jpg");

    // Ball Sprites
    spriteCache["ball_blue"] = loadImage("Resources/breakout/sprites/ball_blue.png");
    spriteCache["ball_white"] = loadImage("Resources/breakout/sprites/ball_white.png");

    // Paddle Sprites
    spriteCache["paddle_small"] = loadImage("Resources/breakout/sprites/paddle_small.png");
    spriteCache["paddle_normal"] = loadImage("Resources/breakout/sprites/paddle_normal.png");
    spriteCache["paddle_long"] = loadImage("Resources/breakout/sprites/paddle_long.png");

    // Brick Sprites
    spriteCache["brick_green"] = loadImage("Resources/breakout/sprites/brick_green.png");
    spriteCache["brick_blue"] = loadImage("Resources/breakout/sprites/brick_blue.png");
    spriteCache["brick_yellow"] = loadImage("Resources/breakout/sprites/brick_yellow.png");
    spriteCache["brick_red"] = loadImage("Resources/breakout/sprites/brick_red.png");
    spriteCache["brick_purple"] = loadImage("Resources/breakout/sprites/brick_purple.png");
    spriteCache["brick_white"] = loadImage("Resources/breakout/sprites/brick_white.png");


}

function setup() {
    // Setup Canvas
    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.parent("canvasDiv");

    breakout = new Breakout();

}

function draw() {
    // Draw Background
    background(color(bgColor));

    drawBackgroundImage();


    // Draw Game
    breakout.show();

    // Update Gmae
    breakout.update();
}

function keyPressed() {
    switch (key) {
        case ' ': // Space Bar
    }
}

function mousePressed() {

}

function getWindowCenter() {
    return [cnvWidth/2, cnvHeight/2];
}

function drawBackgroundImage() {
    let bgSprite = spriteCache["background"];
    let x = -((bgSprite.width - cnvWidth)/2);
    let y = -((bgSprite.height - cnvHeight)/2);

    image(bgSprite, x, y);
}