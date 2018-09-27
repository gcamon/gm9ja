'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbURL = "mongodb://127.0.0.1:27017/newsDB" //"mongodb://127.0.0.1:27017/medicalmull"; 45.55.204.222

mongoose.connect(dbURL);
mongoose.connection.on("error",function(err){
    console.log(err);
});

var Schema = mongoose.Schema;

module.exports = function() {

	var newsSchema = Schema({
		name: String,
		url : String,
		type: String,
		protocol: String
	},{
		collections: "newsinfos"
	});

	var shareSchema = Schema({
		id: String,
		date: Number,
		arr: Array
	},{
		collections: "shareinfos"
	})

	var models = {};
	models.news = mongoose.model('newsinfos', newsSchema);
	models.share = mongoose.model('shareinfos', shareSchema);
	return models;
}