var express = require('express');
var app = express();

app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.redirect("/files/home.html");
});

app.use("/home", (req, res) => {
    res.redirect("/files/home.html");
});

app.use(express.static("files"));

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
	    //console.log(house);
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

var searchInput = require("./files/js/searchInput.js");
app.use("/search", (req, res) => {
    var query = {};
    console.log("query = " + query);
    console.log("req.body = " + Object.entries(req.body));

    // energimaerke
    if (req.body.energimaerke) {
	query.energimaerke = req.body.energimaerke;
	console.log("added energimaerke to query = " + Object.entries(query));
    }
    
    // rums
    if (req.body.minNumber && req.body.maxNumber) {
	query.antalrum = {
	    $gte : req.body.minNumber,
	    $lte : req.body.maxNumber
	}
	console.log("added rums to query = " + Object.entries(query.antalrum));
    }

    // grundareal
    if (req.body.minGrund && req.body.maxGrund) {
	query.grundareal = {
	    $gte : req.body.minGrund,
	    $lte : req.body.maxGrund
	}
	console.log("added grundareal to query = " + Object.entries(query.grundareal));
    }

    // boligareal
    if (req.body.minBolig && req.body.maxBolig) {
	query.boligareal = {
	    $gte : req.body.minBolig,
	    $lte : req.body.maxBolig
	}
	console.log("added boligareal to query = " + Object.entries(query.boligareal));
    }

    // ejerudgift
    if (req.body.minUdgift && req.body.maxUdgift) {
	query.ejerudgift = {
	    $gte : req.body.minUdgift,
	    $lte : req.body.maxUdgift
	}
	console.log("added ejerudgift to query = " + Object.entries(query.ejerudgift));
    }

    // pris
    if (req.body.minPris && req.body.maxPris) {
	query.kontantpris = {
	    $gte : req.body.minPris,
	    $lte : req.body.maxPris
	}
	console.log("added kontantpris to query = " + Object.entries(query.kontantpris));
    }

    // boligtyptype array
	    if (req.body.propertytype) {
		console.log("req.body.propertytype = " + req.body.propertytype);
		query.boligtype = {
		    $in : req.body.propertytype
		}
		console.log("added boligtype to query = " + Object.entries(query.boligtype));
	    }
    console.log("current query = " + Object.entries(query));
    // loop through object
    for (const property in query) {
	//console.log(property + ": " + query[property]);
	console.log(`${property} : ${query[property]}`);
    }

    // case 1: empty input field
    if (req.body.search === undefined) {
	House.find((err, houses) => {
	    if (err) {
		console.log("Error " + err);
	    } else {
		res.json(houses);
	    }
	});
    } else {
	// is req.body.search a "postnummer", "by", "vej" or "sagsnummer"

	// console.log("req.body.search2 = " + req.body.search);
	// console.log("typeOf req.body.search = " + typeof req.body.search);

	// check for illegal input
	if ((/[^æøåa-z0-9\s]/i).test(req.body.search)) {
	    res.send("Illegal input");
	    res.end();
	}
	
	if (searchInput.isPostNumber(req.body.search)) {
	    query.postnummer = Number.parseInt(req.body.search);
	    console.log("query.postnummer key/values = " + Object.entries(query));	    
	    House.find(query, (err, houses) => {
		if (err) {
		    console.log("Err " + err);
		} else {
		    //console.log("houses = " + houses);
		    res.json(houses);
		}
	    });
	    // sagsnummer
	} else if (searchInput.isSagsnummer(req.body.search)) {
	    query.sagsnummer = Number.parseInt(req.body.search);
	    console.log("query.sagsnummer key/values = " + Object.entries(query));

	    // add other properties to query if available
	    House.find(query, (err, houses) => {
		if (err) {
		    console.log("Err " + err);
		} else {
		    // if (houses.length > 0) {}
		    res.json(houses);
		}
	    });
	} else {
	    // assume req.body.search is either "by" or "vej"
	    query.by = req.body.search;
	    //query.by = {$match : req.body.search}
	    console.log("query.by key/values = " + Object.entries(query));
	    // find out why House.find(query); doesn't work
	    // {by: "Aalborg SØ"}/ {by:req.body.search} {by:/aalborg sø/i}
	    // var value = req.body.search;
	    // use {collation} and $regex
	    House.find(query, (err, houses) => {////
		if (err) {
		    console.log("Err " + err);
		} else {
		    // before res.json(), check if houses is empty or undefined
		    // console.log("houses = " + houses[0]);
		    console.log("houses.length = " + houses.length);
		    if (houses.length > 0) {
			res.json(houses);
		    } else {
			// either "by" does not exist or input value is "vej"
			console.log("query before delete = " + Object.entries(query));
			delete query.by;
			console.log("query after delete = " + Object.entries(query));
			query.vej = req.body.search;
			console.log("query.vej = " + Object.entries(query));
			House.find(query, (err, houses) => {
			    if (err) {
				console.log("Err: " + err);
			    } else {
				if (houses.length > 0) {
				    res.json(houses);//???????
				} else {
				    res.send("There is no house with the information " + req.body.search);
				    res.end();
				}
			    }
			});
			
		    }
		}///////////
	    });
	    //res.json({});
	}
    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
