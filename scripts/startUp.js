window.onload = function () {
    console.log("Hello");
}
let awardsHeader = document.createElement("p");
awardsHeader.setAttribute('class', 'subtitle');
let textText = document.createTextNode("Acedemic Awards");

awardsHeader.appendChild(textText);

let body = document.getElementById('addTextHere');
body.appendChild(awardsHeader);

let awardsList = document.createElement("ul");
awardsList.setAttribute("id", "awardsList");

let listElement = document.createElement("li");
listElement.textContent = "Erwin Jocab Award";
awardsList.appendChild(listElement);


listElement = document.createElement("li");
listElement.textContent = "Computer Science Awards";
awardsList.appendChild(listElement);
body.appendChild(awardsList);