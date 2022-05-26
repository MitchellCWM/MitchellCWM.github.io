//let canvas = document.querySelector('canvas');
let container = document.querySelector('.canvasContainer');
let width = window.innerWidth;
let height = window.innerHeight * .9;
let fillStyle = 'rgba(0,0,0,0.3)'

let mouseX = 0;
let mouseY = 0;
let ctx;
let canvas: HTMLCanvasElement;

let player;
let bots = [];
let beams = [];


let CONSTANTBOTCOUNTER = 0;
let CONSTANTBOTCOUNTERLIMIT = 250;
let CONSTANTBASESPEEDMULTI = 3;
let botCounter: number;
let botCounterLimit: number;
let botBaseSpeedMulit: number;

let currentScore = 0;

let keyMap = {
    'ArrowRight': false,
    'ArrowUp': false,
    'ArrowLeft': false,
    'ArrowDown': false
}



async function delay(timeDelay: number): Promise<void> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, timeDelay);
    });
}


async function frame() {
    let rate = 15;
    while (true) {
        //after delay to this
        let promise = await delay(rate);
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, width, height);

        player.updateSpeed(keyMap);
        player.updatePosition();

        updateBots();
        updateBeams();

        player.draw(ctx);
        drawAngled();


        if (botCounter < botCounterLimit) {
            botCounter += 5;
        }
        else {
            botCounter = 0;
            botCounterLimit--;
            botBaseSpeedMulit += 0.1
            createBot();
        }

        checkForHits();

        removeOutOfBounds();

        if (checkForPlayerCollision()) {
            end();
        }
    }
}

document.addEventListener('keydown', function (e: KeyboardEvent) {
    if (e.key === 'w') {
        keyMap.ArrowUp = true;
    }
    else if (e.key === 'a') {
        keyMap.ArrowLeft = true;
    }
    else if (e.key === 'd') {
        keyMap.ArrowRight = true;
    }
    else if (e.key === 's') {
        keyMap.ArrowDown = true;
    }
    keyMap[e.key] = true;
});


document.addEventListener('keyup', function (e: KeyboardEvent) {
    keyMap[e.key] = false;

    if (e.key === 'w') {
        keyMap.ArrowUp = false;
    }
    else if (e.key === 'a') {
        keyMap.ArrowLeft = false;
    }
    else if (e.key === 'd') {
        keyMap.ArrowRight = false;
    }
    else if (e.key === 's') {
        keyMap.ArrowDown = false;
    }
});


function drawAngled() {
    let length = 25;
    let x = player.x;
    let y = player.y;
    ctx.strokeStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    let angle = getAngle(mouseX, mouseY, player.x, player.y);
    ctx.arc(player.x, player.y, 2 * length, angle, angle, true);
    ctx.lineWidth = 10;
    ctx.stroke();
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function drawRectangle(angle, width, length) {
    ctx.fillStyle = 'white';

    angle = absoluteRad(angle);
    angle += Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(player.x, player.y);

    let x = player.x;
    let y = player.y;


    ctx.arc(x, y, width, angle, angle, true);
    x = updatePositionX(x, angle, width);
    y = updatePositionY(y, angle, width);
    angle += Math.PI / 2;

    ctx.arc(x, y, length, angle, angle, true);
    x = updatePositionX(x, angle, length);
    y = updatePositionY(y, angle, length);
    angle += Math.PI / 2;

    ctx.arc(x, y, 2 * width, angle, angle, true);
    x = updatePositionX(x, angle, 2 * width);
    y = updatePositionY(y, angle, 2 * width);
    angle += Math.PI / 2;

    ctx.arc(x, y, length, angle, angle, true);
    x = updatePositionX(x, angle, length);
    y = updatePositionY(y, angle, length);
    angle += Math.PI / 2;

    ctx.fill();
}

document.addEventListener('click', function (e) {
    let angle = getAngle(mouseX, mouseY, player.x, player.y);
    beams[beams.length] = new Beam(player.x, player.y, angle, 20, 3, 40, 'white');
});

function updateBeams() {
    for (let i = 0; i < beams.length; i++) {
        beams[i].updatePosition();
        beams[i].draw(ctx);
    }
}

function updateBots() {
    for (let i = 0; i < bots.length; i++) {
        bots[i].updateAngle(player);
        bots[i].updatePosition();
        bots[i].draw(ctx);
    }
}

function checkForHits() {
    for (let i = 0; i < beams.length; i++) {
        for (let j = 0; j < bots.length; j++) {
            if (beams[i].colision(bots[j])) {
                console.log('hit');
                beams.splice(i, 1);
                bots.splice(j, 1);
                i = -1;
                j = 0;

                currentScore += 50;
                updateScore(currentScore);
                break;
            }
        }
    }
}

function removeOutOfBounds() {
    for (let i = 0; i < beams.length; i++) {
        if (beams[i].outOfRange(width, height)) {
            beams.splice(i, 1);
            i = 0;
        }
    }
}

function createBot() {
    let side = rand(1, 4);
    let xPos: number;
    let yPos: number;
    let size = rand(5, 75);
    if (side <= 2) {
        xPos = rand(-size, width);
        if (side === 1) {
            yPos = 0;
        }
        else {
            yPos = height;
        }
    }
    else {
        yPos = rand(-size, height);
        if (size === 3) {
            xPos = 0;
        }
        else {
            xPos = width;
        }
    }

    let speed = size / 60 * botBaseSpeedMulit;
    let angle = getAngle(player.x, player.y, xPos, yPos);
    let color = getRandomColor();
    bots[bots.length] = new Bot(xPos, yPos, size, speed, angle, color);
}

function checkForPlayerCollision() {
    for (let bot of bots) {
        if (bot.checkPlayerCollision(player)) {
            return true;
        }
    }
    return false;
}

function load() {
    //removing menu
    let container = document.querySelector('.canvasContainer');
    let backgroundImage:HTMLImageElement = document.querySelector('#menuBackground');
    backgroundImage.style.visibility = 'hidden';

    //adding score
    let scoreEle: HTMLElement = document.createElement('h3');
    scoreEle.setAttribute('class','highScoreHeader');
    scoreEle.textContent = 'hello'
    
    //creating canvas
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    container.appendChild(scoreEle);
    ctx.fillStyle = 'rbg(0,0,0)';
    ctx.fillRect(0, 0, width, height);
    frame();

    document.addEventListener('mousemove', function (e) {
        let position = getMousePos(canvas, e);
        mouseX = position.x;
        mouseY = position.y;
    });

    player = new Player((width / 2) / 10, height / 2, 20, 10, 0, 'purple');
    bots = [];
    bots[0] = new Bot(width / 2, height / 2, 20, 5, 10, 'red');


    botCounter = CONSTANTBOTCOUNTER;
    botCounterLimit = CONSTANTBOTCOUNTERLIMIT;
    botBaseSpeedMulit = CONSTANTBASESPEEDMULTI;

    beams = [];
}
