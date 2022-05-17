let myImage = document.querySelector('img');
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

let menu = document.getElementsByClassName("mobileMenu--text");
menu = menu[0];

let navigation = document.getElementsByClassName("navigation");
navigation = navigation[0];
myHeading.textContent = 'test';

myImage.onclick = function () {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === '../images/landscape.jpeg') {
        myImage.setAttribute('src', '../images/test.png');
    } else {
        myImage.setAttribute('src', '../images/landscape.jpeg');
    }
}

function setUserName() {
    let myName = prompt('Please enter your name.');
    localStorage.setItem('name', myName);
    if (!myName) {
        setUserName();
    }
    else {
        myHeading.textContent = 'Hello there, ' + myName;
    }
}

if (!localStorage.getItem('name')) {
    setUserName();
}
else {
    let myName = localStorage.getItem('name');
    myHeading.textContent = 'Hello there, ' + myName;
}

myButton.onclick = function () {
    setUserName()
}

menu.onclick = function () {
    let navClassName = navigation.getAttribute('class');
    if (navClassName === 'activeMenu') {
        navigation
        navigation.setAttribute('class', 'navigation');
    }
    else {


        navigation.setAttribute('class', 'activeMenu');
    }
}
