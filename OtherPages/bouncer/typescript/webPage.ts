let buttonContainer = document.querySelector('#wasdContainer');
let menuContainer:HTMLElement = document.querySelector('.menuContainer');

let aBtn: HTMLButtonElement = document.querySelector('#a');
let wBtn: HTMLButtonElement = document.querySelector('#w');
let sBtn: HTMLButtonElement = document.querySelector('#s');
let dBtn: HTMLButtonElement = document.querySelector('#d');

window.addEventListener('load', buttonAnimation);
let buttonLocation: string = 'w';
let animationFinished = false;
let isTheAnitmationAlreadyCanceled = false;
async function buttonAnimation() {
    animationFinished = false;



    let nextButtonLocation = buttonLocation;

    let tempButton: HTMLButtonElement;
    switch (buttonLocation) {
        case 'w': tempButton = wBtn; nextButtonLocation = 'd'; break;
        case 'a': tempButton = aBtn; nextButtonLocation = 'w'; break;
        case 's': tempButton = sBtn; nextButtonLocation = 'a'; break;
        case 'd': tempButton = dBtn; nextButtonLocation = 's'; break;
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

function activateButton(elementIn:HTMLButtonElement) {
    let currentClass = elementIn.getAttribute('class');
    if (currentClass === 'keyBoardButton' && buttonLocation != 'z') {
        elementIn.setAttribute('class', 'keyBoardButton--active');
    }
}

function resetButton(elementIn: HTMLButtonElement) {
    if (elementIn.getAttribute('class') == 'keyBoardButton--active' && buttonLocation !='z') {
        elementIn.setAttribute('class', 'keyBoardButton');
    }
}

window.addEventListener('keydown',function(e:KeyboardEvent){
    isTheAnitmationAlreadyCanceled = true;
    let keyDown = e.key;
    let button:HTMLButtonElement = this.document.querySelector(`#${keyDown}`);
    if(button){
        cancelButtonAnimation();
        button.setAttribute('class', 'keyBoardButton--active');      
    }
});

window.addEventListener('keyup',function(e:KeyboardEvent){
    isTheAnitmationAlreadyCanceled = false;
    let keyUp = e.key;
    let button:HTMLButtonElement = this.document.querySelector(`#${keyUp}`);
    if(button){
        activateButtonAnimation();
        resetButton(button);
    }
});


function cancelButtonAnimation(){
    if (buttonLocation != 'z') {
        let buttonElement: HTMLButtonElement = document.querySelector(`#${buttonLocation}`);
        resetButton(buttonElement);
    }
    buttonLocation = 'z';
}

function activateButtonAnimation(){
    buttonLocation = 'w';
    if (animationFinished && !isTheAnitmationAlreadyCanceled) {
        buttonAnimation();
    }
}



let startButton = document.querySelector('#startButton');

startButton.addEventListener('click',function(e){
    menuContainer.remove();
    load();
});

function end(){
    let canvasContainer = document.querySelector('.canvasContainer');
    let canvas = document.querySelector('canvas');
    canvas.remove();
    let scoreHeader = document.querySelector('.highScoreHeader');
    scoreHeader.remove();
    highScoreMenu();
}


function updateScore(numberIn){
    let scoreString = convertNumberToString(numberIn,10);
    let scoreHeader = document.querySelector('.highScoreHeader');
    scoreHeader.textContent = scoreString;
}
function convertNumberToString(numberIn, digits){
    let numberString = numberIn.toString();
    let tempString = '';
    for(let i = numberString.length; i < digits; i++){
        tempString += '0';
    }
    tempString += numberString;
    return tempString;
}

function goHome(){
    let scoreMenu = document.querySelector('.scoreMenu');
    scoreMenu.remove();
    let canvasContainer = document.querySelector('.canvasContainer');
    canvasContainer.appendChild(menuContainer);
    enableSpaceBackground();
}

function enableSpaceBackground(){
    let backgroundImage:HTMLImageElement = document.querySelector('#menuBackground');
    backgroundImage.style.visibility = 'visible';
}