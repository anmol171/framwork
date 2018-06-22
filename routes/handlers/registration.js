'use strict';

var path = require('path');
var fs = require('fs');
var userReg = require('../../model/userRegistration');
var common = require('../../lib/common');
var mailer = require('../../lib/mailer');


module.exports = {
	userRegistration: function(req, res, next) {
		if(req.body.email_id || req.body.mobile_number) {
			var otp = common.generateRandomNumber(4);
			if(req.body.mobile_number) {
				var phonenoregx = /^\d{10}$/;
				if(req.body.mobile_number.match(phonenoregx)) {
					userReg.registerUser(req.body.mobile_number,null,otp, function(err, result) {
						if(err) {
							next(err);
						} else {
							try {
								var userdata = result[0][0];
								var finaldata = {
									user_id : userdata.user_id,
									mobile_number : userdata.user_mobile_number,
									email_id : null,
									otp: userdata.user_pwd,
									is_new_user : userdata.is_new
								};
								res.json({data: finaldata});
							} catch(err) {
								res.status(403);
								res.json({error_code:403,error_message:"Something Went Wrong"});
							}
						}
					});
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Mobile Number should be in proper format"});
				}
			} else if(req.body.email_id) {
				var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(req.body.email_id.match(emailregx)) {
					userReg.registerUser(null,req.body.email_id,otp, function(err, result) {
						if(err) {
							next(err);
						} else {
							try {
								var userdata = result[0][0];
								var finaldata = {
									user_id : userdata.user_id,
									mobile_number : null,
									email_id : userdata.user_email_id,
									otp: userdata.user_pwd,
									is_new_user : userdata.is_new
								};
								if(userdata.is_new == "true") {
									mailer.sendEmail("anujkjena221@gmail.com",req.body.email_id,"FGH OTP","Your FGH OTP is: "+otp,function(err,data){
										if(err){
											console.log(err);
										} else {
											console.log(data);
										}
									});
								}
								res.json({finaldata});
							} catch(err) {
								res.status(403);
								res.json({error_code:403,error_message:"Something Went Wrong"});
							}
						}
					});
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Email Id should be in proper format"});
				}
			}
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Either provide Mobile Number or Email ID"});
		}
	},

	updateProfile: function(req, res, next) {
		if(req.body.user_id && req.body.user_name && req.body.gender && req.body.dob && req.body.password && (req.body.mobile_number || req.body.email_id)) {
			var mobilenumber = null;
			var emailid = null;
			var errorflag = false;
			if(!Number(req.body.user_id)) {
				res.status(400);
				res.json({error_code:400,error_message:"User ID should be number"});
				errorflag=true;
			}else if(req.body.mobile_number) {
				var phonenoregx = /^\d{10}$/;
				if(req.body.mobile_number.match(phonenoregx)) {
					mobilenumber = req.body.mobile_number;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Mobile number should be in proper format"});
					errorflag = true;
				}
			} else if(req.body.email_id) {
				var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(req.body.email_id.match(emailregx)) {
					emailid = req.body.email_id;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Email Id should be in proper format"});
					errorflag = true;

				}
			}
			if(!errorflag){
				userReg.updateUserProfile(req.body.user_id,req.body.user_name,mobilenumber,emailid,req.body.gender,req.body.dob,req.body.password, function(err, result) {
					if(err) {
						next(err);
					} else {
						res.json({message:"User Profile updated successfully."});
					}
				});
			}
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		}
	},

	login: function(req, res, next) {
		if((req.body.mobile_number || req.body.email_id) && req.body.password) {
			var mobilenumber = null;
			var emailid = null;
			var errorflag = false;
			if(req.body.mobile_number) {
				var phonenoregx = /^\d{10}$/;
				if(req.body.mobile_number.match(phonenoregx)) {
					mobilenumber = req.body.mobile_number;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Mobile number should be in proper format"});
					errorflag = true;
				}
			} else if(req.body.email_id) {
				var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(req.body.email_id.match(emailregx)) {
					emailid = req.body.email_id;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Email Id should be in proper format"});
					errorflag = true;
				}
			}
			if(!errorflag) {
				userReg.loginUser(mobilenumber,emailid,req.body.password ,function(err,result) {
					if(err) {
						next(err);
					} else {
						var data = result[0][0];
						if(data && data.error) {
							res.json({status_code:0,error_message:"User is not autorized or Inactive"});
						} else {
							res.json({status_code:1,data});
						}
					}
				});
			}
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		}
	},

	updateExperties: function(req, res, next) {
		if(req.body.user_id && req.body.categories && req.body.sub_categories) {
			if(Number(req.body.user_id)) {
				userReg.updateUserExperties(req.body.user_id,req.body.categories,req.body.sub_categories ,function(err,result) {
					if(err) {
						next(err);
					} else {
						res.json({message:"User Experties Updated successfully"});
					}
				});
			} else {
				res.status(400);
				res.json({error_code:400,error_message:"User ID should be number"});
			}
			/*var pic_path = null;
			if(req.files) {
				var pic = req.files.pic;
			 	var ext = path.extname(pic.name||'').split('.');
			 	var extension = ext[ext.length - 1];
				if(extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png') {
			 		var picpath = "./public/profileimages/"+req.body.user_id+"."+extension.toLowerCase();
				 	pic.mv(picpath, function(err) {
		    			if (err) {
		    				next(err);
		    			} else {
		    				pic_path = "/public/profileimages/" + req.body.user_id+"."+extension.toLowerCase();
		    				req.pic_path = pic_path;
		    				module.exports.updateInformationOfUser(req,res,next);
		    			}
		 			 });
			 	} else {
					res.json({status_code:0,error_message:"Image file should be either JPG or PNG"});
			 	}
			} else {
				req.pic_path = pic_path;
			 	module.exports.updateInformationOfUser(req,res,next);
			}*/
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		}
	},

	generateOTP: function(req, res, next) {
		if(req.body.user_id && (req.body.mobile_number || req.body.email_id)) {
			var mobilenumber = null;
			var emailid = null;
			var errorflag = false;
			if(!Number(req.body.user_id)) {
				res.status(400);
				res.json({error_code:400,error_message:"User ID should be number"});
				errorflag = true;
			}else if(req.body.mobile_number) {
				var phonenoregx = /^\d{10}$/;
				if(req.body.mobile_number.match(phonenoregx)) {
					mobilenumber = req.body.mobile_number;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Mobile number should be in proper format"});
					errorflag = true;
				}
			} else if(req.body.email_id) {
				var emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(req.body.email_id.match(emailregx)) {
					emailid = req.body.email_id;
				} else {
					res.status(400);
					res.json({error_code:400,error_message:"Email Id should be in proper format"});
					errorflag = true;
				}
			}
			if(!errorflag) {
				userReg.checkUser(req.body.user_id,mobilenumber,emailid ,function(err,result) {
					if(err) {
						next(err);
					} else {
						try {
							var status = result[0][0].status;
							if(status == 1) {
								var otp = common.generateRandomNumber(4);
								mailer.sendEmail("abcded@gmail.com",req.body.email_id,"Your OTP","Your FGH OTP is: "+otp,function(err,data){
									if(err){
										console.log(err);
									} else {
										console.log(data);
									}
								});
								userReg.generateOTPForNewPassword(req.body.user_id,otp ,function(err,result) {
									if(err){
										next(err);
									} else {
										res.json({status_code:1,data:{user_id:req.body.user_id,opt:otp}});
									}
								});
							} else {
								res.json({status_code:0,error_message:"User is not exist"});
							}
						} catch(err) {
							res.status(403);
							res.json({error_code:403,error_message:"Something went Wrong"});
						}
					}
				});
			}
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		}
	},

	updatePassword: function(req, res, next) {
		if(req.body.user_id && req.body.password) {
			if(Number(req.body.user_id)) {
				userReg.updatePwd(req.body.user_id,req.body.password ,function(err,result) {
					if(err){
						next(err);
					} else {
						res.json({message:"Password updated successfully."});
					}
				});
			} else {
				res.status(400);
				res.json({error_code:400,error_message:"User ID should be number"});
			}
		} else {
			res.status(400);
			res.json({error_code:400,error_message:"Please provide the values of all required fields"});
		}
	}

}
