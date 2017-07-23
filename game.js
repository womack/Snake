//Viewable Board
let canvas, context;

//Setting up the grid
let gridSize = 20;
let tileCount = gridSize;

//Object co-ords
let playerX = gridSize / 2;
let playerY = gridSize / 2;
let appleX = gridSize / 2 + 5;
let appleY = gridSize / 2 + 5;

//Player state
let trail = [];
let tail = 5;
let velocityX = 0;
let velocityY = 0;

window.onload = () => {
    //Board, Events, Game timer.
    canvas = document.getElementById("cnvs");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
}

let game = () => {
    playerX += velocityX;
    playerY += velocityY;
    if (playerX < 0) {
        playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
        playerX = 0
    }
    if (playerY < 0) {
        playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1) {
        playerY = 0
    }
    //Draw Board
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height - 20);

    //Draw Player
    context.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
        }
    }
    trail.push({ x: playerX, y: playerY });
    while (trail.length > tail) {
        trail.shift();
    }
    if (appleX == playerX && appleY == playerY) {
        tail++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }
    //Draw Apple
    context.fillStyle = "red";
    context.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);

    //Draw Score
    context.lineWidth = 1;
    context.fillStyle = "#CC00FF";
    context.lineStyle = "#ffff00";
    context.font = "18px sans-serif";
    context.fillText(tail - 5, 0, canvas.height - 20);
}

let keyPush = (event) => {
    switch (event.keyCode) {
        case 37:
            velocityX = -1;
            velocityY = 0;
            break;
        case 38:
            velocityX = 0;
            velocityY = -1;
            break;
        case 39:
            velocityX = 1;
            velocityY = 0;
            break;
        case 40:
            velocityX = 0;
            velocityY = 1;
            break;
    }
}

let checkVelocity = (requestedX, requestedY) => {
    if (requestedX * velocityX < 0 || requestedY * velocityY < 0) {
        return false;
    }
    return true;
}