let buttons = document.querySelectorAll('button');
let firstStart = buttons[0];
let secondStart = buttons[1];
let thirdStart = buttons[2];
let circles = document.querySelectorAll('circle');


let container = document.getElementsByClassName('container')[0];
let end = container.clientWidth;


function getCirclePosition(element){
    let x = element.getAttribute('cx');
    x = x.replace(/\D/g,"");
    return x;
}

function setCirclePosition(element, size){
    size = size + "px";
    element.setAttribute('cx',size);
}

function increasePositon(element, percent){
    let newPos= getCirclePosition(element);
    newPos = Math.ceil(newPos * (1+ percent/100));
    setCirclePosition(element,newPos);
}

async function startRace(button, element,percent){
    if(button.getAttribute('class') === 'start--disabled'){
        return;
    }
    button.setAttribute('class', 'start--disabled');
    let x = getCirclePosition(element);

    while(x <end){
        let movePromise =  await new Promise(function(resolve, reject){
            window.setTimeout(() =>{
                increasePositon(element,percent);
                resolve();
            },50);
        });
        x = getCirclePosition(element);
    }
    setCirclePosition(element,50);

    button.setAttribute('class', 'start--enabled');
}

firstStart.onclick = function(){
    console.log(circles);
    startRace(this,circles[0],1);
}

secondStart.onclick = function(){
    startRace(this,circles[1],2);
}

thirdStart.onclick = function(){
    startRace(this,circles[2],4);
}