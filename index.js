var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));
//app.use("/js", express.static("/files/js"));
app.use("/", (req, res) => {
    res.redirect("/files/home.html");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
