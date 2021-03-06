var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require("./mongo");
var moment = require("moment");
var mongoURL = "mongodb://localhost:27017/protein";
// var expressSession = require("express-session");

/* GET home page. */
router.get('/signin', function(req, res, next) {
	  res.render('signin', { title: 'Bio-Protei' });
});

router.get('/', function(req, res, next) {
	  res.render('signin', { title: 'Bio-Protein' });
});

router.get('/home', function(req, res, next) {
	if(req.session.user){
		json_name = req.session.user.username;
	}else{
		json_name = "Guest";
	}

	  res.render('index', {username: json_name});
	
});

router.post('/logout', function(req, res, next) {
	req.session.destroy();	
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.send({"statusCode" : 200});
});

router.post('/signup', function(req, res, next) {
	
	if(req.body.password == null || req.body.password == undefined){
		res.send({"statusCode" : 401});
	}

	var id = req.body.id;
	var pass = req.body.password;

	var JSON_query = {
		"user_id" : id,
		"password" : pass
	};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');

		coll.insert(JSON_query, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.

				
				json_responses = {"statusCode" : 200};
				res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
});

router.post('/signin', function(req, res, next) {
	
	var id = req.body.id;
	var pass = req.body.password;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');

		coll.findOne({"user_id": id}, function(err, results){
			if (results) {
				var get_password = results.password;
				if(get_password == pass){
					console.log("user is valid");
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					req.session.user = {
							"username" : results.user_id,
					};
					res.send({"statusCode" : 200});	
				}else{
					console.log("user is not valid");
					res.send({"statusCode" : 10});
				}
			}else{
				console.log("no user");
				res.send({"statusCode" : 404});
			}
	
		});
	});
});

router.post('/getHistory', function(req, res, next) {
	if(req.session.user){
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('history');

		coll.find({"user" : req.session.user}).sort({_id:-1}).toArray(function(err, results){
			if (results.length > 0 ) {
				res.send({"history" : results});							
			} else {
				res.send({"history" : "500"});
			}
		});
	});	
	}
});



router.post('/dna', function(req, res, next) {
	var dna_seq = req.body.dna;
	request({
    method: 'POST',
    url: 'http://127.0.0.1:5000',
    // body: '{"foo": "bar"}'
    json: {"dna_seq": dna_seq}
	}, (error, response, body) => {

	    // console.log(response);
	    console.log(body);
	    var data = body.split(",");
	    var now = moment()
		var formatted = now.format('YYYY-MM-DD HH:mm:ss Z')
		console.log(formatted)


	    var JSON_query = {
							"user" : req.session.user,
							"seq" : dna_seq,
							"timestamp" : formatted,
							"result" : data
							
						};

		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('history');
		    coll.insert(JSON_query, function(err, results){
						
				if (results) {
					res.send({"result" : data});
				} else {
					res.send({"result" : "500"})
				}
			});
		});
	});

});







module.exports = router;




