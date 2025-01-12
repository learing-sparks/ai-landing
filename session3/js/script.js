console.log('script.js loaded');
var helloWelcome = document.getElementById('helloWelcome') ;
console.log("helloWelcome",helloWelcome);
function funConfirm(){
    var txt = confirm('hello confirm message');
    console.log('txt',txt);
    if (txt) {
        txt = "You pressed OK!";
    } else {
        txt = "You pressed Cancel!";
    }
}

var iheaderpart1= document.querySelector('.headerpart1');
iheaderpart1.innerHTML = 'Hello, Welcome to the session3 of JS training';

var iheaderpart1= document.querySelector('#headerpart2');
iheaderpart1.innerHTML = 'Hello, Welcome to the session3 of JS training';
document.getElementsByTagName("div")[0].childNodes[1].addEventListener("click", funConfirm);
// document.getElementsByTagName("form")[0].addEventListener("click", funConfirm);

document.getElementById("name").addEventListener("dblclick", funConfirm);


/*
*/
