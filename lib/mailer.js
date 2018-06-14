'use strict';

var nodemailer = require('nodemailer');
var config = require('../config/config').mailconfig;

var transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.user,
    pass: config.password
  }
});

module.exports = {

	sendEmail: function(sender, receiver, mailsubject, mailmessage, callback) {
		if(!sender && !receiver) {
			var error = new Error('Sender and Receiver field can not left blank');
			return callback(error, null);
		}
		var mailOptions = {
	    from: sender,
	    to: receiver,
	    subject: mailsubject,
	    text: mailmessage,
	  }
	  transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	      callback(error, null);
	    }else{
	      callback(null, 'success');
	    }
	  });
	}

}
