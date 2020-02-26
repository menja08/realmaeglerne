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

// navigation scrollEvent
window.addEventListener("scroll", scroll);
var navigation = document.getElementsByTagName("nav");

function scroll() {
    navigation[0].style.border = "3px solid black";
    
    if (window.scrollY > 0) {
	
	navigation[0].style.width = "20%";
	
    } else {
	navigation[0].style.width = "30%";
    }
    
}



