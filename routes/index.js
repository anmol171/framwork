'use strict';

var reg = require('./handlers/registration');
var ert = require('./handlers/empinfo');

module.exports = function(app) {
	app.get('/',function(req, res, next){
		res.json({status:'working'});
	});
	app.post('/v1/registration', reg.userRegistration);
	app.post('/v1/updateprofile', reg.updateProfile);
	app.post('/v1/login', reg.login);
	app.post('/v1/generateotpfornewpassword', reg.generateOTP);
	app.post('/v1/updatepassword', reg.updatePassword);
	app.post('/v1/insertEmp', ert.insertEmp);
	app.post('/v1/updateEmployee', ert.updateEmployee);
	app.post('/v1/deleteEmployee', ert.deleteEmployee);
	app.post('/v1/selectoneEmployee', ert.selectoneEmployee);

	app.post('/v1/selectallEmployee', ert.selectallEmployee);

	//app.all('*', auth.checkauterization, render.redirect);
}
