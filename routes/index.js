'use strict';

var reg = require('./handlers/registration');


module.exports = function(app) {
	app.get('/',function(req, res, next){
		res.json({status:'working'});
	});
	app.post('/v1/registration', reg.userRegistration);
	app.post('/v1/updateprofile', reg.updateProfile);
	app.post('/v1/login', reg.login);
	app.post('/v1/generateotpfornewpassword', reg.generateOTP);
	app.post('/v1/updatepassword', reg.updatePassword);
	//app.all('*', auth.checkauterization, render.redirect);
}
