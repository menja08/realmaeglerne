// home js here
console.log("home.js");

var firstButton = document.getElementById("firstButton");
firstButton.addEventListener("click", dropdown1);

var boligtype = document.getElementById("boligtype");

function dropdown1() {
    firstButton.style.backgroundColor = "orange";
    boligtype.style.display = "flex";
}
