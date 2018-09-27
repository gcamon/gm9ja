"use strict";

var request = require('request');

var http = require("http");


var uuid = require("uuid");

exports.read = function(req,res){
 	res.render("admin");
};

exports.readsources = function(req,res){
 	
};

exports.updatesource = function(req,res){
 	
};

exports.deletesource = function(req,res){
 	
};

exports.addsources = function(req,res){
 	console.log(req.body);
 	var model = req.model;
 	var source;
 	var count = 1;
 	req.body.forEach(function(item){
 		source = new model.news(item)
 		source.save(function(err,info){ 			
 			console.log("source saved: " + count );
 			count++;
 		})
 	})

 	res.json({message: "updated"})
};


/*

	.get(admin.readsources)
	.put(admin.updatesource)
	.post(admin.addsources)
*/