(function() {

	angular.module('myApp',["angularMoment"])
	.factory('DataSource', ['$http',function($http){
		var resource;
		var url2 =  (window.location.pathname === '/') ? window.location.href + "feeds" : window.location.href + "/feeds";
	  return {
	    getHttp: function(url,type,name,callback,featured){
	    	resource = url2 + '?url=' + url + "&protocol=http";
	      $http.get(
	          resource,
	          {transformResponse:function(data) {
	            // convert the data to JSON and provide
	            // it to the success function below            	
              var x2js = new X2JS();              
              var json = x2js.xml_str2json(data);
              return json;
            },
            headers: {"Content-Type":undefined}
	        }
	      )
	      .then(successCallback,errorCallback)
	      

	      function errorCallback(err) {
	      	console.log(err)
	      }

	      function successCallback(data) {
	      	//console.log(data)
	      	callback(type,name,data,featured)
	      }
	    },

	     getHttps: function(url,type,name,callback,featured){
	      resource = url2 + '?url=' + url + "&protocol=https";	    	
	      $http.get(
	          resource,
	          {transformResponse:function(data) {
	            // convert the data to JSON and provide
	            // it to the success function below            	
              var x2js = new X2JS();              
              var json = x2js.xml_str2json(data);
              return json;
            },
            headers: {
            	"Content-Type":undefined,
            }
	        }
	      )
	      .then(successCallback,errorCallback)
	      

	      function errorCallback(err) {
	      	console.log(err)
	      }

	      function successCallback(data) {
	      	//console.log(data)
	      	callback(type,name,data,featured)
	      }
	    },
	    outRequets: function(url,type,name,callback,featured){
	      //resource = url2 + '?url=' + url + "&protocol=https";	    	
	      $http.get(
	          url,
	          {transformResponse:function(data) {
	            // convert the data to JSON and provide
	            // it to the success function below            	
              var x2js = new X2JS();              
              var json = x2js.xml_str2json(data);
              return json;
            },
            headers: {
            	"Content-Type":undefined,
            }
	        }
	      )
	      .then(successCallback,errorCallback)
	      

	      function errorCallback(err) {
	      	console.log(err)
	      }

	      function successCallback(data) {
	      	//console.log(data)
	      	callback(type,name,data,featured)
	      }
	    }

	  }

	   function genHash() {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567899966600555777222";

	      for( var i=0; i < 12; i++ )
	          text += possible.charAt(Math.floor(Math.random() * possible.length));
	      return text;
	  }
	}])
	.factory("localManager",["$window",function($window){
	  return {
	    setValue: function(key, value) {
	      $window.localStorage.setItem(key, JSON.stringify(value));
	    },
	    getValue: function(key) {       
	      return JSON.parse($window.localStorage.getItem(key)); 
	    },
	    removeItem: function(key) {
	      $window.localStorage.removeItem(key);
	    }
	  };
	}])
	.factory('feedsFactory',[function(){
		var feeds = {}
		feeds.sahara = [
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/latest/feed",
			 type: "latest news",
			 protocol: "http"
			},			
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/politics/feed",
			 type: "politics",
			 protocol: "http"
			},
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/business/feed",
			 type: "business",
			 protocol: "http"
			},
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/sports/feed",
			 type: "sports",
			 protocol: "http"
			},
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/entertainment/feed",
			 type: "entertainment",
			 protocol: "https"
			},
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/lifestyle/feed",
			 type: "lifestyle",
			 protocol: "http"
			},
			{
			 name: 'Sahara Reporters',
			 url : "http://saharareporters.com/feeds/technology/feed",
			 type: "technology",
			 protocol: "http"
			}
			/*
			{
			 url : "http://saharareporters.com/feeds/reports/feed",
			 type: "reports"
			},		
			{
			 url : "http://saharareporters.com/feeds/opinion/feed",
			 type: "opinion"
			}*/
		];

		feeds.dailyTrust = [
			{
				name: "Daily Trust",
				url: "https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=1",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "Daily Trust",
				url: "https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=2",
				type: "news",
				protocol: "https"
			},
			{
				name: "Daily Trust",
				url: "https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=4",
				type: "politics",
				protocol: "https"
			},
			{
				name: "Daily Trust",
				url: "https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=5",
				type: "sports",
				protocol: "https"
			},
			{
				name: "Daily Trust",
				url: "https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=3",
				type: "business",
				protocol: "https"
			}
		]

		feeds.nigerianVoice = [
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=1&group_id=1",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=1&group_id=5",
				type: "politics",
				protocol: "https"
			},
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=1&group_id=6",
				type: "business",
				protocol: "https"
			},
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=2",
				type: "sports",
				protocol: "https"
			},
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=4",
				type: "entertainment",
				protocol: "https"
			},
			{
				name: "The Nigerian Voice",
				url: "https://rss.thenigerianvoice.com/news.xml?cat_id=5",
				type: "lifestyle",
				protocol: "https"
			},
		]

		feeds.vanguard = [
			{
				name: "vanguard",
				url: "https://www.vanguardngr.com/category/national-news/feed",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "vanguard",
				url: "https://www.vanguardngr.com/category/finance/feed",
				type: "business",
				protocol: "https"
			},
			{
				name: "vanguard",
				url: "https://www.vanguardngr.com/category/technology/feed",
				type: "technology",
				protocol: "https"
			}
		]

		feeds.naij = [
			{
				name: "naija.ng",
				url: "https://www.naija.ng/rss/all.rss",
				type: "latest news",
				protocol: "https"
			}

		]

		feeds.guardian = [
			{
				name: "guardian",
				url: "https://guardian.ng/category/news/feed/",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "The Guardian",
				url: "http://guardian.ng/category/business/feed/",
				type: "business",
				protocol: "http"
			},
			{
				name: "The Guardian",
				url: "http://guardian.ng/category/politic/feed/",
				type: "politics",
				protocol: "http"
			},
			{
				name: "The Guardian",
				url: "https://www.theguardian.com/uk/sport/rss",
				type: "sports",
				protocol: "http"
			},
			{
				name: "The Guardian",
				url: "https://www.theguardian.com/world/rss",
				type: "world",
				protocol: "http"
			}
		]

		feeds.expressCo = [
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/65/sport",
				type: "sports",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/78/world",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/78/world",
				type: "world",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/21/finance",
				type: "business",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/18/entertainment",
				type: "entertainment",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/139/politics",
				type: "politics",
				protocol: "https"
			},
			{
				name: "Express.co.uk",
				url: "https://www.express.co.uk/posts/rss/59/tech",
				type: "technology",
				protocol: "https"
			}
		]

		feeds.cnn = [
			{
				name: "CNN",
				url: "	http://rss.cnn.com/rss/cnn_latest.rss",
				type: "latest news",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_world.rss",
				type: "world",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_sport.rss",
				type: "sports",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_football.rss",
				type: "football",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_africa.rss",
				type: "africa",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_technology.rss",
				type: "technology",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/edition_entertainment.rss",
				type: "entertainment",
				protocol: "http"
			},
			{
				name: "CNN",
				url: "http://rss.cnn.com/rss/money_news_international.rss",
				type: "business",
				protocol: "http"
			}

		]

		feeds.aljazeera = [
			{
				name: "aljazeera news",
				url: "https://www.aljazeera.com/xml/rss/all.xml",
				type: "world",
				protocol: "https"
			}
		]

		feeds.ny_times = [
			{
				name: "New York Times",
				url: "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml",
				type: "world",
				protocol: "https"
			}
		]

		feeds.bbc = [
			{
				name: "BBC news",
				url: "http://feeds.bbci.co.uk/news/world/rss.xml",
				type: "world",
				protocol: "http"
			}
		]

		feeds.news24 = [
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/news24/Africa/rss",
				type: "latest news",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/news24/Africa/rss",
				type: "africa",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/news24/World/rss",
				type: "world",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.24.com/articles/sport/featured/topstories/rss",
				type: "sports",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/fin24/news/rss",
				type: "business",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/channel/topstories/rss",
				type: "entertainment",
				protocol: "http"
			},
			{
				name: "news24",
				url: "http://feeds.news24.com/articles/fin24/tech/rss",
				type: "technology",
				protocol: "http"
			}
		]

		feeds.allafrica = [
			{
				name: "allafrica.com",
				url: "https://allafrica.com/tools/headlines/rdf/westafrica/headlines.rdf",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "allafrica.com",
				url: "https://allafrica.com/tools/headlines/rdf/business/headlines.rdf",
				type: "business",
				protocol: "https"
			}
		]

		feeds.punchng = [
			{
				name: "punchng",
				url: "http://punchng.com/feed/",
				type: "latest news",
				protocol: "http"
			}
		
		]

		feeds.thesun = [
			{
				name: "Sun",
				url: "http://sunnewsonline.com/feed/",
				type: "latest news",
				protocol: "http"
			}
		]

		//malaysia sun 
		feeds.sundaydaily = [			
			{
				name: "thesundaily",
				url: "http://www.thesundaily.my/rss/world",
				type: "world",
				protocol: "http"
			},
			{
				name: "thesundaily",
				url: "http://www.thesundaily.my/rss/business",
				type: "business",
				protocol: "http"
			},
			{
				name: "thesundaily",
				url: "http://www.thesundaily.my/rss/sports",
				type: "sports",
				protocol: "http"
			},
			{
				name: "thesundaily",
				url: "http://www.thesundaily.my/rss/lifestyle",
				type: "lifestyle",
				protocol: "http"
			},
			{
				name: "thesundaily",
				url: "http://www.thesundaily.my/rss/tech",
				type: "technology",
				protocol: "http"
			}
		]

		feeds.dailypost = [
			{
				name: "dailypost.ng",
				url: "http://dailypost.ng/feed/",
				type: "latest news",
				protocol: "https"
			}
			
		]

		feeds.independent = [
			{
				name: "daily independent",
				url: "https://independent.ng/feed/",
				type: "latest news",
				protocol: "http"
			}
		]


		feeds.premiumTime = [
			{
				name: "premiumtimesng",
				url: "https://www.premiumtimesng.com/feed",
				type: "latest news",
				protocol: "https"
			}
			
		]

		feeds.todayng = [
			{
				name: "today.ng",
				url: "https://www.today.ng/feed",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.tribune = [
			{
				name: "tribune",
				url: "http://www.tribuneonlineng.com/feed/",
				type: "latest news",
				protocol: "http"
			}
		]
		
		return feeds;

	}])
	.controller("feedsCtlr",["$scope","DataSource","feedsFactory","$filter","localManager","$interval",
		function($scope,DataSource,feedsFactory,$filter,localManager,$interval){	     
   	 
    var path = window.location.pathname;
    var category = path.split('/')



   	$scope.headLines = [];
   	$scope.featured = [];
   	var visitednews = localManager.getValue('visited') || [];
   	$scope.pageType = (category[category.length-1] == 'latest') ? "latest news" :category[category.length-1];

   	if(window.location.pathname == "/"){
    	$scope.pageType = "latest news"
    }

    $scope.feeds = feedsFactory.dailyTrust.concat(feedsFactory.sahara.concat(feedsFactory.nigerianVoice.concat(feedsFactory.vanguard.concat(feedsFactory.naij.concat(feedsFactory.guardian.concat(feedsFactory.cnn.concat(feedsFactory.aljazeera.concat(feedsFactory.ny_times.concat(feedsFactory.bbc.concat(feedsFactory.news24.concat(feedsFactory.allafrica.concat(feedsFactory.punchng.concat(feedsFactory.thesun.concat(feedsFactory.dailypost.concat(feedsFactory.independent.concat(feedsFactory.premiumTime.concat(feedsFactory.sundaydaily.concat(feedsFactory.todayng.concat(feedsFactory.tribune)))))))))))))))))));
    var list = [];
    var elemPos;
    setData = function(type,name,res,featured) { 
    	if(name == "naija.ng")
      	console.log(res);
    	var	newsFeed  = ((res.data.rss) ? res.data.rss.channel.item : res.data.feed.entry) || [];

    	for(var k = 0; k < newsFeed.length; k++){
    		var dataSet = {};    		    		
    		dataSet.title = (name !== 'Daily Trust') ? (newsFeed[k].title == "" || newsFeed[k].title == undefined) ? getDescription(newsFeed[k].description) : (newsFeed[k].title ): (name !== 'naija.ng') ? getTitle(newsFeed[k].link) : getTitle(newsFeed[k].id);
	    	dataSet.type = type;
	    	dataSet.link = (name !== 'naija.ng') ? newsFeed[k].id : getTitle(newsFeed[k].id);
	    	dataSet.pubDate = (name !== 'naija.ng') ? (newsFeed[k].pubDate) ? new Date(newsFeed[k].pubDate) : (new Date(res.data.rss.channel.pubDate)) : new Date(newsFeed[k].published);
	    	dataSet.name = name;
	      //$scope.dataSet[type] = data;

	      if(!$scope.isUpdate) {
		      elemPos = visitednews.map(function(x){return x}).indexOf(dataSet.title);
	      	if(elemPos !== -1) {
	      		dataSet.isVisited = true;
	      	}
		      
		      if(!featured) {
		      	list.push(dataSet);
		    	} else {
		    		$scope.featured.push(dataSet); //news for the side bar that is featured or top stories
		    	}
	    	} else {
	    		//alert($scope.isUpdate)
	    		if($scope.pageType == dataSet.type){
		    		elemPos = $scope.headLines.map(function(x){return x.title}).indexOf(dataSet.title);
		    		if(elemPos === -1) {
		    			dataSet.isNow = true;	    			
		    			$scope.headLines.unshift(dataSet);		    			
		    		} 
	    		} /*else {
	    			elemPos = $scope.featured.map(function(x){return x.title}).indexOf(dataSet.title);
		    		if(elemPos === -1) {
		    			dataSet.isNow = true;	    			
		    			$scope.featured.unshift(dataSet);		    			
		    		} 
	    		}*/
	    	}
    	}
    }
   	
   	$scope.headLines = list;
		var count = $scope.feeds.length;
		$scope.loading = false;
   	function loadFeeds() {
   		$scope.loading = true;
	    $scope.feeds.forEach(function(item){
	    	if(item.type == category[category.length-1]) {
		    	if(item.protocol == 'http') {
		    		DataSource.getHttp(item.url,item.type,item.name,setData);
		    	} else {
		    		DataSource.getHttps(item.url,item.type,item.name,setData);
		    	}
	    	} else if(window.location.pathname == '/' && item.type === "latest news"){
	    		if(item.protocol == 'http') {
		    		DataSource.getHttp(item.url,item.type,item.name,setData);
		    	} else {
		    		DataSource.getHttps(item.url,item.type,item.name,setData);
		    	}
	    	} else if( item.type == "latest news" && category[category.length-1] == 'latest') {
	    		if(item.protocol == 'http') {
		    		DataSource.getHttp(item.url,item.type,item.name,setData);
		    	} else {
		    		DataSource.getHttps(item.url,item.type,item.name,setData);
		    	}
	    	}

	    	if(item.type !== category[category.length-1]) {
	    		if(item.type == 'politics' || item.type == 'business' || item.type == 'sports' || item.type == 'world' || item.type == 'entertainment'){
	    			if(item.protocol == 'http') {
		    			DataSource.getHttp(item.url,item.type,item.name,setData,'isFeatured');
			    	} else {
			    		DataSource.getHttps(item.url,item.type,item.name,setData,'isFeatured');
			    	}
	    		}
	    	}

	    	count--;

	    	if(count <= 0) {
	    		$scope.loading = false;
	    	}

	    });
  	}

  	loadFeeds();

    $scope.visited = function(e,item){
    	if(item.isNow)
    		item.isNow = false;
    	var list = localManager.getValue('visited') || [];    	
    	list.push(item.title);
    	item.isVisited = true;
    	localManager.setValue('visited',list);    	
    }

    function getTitle(title) {
    	var t = title.split('/')
    	var b = t[t.length-1].split(".");
    	var c = b[0].split('-');
    	var str = ""
    	for(var i = 0; i < c.length; i++) {
    		if(i < c.length-1)
    			str += c[i] + " " ;
    	}
    	return str;
    }

    function getDescription(des){
    	var t = des.split('<')
    	if(t) {
    		return t[0];
    	} else {
    		return "";
    	}
    
    }

    $scope.refresh = function() {  
    	$scope.isUpdate = false;  	
    	list.splice(0);
    	loadFeeds();
    }

    $interval(function(){
    	$scope.isUpdate = true;
    },600000) //600000
	
	}])



})()