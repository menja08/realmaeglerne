// defines schema and model
var mongoose = require('mongoose');

let uriCloud = process.env.MONGODB_URI;
let uriLocal = "mongodb://localhost:27017/realmaeglerne";
mongoose.connect(uriCloud || uriLocal, {useNewUrlParser:true, useUnifiedTopology: true }, (err) => {
    if (err) {
	console.log("Encountered an error: " + err);
    } else {
	console.log("Successfully connected!");
    }
});

var Schema = mongoose.Schema;

var houseSchema = new Schema({
    billed1:String,
    billed2:String,
    billed3:String,
    vej:String,
    postnummer:Number,
    by:String,
    sagsnummer:Number,
    boligtype:String,
    boligareal:Number,
    grundareal:Number,
    bygget:Number,
    antalrum:Number,
    etager:Number,
    energimaerke:String,
    kontantpris:Number,
    udbetaling:Number,
    brutto:Number,
    netto:Number,
    ejerudgift:Number,
    billedperson:String,
    fornavn:String,
    efternavn:String,
    emailperson:String,
    telefonperson:Number,
    afdeling:String,
    vejnavn:String,
    postnummerafdeling:Number,
    byafdeling:String,
    emailafdeling:String,
    telefonafdeling:String,
    simple:String,
    detailed:String
}, {collation : {locale : "en", strength : 1}});

module.exports = mongoose.model("House", houseSchema);
