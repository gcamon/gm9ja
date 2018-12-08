(function() {

	/*angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
  	$location.hashPrefix('!');
	}]);*/

	angular.module('myApp',["angularMoment","angularModalService"])
	.factory('DataSource', ['$http',"$rootScope",function($http,$rootScope){
		var resource;

		
		var link = window.location.href;
		var path = link.split('/');

		//combine path for fetching feeds from back end based on the page in view
		var url2 = (window.location.pathname === '/') ? 
		window.location.href + "feeds" : (path.length <= 4) ? window.location.href + "/feeds" :
		 (path[0] + "//" + path[2] + "/" + path[4]) + "/feeds";

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
				url: "https://www.dailytrust.com.ng/feed",//"https://www.dailytrust.com.ng/rss/feed.aspx?cat_id=1",
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
				name: "guardian",
				url: "http://guardian.ng/category/business/feed/",
				type: "business",
				protocol: "http"
			},
			{
				name: "guardian",
				url: "http://guardian.ng/category/politic/feed/",
				type: "politics",
				protocol: "http"
			},
			{
				name: "guardian",
				url: "https://www.theguardian.com/uk/sport/rss",
				type: "sports",
				protocol: "http"
			},
			{
				name: "guardian",
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
				url: "https://punchng.com/feed/",
				type: "latest news",
				protocol: "https"
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
				protocol: "https"
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
				url: "https://www.tribuneonlineng.com/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.goalcom = [
			{
				name: "goal.com",
				url: "http://www.goal.com/en-us/feeds/news",
				type: "latest news",
				protocol: "http"
			},
			{
				name: "goal.com",
				url: "http://www.goal.com/en-us/feeds/news",
				type: "sports",
				protocol: "http"
			}

		]

		feeds.thisday = [
			{
				name: "this day",
				url: "https://www.thisdaylive.com/index.php/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.thenation = [
			{
				name: "the nation",
				url: "http://thenationonlineng.net/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.leadership = [
			{
				name: "leadership",
				url: "https://leadership.ng/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.dailytimes = [
			{
				name: "daily times",
				url: "https://dailytimes.ng/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.businessday = [
			{
				name: "business day",
				url: "https://www.businessdayonline.com/feed/",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "business day",
				url: "https://www.businessdayonline.com/feed/",
				type: "business",
				protocol: "https"
			}
		]

		feeds.nation = [
			{
				name: "thenation",
				url: "https://www.thenation.com/feed/?post_type=article&subject=business",
				type: "business",
				protocol: "http"
			},
			{
				name: "thenation",
				url: "https://www.thenation.com/feed/?post_type=article&subject=world",
				type: "world",
				protocol: "http"
			}
		]

		feeds.bellanaija = [
			{
				name: "bella naija",
				url: "https://www.bellanaija.com/feed/",
				type: "latest news",
				protocol: "https"
			},
			{
				name: "bella naija",
				url: "https://www.bellanaija.com/feed/",
				type: "entertainment",
				protocol: "https"
			}
		]

		feeds.football = [
			{
				name: "goal.com",
				url: "http://www.goal.com/en/feeds/news?fmt=rss&ICID=HP",
				type: "football",
				protocol: "http"
			},
			{
				name: "101 great goals",
				url: "https://www.101greatgoals.com/feed/",
				type: "football",
				protocol: "https"
			},
			{
				name: "fourfourtwo.com",
				url: "https://www.fourfourtwo.com/rss.xml",
				type: "football",
				protocol: "https"
			},
			{
				name: "90mins.in",
				url: "https://www.90min.com/posts.rss",
				type: "football",
				protocol: "https"
			},
			{
				name: "teamtalk.com",
				url: "https://www.teamtalk.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "soccernews.com",
				url: "http://www.soccernews.com/feed/",
				type: "football",
				protocol: "http"
			},
			{
				name: "footballfancast.com",
				url: "https://www.footballfancast.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "caughtoffside.com",
				url: "https://www.caughtoffside.com/feed/",
				type: "football",
				protocol: "https"
			},
			
			{
				name: "sportslens.com",
				url: "https://sportslens.com/feed/",
				type: "football",
				protocol: "https"
			},
			{
				name: "foottheball.com",
				url: "https://www.foottheball.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "worldsoccer.com",
				url: "https://www.worldsoccer.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "TheFootballDaily.com",
				url: "https://www.youtube.com/feeds/videos.xml?user=TheFootballDaily",
				type: "football",
				protocol: "https"
			},
			{
				name: "marca.com",
				url: "http://e00-marca.uecdn.es/rss/en/index.xml",
				type: "football",
				protocol: "https"
			},
			{
				name: "football365.com",
				url: "https://www.football365.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "manutd.com",
				url: "https://www.manutd.com/Feeds/NewsSecondRSSFeed",
				type: "football",
				protocol: "https"
			},
			{
				name: "calciomercato.com",
				url: "https://www.calciomercato.com/en/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "squawka.com",
				url: "http://www.squawka.com/news/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "thisisanfield.com",
				url: "https://www.thisisanfield.com/feed/",
				type: "football",
				protocol: "https"
			},
			{
				name: "football-italia.net",
				url: "https://www.football-italia.net/rss.xml",
				type: "football",
				protocol: "https"
			},
			{
				name: "arseblog.com",
				url: "https://arseblog.com/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "whoateallthepies.tv",
				url: "http://www.whoateallthepies.tv/feed",
				type: "football",
				protocol: "https"
			},
			{
				name: "talkchelsea.net",
				url: "https://www.talkchelsea.net/feed/",
				type: "football",
				protocol: "https"
			},
			{
				name: "shoot.co.uk",
				url: "https://www.shoot.co.uk/feed/",
				type: "football",
				protocol: "https"
			},
			{
				name: "footballaction.co.uk",
				url: "http://footballaction.co.uk/feed",
				type: "football",
				protocol: "http"
			}


			
		];	

		feeds.theNigerianLawyer = [
			{
				name: "the nigeria lawyer",
				url: "https://thenigerialawyer.com/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		feeds.viewAfrica24 = [
			{
				
				name: "view africa 24",
				url: "https://viewafrica24.com/feed/",
				type: "latest news",
				protocol: "https"
			}
		]

		return feeds;

	}])
	.controller("adminFeedsCtlr",["$scope","feedsFactory","$http",function($scope,feedsFactory,$http){
		 $scope.feeds = [];/*feedsFactory.nigerianVoice.concat(feedsFactory.sahara
	    .concat(feedsFactory.theNigerianLawyer
	    .concat(feedsFactory.vanguard.concat(feedsFactory.naij
	    	.concat(feedsFactory.guardian.concat(feedsFactory.cnn
	    		.concat(feedsFactory.aljazeera.concat(feedsFactory.ny_times
	    			.concat(feedsFactory.bbc.concat(feedsFactory.news24
	    				.concat(feedsFactory.allafrica.concat(feedsFactory.punchng
	    					.concat(feedsFactory.thesun.concat(feedsFactory.dailypost
	    						.concat(feedsFactory.sundaydaily.concat(feedsFactory.premiumTime
	    							.concat(feedsFactory.bellanaija.concat(feedsFactory.todayng
	    								.concat(feedsFactory.tribune.concat(feedsFactory.goalcom
	    									.concat(feedsFactory.thisday.concat(feedsFactory.thenation
	    										.concat(feedsFactory.leadership.concat(feedsFactory.dailytimes
	    											.concat(feedsFactory.businessday.concat(feedsFactory.independent))))))))))))))))))))))))));*/

		$scope.addAll = function() {
			$http({
	      method  : 'POST',
	      url     : "/admin/manage-source",
	      data    : $scope.feeds,
	      headers : {'Content-Type': 'application/json'} 
	      })
	   .then(successCallback,errorCallback)
	      

	    function errorCallback(err) {
      	console.log(err)
      }

      function successCallback(res) {
      	alert(res.data.message)
      }    

		}

		$scope.addFootball = function() {
			$scope.football = feedsFactory.football;
			$http({
	      method  : 'POST',
	      url     : "/admin/manage-source",
	      data    : $scope.football,
	      headers : {'Content-Type': 'application/json'} 
	      })
	   .then(successCallback,errorCallback)
	      

	    function errorCallback(err) {
      	console.log(err)
      }

      function successCallback(res) {
      	alert(res.data.message)
      }    
		}

	}])
	.controller("feedsCtlr",["$scope","DataSource","feedsFactory","$filter","localManager","$interval","$http","$rootScope","ModalService",
		function($scope,DataSource,feedsFactory,$filter,localManager,$interval,$http,$rootScope,ModalService){	     
   	 
    var path = window.location.pathname;
    var category = path.split('/')

    console.log(category);
    
    $scope.isNormal = true;

    $scope.switch = function(){
    	if($scope.isNormal) {
    		$scope.isNormal = false;
    	} else {
    		$scope.isNormal = true;
    	}
    }


   	$scope.headLines = [];
   	$scope.featured = [];
   	var visitednews = localManager.getValue('visited') || [];
   	$scope.pageType = (category[1] == 'latest') ? "latest news" : (category[1] == "share") ? ((category[2] == 'latest') ? "latest news" : category[2] ) : category[1];
   	var filterName = {}
   	$scope.sources = [];
   	var thePage = (category[1] == "share") ? category[2] : category[1];

   	if(category[1] == "share") {
	   	/*$http({
	       method  : 'GET',
	        url     : "/share/save" + "?id=" + category[3],
	        headers : {'Content-Type': 'application/json'} 
	     })
	    .success(function(data) {
	       if(data) {
	         $scope.sharedHealines = data.arr;
	       }		        
	    }); */

	    var url =  "/share/save" + "?id=" + category[3];
	    $http.get(
	        	url,
	         	{	
	           	headers: {
	            	"Content-Type": 'application/json',
	         		}
	        	}
	      )
	      .then(successCallback,errorCallback)
	      

	      function errorCallback(err) {
	      	console.log(err)
	      }

	      function successCallback(data) {
	      	var itemList = data.data.arr;
	      	for(var i = 0; i < itemList.length; i++){
	      		itemList[i].isLoved = false;
	      	}
	      	$scope.sharedHealines = itemList;
	      }    
    }		
 
   	if(window.location.pathname == "/"){
    	$scope.pageType = "latest news"
    }

    if(	$scope.pageType == 'football') {
    	$scope.feeds = feedsFactory.football || [];
    } else {
	    $scope.feeds = feedsFactory.nigerianVoice.concat(feedsFactory.sahara
	    .concat(feedsFactory.theNigerianLawyer
	    .concat(feedsFactory.vanguard.concat(feedsFactory.naij
	    	.concat(feedsFactory.guardian.concat(feedsFactory.cnn
	    		.concat(feedsFactory.aljazeera.concat(feedsFactory.ny_times
	    			.concat(feedsFactory.bbc.concat(feedsFactory.news24
	    				.concat(feedsFactory.allafrica.concat(feedsFactory.punchng
	    					.concat(feedsFactory.thesun.concat(feedsFactory.dailypost
	    						.concat(feedsFactory.sundaydaily.concat(feedsFactory.premiumTime
	    							.concat(feedsFactory.bellanaija.concat(feedsFactory.todayng
	    								.concat(feedsFactory.tribune.concat(feedsFactory.goalcom
	    									.concat(feedsFactory.thisday.concat(feedsFactory.thenation
	    										.concat(feedsFactory.leadership.concat(feedsFactory.dailytimes
	    											.concat(feedsFactory.businessday.concat(feedsFactory.independent.concat(feedsFactory.viewAfrica24)))))))))))))))))))))))))))
    }

    var list = [];
    var elemPos;

    var setData = function(type,name,res,featured) { 
    	
    	var	newsFeed  = ((res.data.rss) ? res.data.rss.channel.item : res.data.feed.entry) || [];
    	
    	for(var k = 0; k < newsFeed.length; k++){
    		var dataSet = {};    		    		
    		dataSet.title = (name === 'goal.com' && $scope.pageType !== 'football') ? (newsFeed[k].title.__text) : (name !== 'Daily Trust') ? (newsFeed[k].title == "" || newsFeed[k].title == undefined) ? getDescription(newsFeed[k].description) : (typeof newsFeed[k].title == 'object' ) ? newsFeed[k].title[0] : (newsFeed[k].title) : (name !== 'naija.ng') ? getTitle(newsFeed[k].link) : getTitle(newsFeed[k].id);
	    	dataSet.type = type;
	    	dataSet.link = (name === 'goal.com' && $scope.pageType !== 'football') ? newsFeed[k].id : (name !== 'naija.ng') ? newsFeed[k].link : newsFeed[k].id;
	    	dataSet.pubDate = (name === 'goal.com' && $scope.pageType !== 'football') ? new Date(newsFeed[k].updated) : (name !== 'naija.ng') ? (newsFeed[k].pubDate) ? new Date(newsFeed[k].pubDate) : (new Date(res.data.rss.channel.pubDate)) : new Date(newsFeed[k].published);
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
	    		if($scope.pageType == dataSet.type){
		    		elemPos = $scope.headLines.map(function(x){return x.title}).indexOf(dataSet.title);
		    		if(elemPos === -1) {
		    			dataSet.isNow = true;	
		    			console.log(dataSet)    			
		    			$scope.headLines.unshift(dataSet);		    			
		    		} 
	    		} 
	    	}
    	}
    }
   	
   	$scope.headLines = list;
		var count = $scope.feeds.length;
		$scope.loading = false;
   	function loadFeeds() {
   		$scope.loading = true;
	    $scope.feeds.forEach(function(item){

	    	if(filterName.hasOwnProperty(item.name)){
	    		filterName[item.name] += 1;
	    	} else {
	    		filterName[item.name] = 1;
	    		$scope.sources.push(item.name)
	    	}

	    	if(item.type == thePage) {
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
		    		/*if(item.name == "daily independent") {
		    			console.log("daily independent")
		    			DataSource.outRequets(item.url,item.type,item.name,setData)
		    		} else 	{
		    			DataSource.getHttps(item.url,item.type,item.name,setData);
		    		}*/
		    	}
	    	} else if( item.type == "latest news" && thePage == 'latest') {
	    		if(item.protocol == 'http') {
		    		DataSource.getHttp(item.url,item.type,item.name,setData);
		    	} else {
		    		DataSource.getHttps(item.url,item.type,item.name,setData);
		    		/*if(item.name == "daily independent") {
		    			DataSource.outRequets(item.url,item.type,item.name,setData)
		    		} else 	{
		    			DataSource.getHttps(item.url,item.type,item.name,setData);
		    		}*/
		    	}
	    	}

	    	if(item.type !== thePage) {
	    		if(item.type == 'technology' || item.type == 'business' || item.type == 'world' || item.type == 'politics'){
	    			
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

    $scope.visited = function(e,item,shared){
    	if(item) {
	    	if(item.isNow)
	    		item.isNow = false;
	    	var list = localManager.getValue('visited') || [];    	
	    	list.push(item.title);
	    	item.isVisited = true;
	    	localManager.setValue('visited',list);  
	    }  	
    }

    $rootScope.lovedOnes = [];

    var lovedOnes = $rootScope.lovedOnes;

    $scope.love = function(item){
    	item.isLoved = true;
    	$scope.isLoaded = true    	
    	item.id = Math.floor(Math.random() * 9999) + "" + Math.floor(Math.random() * 9999)
    	lovedOnes.push(item);
    }

     $scope.unlove = function(item){
    	item.isLoved = false;
    	var elemPos = lovedOnes.map(function(x){return x.id}).indexOf(item.id);
    	if(lovedOnes[elemPos]){
    		lovedOnes.splice(elemPos,1);
    	}

    	console.log(lovedOnes);
    }

    $scope.saveLove = function() {
    	/**/            

    }

    $scope.getLink = function(env,elem){
    	
    	
    	if(lovedOnes.length > 0) {
    		var id = genHash(10);
    		var sendObj = {
    			id: id,
    			arr: lovedOnes,
    			date: + new Date()
    		}


    		var str = "https://goodmorning9ja.com/share/" + (($scope.pageType == "latest news") ? "latest" : $scope.pageType)  + "/" + id + "/gm";

    		for(var i = 0; i < lovedOnes.length; i++){
    			str += "%0A%0A"+ createNewsLink(lovedOnes[i].title) + ""
    		}

    		var tm = str;//str.slice(0, -2)
    		var shareUrl = "https://web.whatsapp.com/send?text=" + tm;
    		//window.location.href =  "https://web.whatsapp.com/send?text=" + tm;
    		window.open(shareUrl,'_blank'); 		

    		$http({
		       method  : 'POST',
		        url     : "/share/save",
		        data    : sendObj, //forms user object
		        headers : {'Content-Type': 'application/json'} 
		     })
		    .success(function(data) {
		       if(data) {
		         console.log(data);
		       }		        
		    });   		
    		
    	} else {
    		alert("Please love atleast one headline you want to share!");
    	}
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

    function genHash(count) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567899966600555777222";

	    for( var i=0; i < count; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}


    $scope.refresh = function() {  
    	$scope.isUpdate = false; 
    	window.location.href="/" 	
    	//list.splice(0);
    	//loadFeeds();
    }

    function createNewsLink(title){
		var str = "";
		if(title) {
			var spt = title.split(" ");
			for(var i = 0; i < spt.length; i++){
				str += spt[i] + " ";
			}
		}

		var tm = str.slice(0, -1)

		console.log(tm)
		return tm;
	}


    $interval(function(){
    	$scope.isUpdate = true;
    	//loadFeeds();
    },600000) //600000
	
	}])
	.controller("shareController",["$scope","$rootScope","$sce",function($scope,$rootScope,$sce){

		console.log($rootScope.lovedOnes);

		var lovedOnes = $rootScope.lovedOnes;

		if(lovedOnes.length == 0) {
    		var id = genHash(10);
    		var sendObj = {
    			id: id,
    			arr: lovedOnes,
    			date: + new Date()
    		}


    		var str = "https://goodmorning9ja.com/share/" + (($scope.pageType == "latest news") ? "latest" : $scope.pageType)  + "/" + id + "/gm";

    		for(var i = 0; i < lovedOnes.length; i++){
    			str += "%0A%0A"+ createNewsLink(lovedOnes[i].title) + ""
    		}

    		var tm = str;//str.slice(0, -2)
    		var shareUrl = "https://web.whatsapp.com/send?text=" + tm;
    		//window.location.href =  "https://web.whatsapp.com/send?text=" + tm;
    		//window.open(shareUrl,'_blank');

    		var shareTag = document.createElement('a');
    		shareTag.href = shareUrl;
    		shareTag.target = "_blank";
    		shareTag.setAttribute('data-action','share/whatsapp/share');    		
    		shareTag.innerHTML += "Share";
    		

    		var btnArea = angular.element(document.getElementById('shareplace'));
    		console.log(btnArea);
    		console.log(shareTag);

    		btnArea[0].appendChild(shareTag);

    		var link = "" + shareTag;

    		var saveSlection = function() {
    		alert("selection will be saved amen!");
    		/*$http({
		       method  : 'POST',
		        url     : "/share/save",
		        data    : sendObj, //forms user object
		        headers : {'Content-Type': 'application/json'} 
		     })
		    .success(function(data) {
		       if(data) {
		         console.log(data);
		       }		        
		    });*/
		   	shareTag.addEventListener("click",saveSlection,false);
    		}

    		$scope.trustAsHtml = function() {
			  return $sce.trustAsHtml(link);
			};
    		/*$http({
		       method  : 'POST',
		        url     : "/share/save",
		        data    : sendObj, //forms user object
		        headers : {'Content-Type': 'application/json'} 
		     })
		    .success(function(data) {
		       if(data) {
		         console.log(data);
		       }		        
		    });*/    		
    		
    	} else {
    		alert("Please love atleast one headline you want to share!");
    	}


    	


    function genHash(count) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567899966600555777222";

	    for( var i=0; i < count; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}


	function createNewsLink(title){
		var str = "";
		if(title) {
			var spt = title.split(" ");
			for(var i = 0; i < spt.length; i++){
				str += spt[i] + " ";
			}
		}

		var tm = str.slice(0, -1)

		console.log(tm)
		return tm;
	}

	}])



})()