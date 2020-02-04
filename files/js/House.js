// defines schema and model slide 512
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/realmaeglerne", {useNewUrlParser:true});// { useUnifiedTopology: true });

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
});

module.exports = mongoose.model("House", houseSchema);
/**
simple:String,
    detailed:String
*/
