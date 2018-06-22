
'use strict';

var path = require('path');
var fs = require('fs');
var empin = require('../../model/inserinfo');
//var common = require('../../lib/common');


module.exports = {



    //insert employee into the table
    insertEmp: function(req, res , next){
            if(req.body.fname && req.body.lname && req.body.email && req.body.address){
                var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!(req.body.email.match(emailregx))) {
                    res.status(400);
                    return res.json({error_code:400,error_message:"Email Id should be in proper format"});
                }  
                
            
            empin.insertEmp(req.body.fname,req.body.lname,req.body.email,req.body.address, function(err, result) {
                    if(err) {
                        		next(err);
                        	} else {
                        		return res.json({message:"Employee added successfully"});
                        	}
                });
            }
            else {
                res.status(400);
                return res.json({error_code:400,error_message:"Please provide the values of all required fields"});
            }
            },
            


//Update employee for particular id

            
	updateEmployee: function(req, res, next) {
       // console.log(req.body,"ananamn");
		if(req.body.empid && req.body.fname && req.body.lname && req.body.email && req.body.address ) {
			var email = null;
			var errorflag = false;
			if(!Number(req.body.empid)) {
				res.status(400);
				res.json({error_code:400,error_message:"Employee ID should be number"});
				errorflag=true;
			}else if(req.body.email) {
                var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(req.body.email.match(emailregx)) {
					email = req.body.email;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Mobile number should be in proper format"});
					errorflag = true;
				}
			}  else {
					res.status(400);
					res.json({error_code:400,error_message:"Email Id should be in proper format"});
					errorflag = true;

				}
			}
			if(!errorflag){
				empin.updateEmployee(req.body.empid,req.body.fname,req.body.lname,req.body.email,req.body.address, function(err, result) {
					if(err) {
						next(err);
					} else {
						res.json({message:"Employee Profile updated successfully."});
					}
				});
			}
		 else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
        }
	},
	
	deleteEmployee: function(req, res, next) {
		console.log(req.body,"ananamn");
		 if(req.body.empid) {
			 var errorflag = false;
			 if(!Number(req.body.empid)) {
				 res.status(400);
				 res.json({error_code:400,error_message:"Employee ID should be number"});
				 errorflag=true;
			 } 
			   
			 if(!errorflag){
				 empin.deleteEmployee(req.body.empid, function(err, result) {
					 if(err) {
						 next(err);

					 } else {
						 res.json({message:"Employee Profile updated successfully."});
					 }
				 });
			 }
		  else {
			 res.status(400);
			 res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		 }
		}
	},
	
	
	selectoneEmployee: function(req, res, next){
		empin.selectoneEmployee(req.body.empid, function(err, result) {
			if(err) {
				next(err);

			} else {
				res.json({message:"One Employee Profile selected successfully."});
				// console.log(reg.body);
			}
			//console.log(reg.body);
		});
	},


	//select all employee
	
	selectallEmployee: function(req, res, next){
		empin.selectallEmployee(function(err, result) {
			if(err) {
				next(err);

			} else {
				res.json({message:"All Employee Profile selected successfully."});
				// console.log(reg.body);
			}
			//console.log(reg.body);
		});
	}

	

	 
}
