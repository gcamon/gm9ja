"use strict";

var request = require('request');

var http = require("http");

var uuid = require("uuid");
var url;


exports.read = function(req,res){
	res.render('index');
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

	

	if(req.query.protocol == "https") {

		request(req.query.url, function (error, response, body) {
		  console.log('error:', error); // Print the error if one occurred
		  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  console.log('body:', body); // Print the HTML for the Google homepage.
		  resp.send(body)
		});

	} else {
		var req = http.get(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));

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
		  console.log('ERROR: ' + e.message);
		});
	}
}