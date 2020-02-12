var express = require('express');
var app = express();

app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(__dirname));
app.use("/js", express.static("/files/js"));
app.use("/home", (req, res) => {
    console.log("Inside home");
    res.redirect("/files/home.html");
});

var House = require("./files/js/House.js");

// create (CRUD)
app.use("/create", (req, res) => {
    console.log("Inside create");
    console.log(req.body);

    if (req.body.sagsnummer === undefined) {
	res.send("Error !, undefined, No sagsnummer included!");
    } else {
	var newHouse = new House(req.body);

	// if the request body is empty {}
	var houseToBeSaved = Object.values(req.body);

	// check inputs before saving
	if ((houseToBeSaved.includes("")) || (houseToBeSaved.includes(null))  || (houseToBeSaved.includes(undefined))) {
	    res.send("the request included either an empty string or null or undefined!");
	    
	} else {
	    // read from database to avoid duplicates
	    House.find({sagsnummer : req.body.sagsnummer}, (err, house) => {
		if (err) {
		    console.log(err);
		    res.type().status(500);
		    res.send("Err " + err);
		} else if (house.length === 0) {// house not in database
		    newHouse.save((err, house) => {
			if (err) {
			    console.log(err);
			    res.json({});
			} else {
			    // saved successfully
			    res.send("Saved successfully!");
			}
		    });
		} else {
		    res.send("that sagsnummer is already in the database");
		}
	    });
	}
    }
    
});

// read (CRUD)
app.use("/showAllHouses", (req, res) => {
    House.find((err, house) => {
	if (err) {
	    res.type().status(500);
	    res.send("Error " + err);
	} else {
	    console.log(house);
	    res.json(house);
	}
    });
});

// details of a specific house
app.use("/imageId/:imageName", (req, res) => {
    console.log("req.params = " + req.params);
    console.log("req.params.imageName = " + req.params.imageName);
    House.find({billed1:req.params.imageName}, (err, house) => {
	if (err) {
	    res.type().status(500);
	    res.send("Error " + err);
	} else {
	    //res.json(house);
	    var specificHouse = house[0];
	    res.render("specificHouse", {
		billed1 : specificHouse.billed1,
		billed2 : specificHouse.billed2,
		billed3 : specificHouse.billed3,
		sagsnummer : specificHouse.sagsnummer,
		boligtype : specificHouse.boligtype,
		boligareal : specificHouse.boligareal,
		grundareal : specificHouse.grundareal,
		//garage : specificHouse.garage,
		bygget : specificHouse.bygget,
		antalrum : specificHouse.antalrum,
		etager : specificHouse.etager,
		energimaerke : specificHouse.energimaerke,
		kontantpris : specificHouse.kontantpris,
		udbetaling : specificHouse.udbetaling,
		brutto : specificHouse.brutto,
		netto : specificHouse.netto,
		ejerudgift : specificHouse.ejerudgift,
		fornavn : specificHouse.fornavn,
		efternavn : specificHouse.efternavn,
		emailperson : specificHouse.emailperson,
		telefonperson : specificHouse.telefonperson,
		afdeling : specificHouse.afdeling,
		vejnavn : specificHouse.vejnavn,
		postnummerafdeling : specificHouse.postnummerafdeling,
		byafdeling : specificHouse.byafdeling,
		emailafdeling : specificHouse.emailafdeling,
		telefonafdeling : specificHouse.telefonafdeling,
		simple : specificHouse.simple,
		detailed : specificHouse.detailed
		
	    });
	}
    });
    //res.json(req.params.imageName);
    });

/*app.use("/specificHouse.html/:imageName", (req, res) => {
    res.json(req.params.imageName);
});*/

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
