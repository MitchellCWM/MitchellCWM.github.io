// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //telling the program we want to draw here

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function round(n1){
    if(n1 < 0){
        return Math.floor(n1) ===0? -1: Math.floor(n1);
    }
    else{
        return Math.ceil(n1) ===0? 1: Math.ceil(n1);
    }
}
let balls=  [];


class ball{
    constructor(velx,vely,size,color){
        
        this.velx = velx;
        this.vely = vely;
        this.size = size;
        this.color = color;
        this.x = random(this.size + 50,width-(this.size +50));
        this.y = random(this.size+50,height -(this.size +50) );
        while(!noCollisions(this)){
            this.x = random(this.size + 50,width-(this.size +50));
            this.y = random(this.size+50,height -(this.size +50) );
        }
    }
    draw(){
        ctx.beginPath(); //start drawing
        ctx.fillStyle = this.color; //what color
        ctx.arc(this.x,this.y, this.size,0,2 * Math.PI); //what shape and where
        ctx.fill(); //finish the drawing
    }


    update(){
        //update velocities if it needs to bounce
        if((this.x +this.size >= width) || (this.x -this.size < 0)){
            this.velx = -1 * this.velx;
            this.color = randomRGB();
        }
        if((this.y + this.size >= height) || (this.y - this.size < 0)){
            this.vely = -1 * this.vely;
            this.color = randomRGB();
        }
        this.x += this.velx;
        this.y += this.vely;
    }

    isCollision(ball){
        let distanceX = this.x -ball.x;
                let distanceY = this.y - ball.y;
                let distance = Math.pow(distanceX,2) + Math.pow(distanceY,2);
                distance = Math.sqrt(distance);
        return distance < (this.size + ball.size);
    }
    collision(){
        for(const ball of balls){
            if(!(this === ball)){
                if(this.isCollision(ball)){
                    ball.color = this.color = randomRGB();

                    let totalVelX = this.velx + ball.velx;
                    ball.velx = round((ball.velx * -1));
                    this.velx = (totalVelX)/ball.velx;

                    let totalVelY = this.vely + ball.vely;
                    ball.vely = round((ball.vely * -1));
                    this.vely = (totalVelY)/ball.vely;
                    ball.update();
                    this.update();
                }
            }
        }
    }
}

function noCollisions(newBall){
    for (let ball of balls){
        if(newBall.isCollision(ball)){
            return false;
        }
    }
    return true;
}

balls[0] = new ball(-2.5,1.0,100,'blue'); 
balls[1] = new ball(-10,.1,10,'green'); 
balls[2] = new ball(2.5,2.5,50,'yellow'); 
balls[3] = new ball(-5.0,5.0,70,'white'); 
balls[4] = new ball(6.0,3.0,50,'red'); 

function loop(){
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; //fill the canvis to over up the previous circles
    ctx.fillRect(0,0,width,height);

    for(const ball of balls){
        ball.draw();
        ball.update();
        ball.collision();
    }

    requestAnimationFrame(loop);
}

loop();
