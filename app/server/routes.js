'use strict';

module.exports = function(app) {

	var news = require("./controllers/news.server.controller");
	var admin = require("./controllers/admin.server.controller");
	//var signup = require("../controllers/signup.server.controller");
	//var login = require("../controllers/login.server.controller");

	

	//http get feed
	app.route("/feeds")
	.get(news.feeds);

	app.route("/latest/feeds")
	.get(news.feeds)
	

	app.route("/world/feeds")
	.get(news.feeds);

	app.route("/business/feeds")
	.get(news.feeds);

	app.route("/sports/feeds")
	.get(news.feeds);

	app.route("/technology/feeds")
	.get(news.feeds);

	app.route("/entertainment/feeds")
	.get(news.feeds);

	app.route("/politics/feeds")
	.get(news.feeds);

	app.route("/lifestyle/feeds")
	.get(news.feeds);

	app.route("/football/feeds")
	.get(news.feeds);

	//route for SEO

	app.route("/snapshots/:page")
	.get(news.seofeeds)





	//admin manage news 

	app.route("/gcamon29")
	.get(admin.read)

	app.route("/admin/manage-source")
	.get(admin.readsources)
	.put(admin.updatesource)
	.post(admin.addsources)
	.delete(admin.deletesource)


	//direct
	app.route("/")
	.get(news.read)

	app.route("/latest")
	.get(news.read)

	app.route("/sports")
	.get(news.read)

	app.route("/politics")
	.get(news.read)

	app.route("/business")
	.get(news.read)

	app.route("/lifestyle")
	.get(news.read)

	app.route("/entertainment")
	.get(news.read)

	app.route("/technology")
	.get(news.read)

	app.route("/world")
	.get(news.read)

	app.route("/football")
	.get(news.read)


	app.route("/share/:type/:id/:article")
	.get(news.readShared)

	app.route("/share/save")
	.get(news.getSavedShared)
	.post(news.saveShared)

	//var compras = require('../controllers/compras.server.controller');
	//var comprasPolicy = require('../policies/compras.server.policy');


	// Compras Routes
	/*pp.route('/api/compras').all(comprasPolicy.isAllowed)
		.get(compras.list)
		.put(compras.comprasResumen)
		.post(compras.create);

    app.route('/api/compras/select').all(comprasPolicy.isAllowed)
        .get(compras.select);*/

	
};