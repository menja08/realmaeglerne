// shows all houses in the database

var allHouses = document.getElementById("allHouses");
url = "http://localhost:3000/showAllHouses";

$.getJSON(url, (houses, status) => {
    addHouse(houses, allHouses);
});

// add house
function addHouse(houses, allHouses) {
    var lengthOfHousesArray = houses.length;

    for(i=0; i < lengthOfHousesArray; i++) {

	// create boxDiv for each house
	var boxDiv = document.createElement("div");
	boxDiv.style.border = "1px solid red";

	// attach image to boxDiv
	var imageName = houses[i].billed1;
	var image = document.createElement("img");
	var imagePath = "../files/images/";
	image.src = imagePath + imageName;

	// image anchor tag
	var anchorTag = document.createElement("a");
	anchorTag.append(image);
	anchorTag.href = "/" + imageName; // correct this link, GET
	boxDiv.append(anchorTag);
	//boxDiv.append(image);

	// create div for house properties eg pris, sagsnummer
	var houseProperties = document.createElement("div");
	houseProperties.style.border = "1px solid green";
	var vejDiv = document.createElement("div");
	vejDiv.append(houses[i].vej);
	houseProperties.append(vejDiv);

	// energimærke
	var energimaerke = document.createElement("div");
	energimaerke.append(houses[i].energimaerke);
	houseProperties.append(energimaerke);

	// postnummer
	var postnummer = document.createElement("div");
	postnummer.append(houses[i].postnummer);
	houseProperties.append(postnummer);

	// byen
	var byen = document.createElement("div");
	byen.append(houses[i].by);
	houseProperties.append(byen);

	// boligtype
	var boligtype = document.createElement("div");
	boligtype.append(houses[i].boligtype);
	houseProperties.append(boligtype);

	// hr
	var hrTag = document.createElement("hr");
	houseProperties.append(hrTag);

	// ejerudgift div
	var ejerudgiftDiv = document.createElement("div");
	ejerudgiftDiv.innerHTML = "Ejerudgift";
	houseProperties.append(ejerudgiftDiv);

	// ejerudgift pris
	var ejerudgiftPris = document.createElement("div");
	ejerudgiftPris.append("kr. " + houses[i].ejerudgift);
	houseProperties.append(ejerudgiftPris);

	// pris
	var kontantPris = document.createElement("div");
	kontantPris.append("kr. " + houses[i].kontantpris);
	houseProperties.append(kontantPris);
	
	boxDiv.append(houseProperties);

	// attach boxDiv to allHouses DOM id
	allHouses.append(boxDiv);	
    }
}
