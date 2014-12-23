/*
 * Serve JSON to our AngularJS client
 */

// require http
var http = require('http');

// require redis
var _redis = require('redis');
var redis = _redis.createClient();

// Assuming Habibie's Service as External API
// hardcoded, should be refactored in real env.
var url = 'http://pat-backend.habibiefaried.com/collections/pesawat';

// GET

function loadData() { return function (callback) {
	var data = [];
		    redis.keys('*__id', function(error, result) {
			result.forEach(function(entity, i) {
				var entity_set = "", key, id, tujuan, avail, harga;
				redis.get(entity, function(error, result) {
					key = result;
				redis.get(key + '_id', function(error, result) {
					id = result;
				redis.get(key + '_tujuan', function(error, result) {
					tujuan = result;
				redis.get(key + '_avail', function(error, result) {
					avail = result;
				redis.get(key + '_harga', function(error, result) {
					harga = result;

				entity_set = {"_id" : key, "id" : id, "tujuan" : tujuan, "avail" : avail, "harga" : harga};
				data.push(entity_set); // append
				});});});});});
			});
		    });
    // stupid hack to ensure the data has been retrieved
    // TODO: Async handler for callback after all data have been retrieved
    setTimeout(function(){return callback(data);}, 500);
}}

exports.getTicket = function(req, res) {
   redis.get('checkKey', function(error, result) {
       console.log('checkKey: ' + result);
       if (result != null) { // assume data is available in cache for 60 seconds period in a set (all data)
	    loadData()(function (data) {
	        res.json({messages: data, fresh: false});
	    });
       } else { // data is not available in cache 
	    setTimeout(function(){
		loadData()(function (data) {
			res.json({messages: data, fresh: true});
		});}, 25000);
       }
    });
};

exports.getTicketInfo = function (req, res) {
  res.json(true);
}

// POST
exports.buyTicket = function (req, res) {
  res.json(true);
};

function refreshCache() {

	var delay = 10000; // API waiting time (10 seconds, assume)

	setTimeout(function() {

	http.get(url, function(http_res) {
	    var data = "";
	    http_res.on("data", function(chunk) {
	      data += chunk;
	    });
		http_res.on("end", function() {
		      console.log(data);
		      data = JSON.parse(data);
		      data.forEach(function(entity, i) {
			 // assume all data will be refreshed at same time for this stage
			 // TODO : Create a list of available keys
			 redis.setex('checkKey', 60, '1', function(error, result) {});
			 /** _id */
			 redis.setex(entity._id + '__id', 60, entity._id, function(error, result) {
			    if (error) console.log('Error: ' + error);
			    else console.log(entity._id + '__id timeout in 60 seconds.'); 
			 });
			 /** id */
			 redis.setex(entity._id + '_id', 60, entity.id, function(error, result) {
			    if (error) console.log('Error: ' + error);
			    else console.log(entity._id + '_id timeout in 60 seconds.'); 
			 });
			 /** tujuan */
			 redis.setex(entity._id + '_tujuan', 60, entity.tujuan, function(error, result) {
			    if (error) console.log('Error: ' + error);
			    else console.log(entity._id + '_tujuan timeout in 60 seconds.'); 
			 });
			 /** avail */
			 redis.setex(entity._id + '_avail', 60, entity.avail, function(error, result) {
			    if (error) console.log('Error: ' + error);
			    else console.log(entity._id + '_avail timeout in 60 seconds.'); 
			 });
			 /** harga */
			 redis.setex(entity._id + '_harga', 60, entity.harga, function(error, result) {
			    if (error) console.log('Error: ' + error);
			    else console.log(entity._id + '_harga timeout in 60 seconds.'); 
			 });
		      });
		    });
  	 });}, delay);
}

// Timer for refreshing cache
setInterval(function() {refreshCache()}, 10 * 1000); // every 10 seconds, for example, to ensure cache is never empty

/**
exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

// POST
exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
*/
