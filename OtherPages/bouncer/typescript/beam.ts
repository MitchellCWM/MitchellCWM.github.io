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
}

Beam.prototype.colision = function (botIn) {
    
    let hitBoxX = this.x;
    let hitBoxY = this.y;
   let distanceX = hitBoxX - botIn.x;
   let distanceY = hitBoxY - botIn.y;

   let distance = Math.pow(distanceX,2) +Math.pow(distanceY,2);
   distance = Math.sqrt(distance);
   return distance < Math.max(10,botIn.size) + this.width + length/2;

}
Beam.prototype.outOfRange = function(width,height){
    if(this.x < 0 || this.y < 0 || this.x > width + length || this.y > height + width){
        return true;
    }
    return false;
}

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
}