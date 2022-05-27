function highScoreMenu(){

    createScoreMenu();
    enableSpaceBackground();
}

function createScoreMenu(){
    let canvasContainer = document.querySelector('.canvasContainer');
    let scoreMenu = document.createElement('div');
    scoreMenu.setAttribute('class','scoreMenu');

    canvasContainer.appendChild(scoreMenu);
    console.log(canvasContainer);
    
    createScoreMenuScore(scoreMenu);
    createInputMenu(scoreMenu);
    createScoreMenuButton(scoreMenu);
}

function createScoreMenuScore(elementIn:HTMLElement){
    let scoreDisplay = document.createElement('h2');
    scoreDisplay.setAttribute('class', 'scoreMenu--scoreDisplay');
    scoreDisplay.textContent = convertNumberToString(currentScore,10);

    elementIn.appendChild(scoreDisplay);
}

function createInputMenu(elementIn:HTMLElement){
    let nameInput = document.createElement('div');
    let nameField = document.createElement('input');
    let nameLabel = document.createElement('label');

    nameInput.setAttribute('class', 'fancyInput--name');

    nameField.setAttribute('type','text');
    nameField.setAttribute('class','scoreMenu--scoreName');
    nameField.setAttribute('id', 'scoreName');
    nameField.addEventListener('keyup',shrinkText);

    nameLabel.setAttribute('class', 'scoreMenu--label');
    nameLabel.setAttribute('for','scoreName');
    nameLabel.textContent = 'NAME:';

    nameInput.appendChild(nameLabel);
    nameInput.appendChild(nameField);
    elementIn.appendChild(nameInput);
}

function createScoreMenuButton(elementIn:HTMLElement){
    let buttonBar = document.createElement('div');
    buttonBar.setAttribute('class', 'scoreMenu--buttonBar');
    elementIn.appendChild(buttonBar);
    
    let submitButton = document.createElement('button');
    let homeButton = document.createElement('button');
    homeButton.addEventListener('click',goHome);

    submitButton.textContent = 'Submit';
    homeButton.textContent = 'Home';

    submitButton.setAttribute('class', 'scoreMenu--button');
    homeButton.setAttribute('class', 'scoreMenu--button');

    buttonBar.appendChild(submitButton);
    buttonBar.appendChild(homeButton);
}

function shrinkText(e:Event):void{
    let inputElement:HTMLInputElement = document.querySelector('#scoreName');
    let inputContainer = document.querySelector('.fancyInput--name');
    if(inputElement.value != ''){
        inputContainer.setAttribute('type','shrink-text');
    }
    else{
        inputContainer.setAttribute('type','');
    }
}