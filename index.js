var express = require('express');
var app = express();

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
    var newHouse = new House(req.body);
    newHouse.save((err, house) => { // house is a json object
	console.log("saved1");
	if (err) {
	    console.log("error!");
	    console.log(err);
	    res.json({});
	} else {
	    console.log("saved2");
	    //res.redirect("/files/home.html");
	    res.json(house);
	}
    });
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

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
