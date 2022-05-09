let resumeLink = document.getElementById("resumeLink");
let randomLink = document.getElementById('randomLink');
window.onload = () =>{
  
    switch(document.title){
        case('Mitchell\'s Resume'): 
          resumeLink.className = "disabledLink";
         break;
        case('My test page'):
          randomLink.className= "disabledLink";
          break;
    }

}