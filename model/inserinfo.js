'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {

	insertEmp: function(fname,lname,email,address, callback){
		var query = {
			sql: 'Insert into emppInfo(fname, lname, email, address) values(?,?,?,?)',
			values: [fname,lname,email,address]
		};
		mysql(query, function(err, result){
			callback(err, result);
		});
    },
    
//update
    updateEmployee: function(empid, fname, lname, email, address, callback) {
		var query = {
			sql: 'call updateEmployee(?,?,?,?,?);',
			values: [empid, fname, lname, email, address]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},



	//delete Employee with particular id

	deleteEmployee: function(empid, callback){
		console.log(empid);	
		var query = {
			
			sql: 'call deleteEmployee(?);',
			values: [empid]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},




	//select one employee

	selectoneEmployee: function(empid, callback){
		console.log(empid);	
		var query = {
			
			sql: 'call selectoneEmployee(?);',
			values: [empid]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	},

	// select all


	selectallEmployee: function(callback){
				var query={
				sql: 'Select all empid,fname,lname,email,address  from emppInfo ',
				//values: [empid,fname,lname,email,address]
			};
			mysql(query, function(err, result) {
				callback(err, result);
			});
		}







}