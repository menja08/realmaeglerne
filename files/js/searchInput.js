// tests whether req.body.name is either "postnummer", "by", "vej", "sagsnummer"
// returns true

exports.isPostNumber = function (inputValue) {

    var isNumber = Number.isInteger(inputValue);

    if (isNumber) {
	if (1000 <= inputValue && inputValue <= 9999) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
