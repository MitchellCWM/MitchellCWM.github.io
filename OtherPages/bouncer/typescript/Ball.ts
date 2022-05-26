

function Ball(x, y, size, speedx, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedx;
    this.color = color;
}
Ball.prototype = Object.create(Object.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(ctx) {
    this.x = keepInRange(-this.size,width,this.x);
    this.y = keepInRange(-this.size, height, this.y);
    //what happens if it is out of bounds
    ctx.beginPath(); //start drawing
    ctx.fillStyle = this.color; //what color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //what shape and where
    ctx.fill(); //finish the drawing
}



function Player(x,y,size,speedx,speedy,color){
    Ball.call(this,x,y,size,speedx,color);
    this.speedY = speedy;
}

Player.prototype = Object.create(Ball.prototype);
Player.prototype.constructor = Player;

Player.prototype.updatePosition = function(){
    this.x += this.speedX;
    this.y += this.speedY;
}
Player.prototype.updateSpeed = function(keymap:any):void{
    //reduce to stop

    let speedChange = 0.25
    if((keymap.ArrowRight && keyMap.ArrowLeft) || (!keyMap.ArrowRight && !keymap.ArrowLeft)){
        this.speedX  = (this.speedX * (1-speedChange));
    }
    else if(keymap.ArrowRight){
        if(this.speedX <= -1){
            this.speedX = (keepInRange(-10,10,(this.speedX * (1-1.5*speedChange))));
            
        }
        else if(this.speedX >= 0.1){
            this.speedX = keepInRange(-10,10,(this.speedX * (1+speedChange)));
        }
        else{
            this.speedX = 1;
        }
    }

    else{
        if(this.speedX >= 1){
            this.speedX = (keepInRange(-10,10,(this.speedX * (1-1.5*speedChange))));
        }
        else if(this.speedX <= -0.1){
            this.speedX = keepInRange(-10,10,(this.speedX * (1+speedChange)));
        }
        else{
            this.speedX = -1;
        }
    }

    //vertical
    if((keymap.ArrowDown && keyMap.ArrowUp) || (!keyMap.ArrowDown && !keymap.ArrowUp)){
        this.speedY  = (this.speedY * (1-speedChange));
    }
    else if(keymap.ArrowDown){
        if(this.speedY <= -1){
            this.speedY = (keepInRange(-10,10,(this.speedY * (1-speedChange))));
            
        }
        else if(this.speedY >= 0.1){
            this.speedY = keepInRange(-10,10,(this.speedY * (1+speedChange)));
        }
        else{
            this.speedY = 1;
        }
    }

    else{
        if(this.speedY >= 1){
            this.speedY = (keepInRange(-10,10,(this.speedY * (1-speedChange))));
        }
        else if(this.speedY <= -0.1){
            this.speedY = keepInRange(-10,10,(this.speedY * (1+speedChange)));
        }
        else{
            this.speedY = -1;
        }
    }
}



function keepInRange(min:number,max:number, numberIn:number):number{
    if(numberIn > max){
        return max;
    }
    else if(numberIn < min){
        return min;
    }
    return numberIn;
}



function getAngle(x:number,y:number,x2, y2){
    let xDif = x - x2
    let yDif = y - y2


    let opp = Math.abs(yDif);
    let adj = Math.abs(xDif);
    let angle = Math.atan(opp/adj);
    
    if(xDif <0 && yDif < 0){
        angle += Math.PI;
    }
    else if(xDif > 0 && yDif < 0){
        angle = -angle;
    }
    else if(xDif < 0 && yDif > 0){
        angle = -angle + Math.PI;
    }
    else{
    }
    return angle;
}


function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function radToDeg(rad) {
    return rad * 180/Math.PI;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + (min);
}