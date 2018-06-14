'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {
	registerUser: function(mobilenumber,emailid,OTP, callback) {
		var query = {
			sql: 'call registerUser(?,?,?);',
			values: [mobilenumber,emailid,OTP]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	updateUserProfile: function(userid,unm,mobilenumber,emailid,gender,dob,password, callback) {
		var query = {
			sql: 'call updateUser(?,?,?,?,?,?,?);',
			values: [userid,unm,mobilenumber,emailid,gender,dob,password]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	loginUser: function(mobilenumber,emailid,password, callback) {
		var query = {
			sql: 'call loginuser(?,?,?);',
			values: [mobilenumber,emailid,password]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	updateUserExperties: function(userid,categories,subcategories, callback) {
		var query = {
			sql: 'call update_user_experties(?,?,?);',
			values: [userid,categories,subcategories]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	checkUser: function(userid,mobilenumber,emailid, callback) {
		var query = {
			sql: 'call checkuserexist(?,?,?);',
			values: [userid,mobilenumber,emailid]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	generateOTPForNewPassword: function(userid,otp, callback) {
		var query = {
			sql: 'call generateotpfornewpasswrod(?,?);',
			values: [userid,otp]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	updatePwd: function(userid,pwd, callback) {
		var query = {
			sql: 'call updatepassword(?,?);',
			values: [userid,pwd]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	}

}