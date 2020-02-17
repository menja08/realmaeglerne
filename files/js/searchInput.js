// tests whether req.body.name is either "postnummer", "by", "vej", "sagsnummer"
// returns true

exports.isPostNumber = function (inputValue) {

    // regex test
    myRegex = (/^[0-9][0-9][0-9][0-9]$/).test(inputValue);

    if (myRegex) {

	// convert string to int
	var inputValueInt = Number.parseInt(inputValue);

	if (1000 <= inputValueInt && inputValueInt <= 9999) {
	    return true;
	}
    }
}

exports.isSagsnummer = function (inputValue) {

    // regex test
    myRegex = (/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/).test(inputValue);

    if (myRegex) {

	// convert string to int
	// var inputValueInt = Number.parseInt(inputValue);
	return true;
    }
}
