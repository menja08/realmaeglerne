// home js here
console.log("home.js");

var firstButton = document.getElementById("firstButton");
firstButton.addEventListener("click", dropdown1);

var boligtype = document.getElementById("boligtype");

function dropdown1() {
    firstButton.style.backgroundColor = "orange";
    boligtype.style.display = "flex";
}

var buttonPris = document.getElementById("buttonPris");
buttonPris.addEventListener("click", showPrisInput);

var prisInputDiv = document.getElementById("pris");
var divInput = prisInputDiv.getElementsByTagName("input");
console.log(divInput);

function showPrisInput() {
    buttonPris.style.backgroundColor = "orange";
    divInput[0].style.display = "flex";
    divInput[1].style.display = "flex";
}
