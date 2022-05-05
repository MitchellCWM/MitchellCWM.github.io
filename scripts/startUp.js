
    let awardsHeader = document.createElement("p");
    awardsHeader.setAttribute('class', 'header');
    let textText = document.createTextNode("Acedemic Awards");

    awardsHeader.appendChild(textText);

    let body = document.getElementById('addTextHere');
    body.appendChild(awardsHeader);

    let awardsList = document.createElement("ul");
    awardsList.setAttribute("id", "awardsList");

    let listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode("Erwin Jocab Award"));
    awardsList.appendChild(listElement);


    listElement = document.createElement("li");
    listElement.appendChild(document.createTextNode("Computer Science Awards"));
    awardsList.appendChild(listElement);
    body.appendChild(awardsList);



