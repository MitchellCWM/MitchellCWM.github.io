function Bot(x, y, size, speedx, angle, color) {
    Ball.call(this, x, y, size, speedx, color);
    this.angle = angle;
}


Bot.prototype = Object.create(Ball.prototype);
Bot.prototype.constructor = Bot;


Bot.prototype.updateAngle = function (player) {
    let turnVar = 0.01;
    let angle = getAngle(player.x, player.y, this.x, this.y,);
    angle = absoluteRad(angle);

    this.angle = angle * 0.95;
}

Bot.prototype.updatePosition = function () {
    this.x = updatePositionX(this.x, this.angle, this.speedX);
    this.y = updatePositionY(this.y, this.angle, this.speedX);
}


Bot.prototype.checkPlayerCollision = function (player) {
    let distanceX = this.x - player.x;
    let distanceY = this.y - player.y;
    let distance = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
    distance = Math.sqrt(distance);
    return distance < (this.size + player.size);
}
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

