getProgrammingSkillsBoldEle = function(){
    let temp = document.getElementsByTagName('strong');
    for(let i = 0; i < temp.length; i++){
        if(temp[i].textContent === "Programming Skills: "){
            return temp[i];
        }
    }
    return null;
}

updateHTMLCss = function(newStyle){
    let temp = document.querySelector('html');
    tempStyle = temp.getAttribute('style');
    console.log(tempStyle);
    temp.setAttribute('style', tempStyle + ';\n' + newStyle);
}

setSillyFont = function(){
    updateHTMLCss('font-family: \'Kristi\', cursive');
}

let bakingText = document.getElementById('baking');
let cake = document.getElementById('cakePic');
//cake.style.borderBlock
let programmingSkillsBold = getProgrammingSkillsBoldEle();
let programmingSkillsText = document.getElementById('skillsText');

let myName = document.getElementById('MyName');
let date = document.getElementById('hiddenBackgroundPhoto');

let award = document.getElementById('addTextHere');

bakingText.onclick = () =>{
    cake.setAttribute('style', 'visibility:visible');
    cake.setCss
}
cake.onclick = function(){
    cake.setAttribute('style', 'visibility:hidden');
}

date.onclick = function(){
    updateHTMLCss('background-image: url(\'images/landscape.jpeg\')');
}


programmingSkillsBold.onmouseover = function(){
    programmingSkillsText.textContent = 'Java, C, Racket, JavaScript, Python, MatLab, Selenium, HTML, CSS';
}
programmingSkillsBold.onmouseleave = function(){
    programmingSkillsText.textContent = 'Java, C, Racket, JavaScript, Python, MatLab, Selenium';
}


myName.addEventListener('click', setSillyFont);

award.onclick = function(){
    let newAward = prompt("Add new awards");
    let newListItem = document.createElement("li");
    newListItem.textContent = newAward;

    let awardsList = document.getElementById("awardsList");
    awardsList.appendChild(newListItem);

}