'use strict';

module.exports = {
	generateRandomString: function(Length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < Length; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
	},
	generateRandomNumber: function(Length) {
		var number = "";
    var possible = "0123456789";
    for( var i=0; i < Length; i++ ) {
      number += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return number;
	}
}