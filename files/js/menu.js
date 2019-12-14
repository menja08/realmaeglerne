/* menu inside the navigation */

console.log(22);
var menu = document.getElementById("menu");
menu.addEventListener("click", showMenu);
var clicked = false;
function showMenu() {
    clicked = !clicked;
    if(clicked) {
	console.log(clicked)
	menu.style.backgroundColor = "red";
    }
    else {}
}

//showMenu();
