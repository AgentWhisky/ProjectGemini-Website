// ***** Canvas *****
var cnv; // The Canvas
const cnvWidth = 450;
const cnvHeight = 800;

// ***** Global Constants *****
const bgColor = "#87CEFA";
const groundColor = "#6A4A2B";
const pipeColor = "#00CC00";
const birdColor = "#FFFF00";
const defaultPanSpeed = 3;
const gravity = 0.5;
const groundHeight = 100;
const flapVel = -8;
const maxPipeSpace = 300;
const minPipeSpace = 100;



// ***** Global Variables *****
var player;
var ground;
var pipes1;
var pipes2;
var bg;

var passCount;

var birdSprite;
var birdSpriteUp;
var birdSpriteDown;
var pipeSprite;
var pipeSpriteInvert;
var groundSprite;
var bgSprite;
var gameOverSprite;

var zeroSprite;
var oneSprite;
var twoSprite;
var threeSprite;
var fourSprite;
var fiveSprite;
var sixSprite;
var sevenSprite;
var eightSprite;
var nineSprite;

var pipeWidth;
var panSpeed;

var startTimer;



// ***** p5.js Events *****
function preload() {
    birdSprite = loadImage("Resources/flappy/sprites/bluebird-midflap.png");
    birdSpriteUp = loadImage("Resources/flappy/sprites/bluebird-upflap.png");
    birdSpriteDown = loadImage("Resources/flappy/sprites/bluebird-downflap.png");

    pipeSprite = loadImage("Resources/flappy/sprites/pipe-green.png");
    pipeSpriteInvert = loadImage("Resources/flappy/sprites/pipe-green-invert.png");

    groundSprite = loadImage("Resources/flappy/sprites/base.png");
    bgSprite = loadImage("Resources/flappy/sprites/background-day.png");

    gameOverSprite = loadImage("Resources/flappy/sprites/gameover.png");

    zeroSprite = loadImage("Resources/flappy/sprites/0.png");
    oneSprite = loadImage("Resources/flappy/sprites/1.png");
    twoSprite = loadImage("Resources/flappy/sprites/2.png");
    threeSprite = loadImage("Resources/flappy/sprites/3.png");
    fourSprite = loadImage("Resources/flappy/sprites/4.png");
    fiveSprite = loadImage("Resources/flappy/sprites/5.png");
    sixSprite = loadImage("Resources/flappy/sprites/6.png");
    sevenSprite = loadImage("Resources/flappy/sprites/7.png");
    eightSprite = loadImage("Resources/flappy/sprites/8.png");
    nineSprite = loadImage("Resources/flappy/sprites/9.png");
}

function setup() {
    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.parent("canvasDiv");

    pipeWidth = pipeSprite.width;

    player = new Player(100, cnvHeight/2);

    pipes1 = new PipePair(cnvWidth-pipeSprite.width/2);
    pipes2 = new PipePair(pipes1.x + cnvWidth/2);

    ground = new Ground();
    bg = new Background();

    cnv.mouseClicked(flap);

    panSpeed = defaultPanSpeed;
    passCount = 5;
    startTimer = 5;

}

function draw() {
    background(color(bgColor));

    bg.show();

    pipes1.show();
    if(pipes1.offScreen()) {
        pipes1 = new PipePair(cnvWidth);
    }

    pipes2.show();
    if(pipes2.offScreen()) {
        pipes2 = new PipePair(cnvWidth);
    }

    player.show();
    ground.show();

    // Check if player passed a pipe pair
    pass();

    // Display Score Count
    showCount();

    if(startTimer === 0) {
        // Update
        bg.update();
        pipes1.update();
        pipes2.update();
        ground.update();
        player.update();
    }
    else {
        if (frameCount % 60 === 0 && startTimer > 0) {
            startTimer --;
            passCount = startTimer;
        }

    }

    // If Player is Dead - End Game
    if(player.dead) {
        gameOver();
    }

    // Debug Functions
    //debugInfo();


}

function keyPressed() {
    switch (key) {
        case ' ': // Space Bar
            player.flap();
            break;
        case '1':
            restart();
            break;
    }
}

function pass() {
    if(player.x - player.size/2 > pipes1.x + pipeWidth && pipes1.valid) {
        pipes1.valid = false;
        passCount+=1;
    }
    if(player.x - player.size/2 > pipes2.x + pipeWidth && pipes2.valid) {
        pipes2.valid = false;
        passCount+=1;
    }
}

function showCount() {
    let y = cnvHeight/6;
    let x;
    let numSprite;

    let numArray = Array.from(String(passCount));
    let numDigits = numArray.length;

    if(passCount % 2 === 0) {
        x = cnvWidth/2 - (zeroSprite.width/2)*((numDigits/2));
    }
    else {
        x = cnvWidth/2 - (zeroSprite.width/2)*((numDigits+1)/2);
    }

    for(let i = 0; i < numDigits; i++) {
        switch(numArray[i]) {
            case "0": numSprite = zeroSprite;
                break;
            case "1": numSprite = oneSprite;
                break;
            case "2": numSprite =twoSprite;
                break;
            case "3": numSprite = threeSprite;
                break;
            case "4": numSprite = fourSprite;
                break;
            case "5": numSprite = fiveSprite;
                break;
            case "6": numSprite = sixSprite;
                break;
            case "7": numSprite = sevenSprite;
                break;
            case "8": numSprite = eightSprite;
                break;
            case "9": numSprite = nineSprite;
                break;
        }
        image(numSprite,x, y);

        x += zeroSprite.width;
    }

}

function gameOver() {
    let x = cnvWidth/2 - gameOverSprite.width/2;
    let y = cnvHeight/4;

    image(gameOverSprite,x, y);
}
function flap() {
    player.flap();
}

function restart() {
    setup();
}

function debugInfo() {
    distanceToPipe();
}

// ***** Debug Labels *****
function distanceToPipe() {
    let distance1 = pipes1.x - (player.x + player.size);
    let distance2 = pipes2.x - (player.x + player.size);

    let string = "Distance to Next Pipe: "

    if(distance1 < 0) {
        document.getElementById("distanceLabel").innerHTML = string + distance2;
    }
    else if(distance2 < 0) {
        document.getElementById("distanceLabel").innerHTML = string  + distance1;
    }
    else if(distance1 < distance2) {
        document.getElementById("distanceLabel").innerHTML = string + distance1;
    }
    else {
        document.getElementById("distanceLabel").innerHTML = string  + distance2;
    }

}
