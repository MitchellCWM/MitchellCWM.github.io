function Ball(x, y, size, speedx, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedx;
    this.color = color;
}
Ball.prototype = Object.create(Object.prototype);
Ball.prototype.constructor = Ball;
Ball.prototype.draw = function (ctx) {
    this.x = keepInRange(-this.size, width, this.x);
    this.y = keepInRange(-this.size, height, this.y);
    //what happens if it is out of bounds
    ctx.beginPath(); //start drawing
    ctx.fillStyle = this.color; //what color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //what shape and where
    ctx.fill(); //finish the drawing
};
function Player(x, y, size, speedx, speedy, color) {
    Ball.call(this, x, y, size, speedx, color);
    this.speedY = speedy;
}
Player.prototype = Object.create(Ball.prototype);
Player.prototype.constructor = Player;
Player.prototype.updatePosition = function () {
    this.x += this.speedX;
    this.y += this.speedY;
};
Player.prototype.updateSpeed = function (keymap) {
    //reduce to stop
    let speedChange = 0.25;
    if ((keymap.ArrowRight && keyMap.ArrowLeft) || (!keyMap.ArrowRight && !keymap.ArrowLeft)) {
        this.speedX = (this.speedX * (1 - speedChange));
    }
    else if (keymap.ArrowRight) {
        if (this.speedX <= -1) {
            this.speedX = (keepInRange(-10, 10, (this.speedX * (1 - 1.5 * speedChange))));
        }
        else if (this.speedX >= 0.1) {
            this.speedX = keepInRange(-10, 10, (this.speedX * (1 + speedChange)));
        }
        else {
            this.speedX = 1;
        }
    }
    else {
        if (this.speedX >= 1) {
            this.speedX = (keepInRange(-10, 10, (this.speedX * (1 - 1.5 * speedChange))));
        }
        else if (this.speedX <= -0.1) {
            this.speedX = keepInRange(-10, 10, (this.speedX * (1 + speedChange)));
        }
        else {
            this.speedX = -1;
        }
    }
    //vertical
    if ((keymap.ArrowDown && keyMap.ArrowUp) || (!keyMap.ArrowDown && !keymap.ArrowUp)) {
        this.speedY = (this.speedY * (1 - speedChange));
    }
    else if (keymap.ArrowDown) {
        if (this.speedY <= -1) {
            this.speedY = (keepInRange(-10, 10, (this.speedY * (1 - speedChange))));
        }
        else if (this.speedY >= 0.1) {
            this.speedY = keepInRange(-10, 10, (this.speedY * (1 + speedChange)));
        }
        else {
            this.speedY = 1;
        }
    }
    else {
        if (this.speedY >= 1) {
            this.speedY = (keepInRange(-10, 10, (this.speedY * (1 - speedChange))));
        }
        else if (this.speedY <= -0.1) {
            this.speedY = keepInRange(-10, 10, (this.speedY * (1 + speedChange)));
        }
        else {
            this.speedY = -1;
        }
    }
};
function keepInRange(min, max, numberIn) {
    if (numberIn > max) {
        return max;
    }
    else if (numberIn < min) {
        return min;
    }
    return numberIn;
}
function getAngle(x, y, x2, y2) {
    let xDif = x - x2;
    let yDif = y - y2;
    let opp = Math.abs(yDif);
    let adj = Math.abs(xDif);
    let angle = Math.atan(opp / adj);
    if (xDif < 0 && yDif < 0) {
        angle += Math.PI;
    }
    else if (xDif > 0 && yDif < 0) {
        angle = -angle;
    }
    else if (xDif < 0 && yDif > 0) {
        angle = -angle + Math.PI;
    }
    return angle;
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
function radToDeg(rad) {
    return rad * 180 / Math.PI;
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + (min);
}
function Beam(x, y, angle, speed, width, length, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.width = width;
    this.length = length;
    this.color = color;
}
Beam.prototype = Object.create(Object.prototype);
Beam.prototype.constructor = Beam;
Beam.prototype.updatePosition = function () {
    this.x = updatePositionX(this.x, this.angle, this.speed);
    this.y = updatePositionY(this.y, this.angle, this.speed);
};
Beam.prototype.colision = function (botIn) {
    let hitBoxX = this.x;
    let hitBoxY = this.y;
    let distanceX = hitBoxX - botIn.x;
    let distanceY = hitBoxY - botIn.y;
    let distance = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
    distance = Math.sqrt(distance);
    return distance < Math.max(10, botIn.size) + this.width + length / 2;
};
Beam.prototype.outOfRange = function (width, height) {
    if (this.x < 0 || this.y < 0 || this.x > width + length || this.y > height + width) {
        return true;
    }
    return false;
};
Beam.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    let tempAngle = absoluteRad(this.angle);
    tempAngle += Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    let x = this.x;
    let y = this.y;
    ctx.arc(x, y, this.width, tempAngle, tempAngle, true);
    x = updatePositionX(x, tempAngle, this.width);
    y = updatePositionY(y, tempAngle, this.width);
    tempAngle += Math.PI / 2;
    ctx.arc(x, y, this.length, tempAngle, tempAngle, true);
    x = updatePositionX(x, tempAngle, this.length);
    y = updatePositionY(y, tempAngle, this.length);
    tempAngle += Math.PI / 2;
    ctx.arc(x, y, 2 * this.width, tempAngle, tempAngle, true);
    x = updatePositionX(x, tempAngle, 2 * this.width);
    y = updatePositionY(y, tempAngle, 2 * this.width);
    tempAngle += Math.PI / 2;
    ctx.arc(x, y, this.length, tempAngle, tempAngle, true);
    x = updatePositionX(x, tempAngle, this.length);
    y = updatePositionY(y, tempAngle, this.length);
    tempAngle += Math.PI / 2;
    ctx.fill();
};
function Bot(x, y, size, speedx, angle, color) {
    Ball.call(this, x, y, size, speedx, color);
    this.angle = angle;
}
Bot.prototype = Object.create(Ball.prototype);
Bot.prototype.constructor = Bot;
Bot.prototype.updateAngle = function (player) {
    let turnVar = 0.01;
    let angle = getAngle(player.x, player.y, this.x, this.y);
    angle = absoluteRad(angle);
    this.angle = angle * 0.95;
};
Bot.prototype.updatePosition = function () {
    this.x = updatePositionX(this.x, this.angle, this.speedX);
    this.y = updatePositionY(this.y, this.angle, this.speedX);
};
Bot.prototype.checkPlayerCollision = function (player) {
    let distanceX = this.x - player.x;
    let distanceY = this.y - player.y;
    let distance = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
    distance = Math.sqrt(distance);
    return distance < (this.size + player.size);
};
function updatePositionX(x, angle, length) {
    return x + (Math.cos(angle) * length);
}
function updatePositionY(y, angle, length) {
    return y + (Math.sin(angle) * length);
}
function absoluteRad(rad) {
    let newRad = rad;
    while (newRad < 0) {
        newRad += 2 * Math.PI;
    }
    return newRad;
}
function getRandomColor() {
    let colors = ["blue", "red", "green"];
    return colors[rand(0, colors.length - 1)];
}
//let canvas = document.querySelector('canvas');
let container = document.querySelector('.canvasContainer');
let width = window.innerWidth;
let height = window.innerHeight * .9;
let fillStyle = 'rgba(0,0,0,0.3)';
let mouseX = 0;
let mouseY = 0;
let ctx;
let canvas;
let player;
let bots = [];
let beams = [];
let CONSTANTBOTCOUNTER = 0;
let CONSTANTBOTCOUNTERLIMIT = 250;
let CONSTANTBASESPEEDMULTI = 3;
let botCounter;
let botCounterLimit;
let botBaseSpeedMulit;
let currentScore = 0;
let keyMap = {
    'ArrowRight': false,
    'ArrowUp': false,
    'ArrowLeft': false,
    'ArrowDown': false
};
async function delay(timeDelay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
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
            botBaseSpeedMulit += 0.1;
            createBot();
        }
        checkForHits();
        removeOutOfBounds();
        if (checkForPlayerCollision()) {
            end();
        }
    }
}
document.addEventListener('keydown', function (e) {
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
document.addEventListener('keyup', function (e) {
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
    let xPos;
    let yPos;
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
    let backgroundImage = document.querySelector('#menuBackground');
    backgroundImage.style.visibility = 'hidden';
    //adding score
    let scoreEle = document.createElement('h3');
    scoreEle.setAttribute('class', 'highScoreHeader');
    scoreEle.textContent = 'hello';
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
let buttonContainer = document.querySelector('#wasdContainer');
let menuContainer = document.querySelector('.menuContainer');
let aBtn = document.querySelector('#a');
let wBtn = document.querySelector('#w');
let sBtn = document.querySelector('#s');
let dBtn = document.querySelector('#d');
window.addEventListener('load', buttonAnimation);
let buttonLocation = 'w';
let animationFinished = false;
async function buttonAnimation() {
    animationFinished = false;
    let nextButtonLocation = buttonLocation;
    let tempButton;
    switch (buttonLocation) {
        case 'w':
            tempButton = wBtn;
            nextButtonLocation = 'd';
            break;
        case 'a':
            tempButton = aBtn;
            nextButtonLocation = 'w';
            break;
        case 's':
            tempButton = sBtn;
            nextButtonLocation = 'a';
            break;
        case 'd':
            tempButton = dBtn;
            nextButtonLocation = 's';
            break;
    }
    if (buttonLocation != 'z') {
        await delay(600);
        activateButton(tempButton);
        await delay(600);
        resetButton(tempButton);
    }
    if (buttonLocation != 'z') {
        buttonLocation = nextButtonLocation;
        buttonAnimation();
    }
    else {
        animationFinished = true;
    }
}
buttonContainer.addEventListener('mouseover', cancelButtonAnimation);
buttonContainer.addEventListener('mouseleave', activateButtonAnimation);
function activateButton(elementIn) {
    let currentClass = elementIn.getAttribute('class');
    if (currentClass === 'keyBoardButton' && buttonLocation != 'z') {
        elementIn.setAttribute('class', 'keyBoardButton--active');
    }
}
function resetButton(elementIn) {
    if (elementIn.getAttribute('class') == 'keyBoardButton--active' && buttonLocation != 'z') {
        elementIn.setAttribute('class', 'keyBoardButton');
    }
}
window.addEventListener('keydown', function (e) {
    let keyDown = e.key;
    let button = this.document.querySelector(`#${keyDown}`);
    if (button) {
        activateButton(button);
    }
});
window.addEventListener('keydown', function (e) {
    let keyDown = e.key;
    let button = this.document.querySelector(`#${keyDown}`);
    if (button) {
        cancelButtonAnimation();
        button.setAttribute('class', 'keyBoardButton--active');
    }
});
window.addEventListener('keyup', function (e) {
    let keyUp = e.key;
    let button = this.document.querySelector(`#${keyUp}`);
    if (button) {
        activateButtonAnimation();
        resetButton(button);
    }
});
function cancelButtonAnimation() {
    if (buttonLocation != 'z') {
        let buttonElement = document.querySelector(`#${buttonLocation}`);
        resetButton(buttonElement);
    }
    buttonLocation = 'z';
}
function activateButtonAnimation() {
    buttonLocation = 'w';
    if (animationFinished) {
        buttonAnimation();
    }
}
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', function (e) {
    menuContainer.remove();
    load();
});
function end() {
    let canvasContainer = document.querySelector('.canvasContainer');
    let backgroundImage = document.querySelector('#menuBackground');
    backgroundImage.style.visibility = 'visible';
    let canvas = document.querySelector('canvas');
    canvas.remove();
    let scoreHeader = document.querySelector('.highScoreHeader');
    scoreHeader.remove();
    canvasContainer.appendChild(menuContainer);
}
function updateScore(numberIn) {
    let scoreString = convertNumberToString(numberIn, 10);
    let scoreHeader = document.querySelector('.highScoreHeader');
    scoreHeader.textContent = scoreString;
    console.log('here');
}
function convertNumberToString(numberIn, digits) {
    let numberString = numberIn.toString();
    let tempString = '';
    for (let i = numberString.length; i < digits; i++) {
        tempString += '0';
    }
    tempString += numberString;
    return tempString;
}
