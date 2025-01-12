console.log('script.js loaded');
var helloWelcome = document.getElementById('helloWelcome') ;
console.log("helloWelcome",helloWelcome);
helloWelcome.innerHTML = 'Hello, Welcome to the session3 of JS training';
function funConfirm(){
    var txt = confirm('hello confirm message');
    console.log('txt',txt);
    if (txt) {
        txt = "You pressed OK!";
    } else {
        txt = "You pressed Cancel!";
    }
}
/*
document.getElementById("demo").innerHTML = "Hello World!";
*/
