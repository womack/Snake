//Viewable Board
let canvas, context;

//Setting up the grid
let gridSize = 20;
let tileCount = gridSize;

//Object co-ords
let playerX = gridSize / 2;
let playerY = gridSize / 2;
let apple = { color: "red", x: gridSize / 2 + 5, y: gridSize / 2 + 5 };


//Player state
let trail = [];
let tail = 5;
let velocity = { x: 1, y: 0 };
let difficulty = 1;

//Board, Events, Game timer.
window.onload = () => {
    canvas = document.getElementById("cnvs");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / (10 + difficulty * 5));
}

let game = () => {

    //Movement
    playerX += velocity.x;
    playerY += velocity.y;
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
    if (apple.x == playerX && apple.y == playerY) {
        tail++;
        Object.assign(apple, getRandomCoords(tileCount));
    }
    //Draw Food/Apple
    drawApple(apple);

    //Draw Current Score
    drawScore(tail - 5);

}

//Return a random co-ordinate, for food spawns
let getRandomCoords = (boundary) => {
    let x = Math.floor(Math.random() * boundary);
    let y = Math.floor(Math.random() * boundary);
    return { x: x, y: y };
}

let drawApple = ({ color, x, y }) => {
    context.fillStyle = color;
    context.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

let drawScore = (score) => {
    context.lineWidth = 1;
    context.fillStyle = "#CC00FF";
    context.lineStyle = "#ffff00";
    context.font = "18px sans-serif";
    context.fillText(score, 0, canvas.height - 20);
}

let keyPush = (event) => {
    velocity = getVelocityFromDirection(event.keyCode);
}

let getVelocityFromDirection = (keyCode) => {
    let tmp = {};
    switch (keyCode) {
        case 37:
            tmp = changeVelocity(-1, 0);
            break;
        case 38:
            tmp = changeVelocity(0, -1);
            break;
        case 39:
            tmp = changeVelocity(1, 0);
            break;
        case 40:
            tmp = changeVelocity(0, 1);
            break;
    }
    return tmp;
}

//In attempt to stop player doing a complete 360 with concurrent keypresses, still buggy currently.
let changeVelocity = (requestedX, requestedY) => {
    if (!((requestedX * velocity.x < 0) || (requestedY * velocity.y < 0))) {
        return { x: requestedX, y: requestedY };
    } else {
        return velocity;
    }
}