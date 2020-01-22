// shows all houses in the database

var allHouses = document.getElementById("allHouses");
url = "http://localhost:3000/showAllHouses";
allHouses.append(234);

$.getJSON(url, (houses, status) => {
    addHouse(houses, allHouses);
});

// add house
function addHouse(houses, allHouses) {
    var lengthOfHousesArray = houses.length;
    //var image = "";

    for(i=0; i < lengthOfHousesArray; i++) {
	var imageName = houses[i].billed1;
	var image = document.createElement("img");
	var imagePath = "../files/images/";
	//console.log(imagePath);
	//image.src = imagePath + "basicHouse.jpeg";
	image.src = imagePath + imageName;

	// new div for this house
	var newHouse = document.createElement("div");

	// append image to newHouse, append newHouse to DOM
	newHouse.append(image);
	newHouse.append(imageName)

	allHouses.append(newHouse);
	
    }
}
