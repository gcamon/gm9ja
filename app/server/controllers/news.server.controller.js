"use strict";

var request = require('request');
var path = require("path");

var http = require("http");
//var X2JS = require("x2js");

var uuid = require("uuid");
var url;
var feedPath;


exports.seofeeds = function(req,res){
	var page = (req.params.page) ? (req.params.page + ".html") : null;
	if(page) {
		res.sendFile(path.join(__dirname + "/snapshots/" + page));
	} else {
		res.sendFile(path.join(__dirname + "/snapshots/" + "latest.html"));
	}

}


exports.read = function(req,res){
	var model = req.model;
	res.render('index');
	
	

	var sendResponse = function(feeds,data){
		if(feeds.length == data.length)
		res.render('index',{feed:feeds});
		console.log(req.feeds.length, "=================")
	}
	
}


exports.readShared = function(req,res){
 	res.render('index');
}

exports.saveShared = function(req,res){
	console.log(req.body)
	var model = req.model;

	var shared = new model.share(req.body);
	shared.save(function(err,info){
		if(err){
			console.log(err)
			res.send({error: "not saved, error occured."})
		} else {
			res.json({status: 'success'});
		}
		console.log("shared headlines saved!");
	})
	
}


exports.getSavedShared = function(req,res){
	var model = req.model;
 	model.share.findOne({id:req.query.id},function(err,data){
 		console.log(data)
 		if(err) throw err;
 		if(data) {
 			res.json(data);
 		} else {
 			res.end("Oops! https://goodmorning9ja.com could not find the shared headlines you requested")
 		}
 	})
 	//res.render('index',{shared: []});
}



exports.feeds = function(req,resp){
	var feedPath = "/";
	if(req.query.url) {
		url = req.query.url.split("/");
		for(var i = 3; i < url.length; i++){
			if(i < url.length - 1) {
				feedPath += url[i] + "/";
			} else {
				feedPath += url[i];
			}
		}
	}

	var options = {
	  host: url[2] || "",
	  path: feedPath || ""
	};



	if(req.query.protocol === "https") {
		request(req.query.url, function (error, response, body) {
		  resp.send(body);
		});

	} else {
		var req = http.get(options, function(res) {
	  //console.log('STATUS: ' + res.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(res.headers));

	  // Buffer the body entirely for processing as a whole.
	  var bodyChunks = [];
	  res.on('data', function(chunk) {
	    // You can process streamed parts here...
	    bodyChunks.push(chunk);
	  }).on('end', function() {
	    var body = Buffer.concat(bodyChunks);
	    //console.log('BODY: ' + body);
	    resp.send(body)
	    // ...and/or process the entire body here.
	  })
		});

		req.on('error', function(e) {
		  //console.log('ERROR: ' + e.message);
		});
	}
}


