var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/protein";
var expressSession = require("express-session");

/* GET home page. */
router.get('/signin', function(req, res, next) {
	  res.render('signin', { title: 'Calculator' });
});

router.get('/home', function(req, res, next) {
	  res.render('index', { title: 'Calculator' });
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
					// req.session.user = {
					// 		"user_id" : results.user_id,
					// };
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




router.post('/dna', function(req, res, next) {
	var dna_seq = req.body.dna;
	request({
    method: 'POST',
    url: 'http://127.0.0.1:5000',
    // body: '{"foo": "bar"}'
    json: {"dna_seq": dna_seq}
	}, (error, response, body) => {
    console.log(error);
    // console.log(response);
    console.log(body);
    res.send({"result" : body});
	});

});




router.post('/calc', function(req, res, next) {
	
//	console.log("inside function");
	var temp1 = req.body.num1;
//	var num1 = req.param('num1');
	var temp2 = req.body.num2;
	var opr = req.body.operation;
	var result;
	
	var num1 = Number(temp1);
	var num2 = Number(temp2);
	
	
	console.log(num1);
	console.log(num2);
	console.log(opr);
	console.log(typeof num1);
	
	
	//check incoming!
	if((isNaN(Number(num1) && isNaN(Number(num2))))){
		res.send({"msg" : "Invalid"});
	}else{
		switch(opr){
		case '+':
			result = num1+num2;
			break;
		case '-':
			result = num1-num2;
			break;
		case '*':
			result = num1*num2;
			break;
		case '/':
			result = num1/num2;
			break;
		
		}
		console.log("node : " + result);
		
		/*if(result == Infinity){
			
		}*/
		
		
		res.send({"result" : result});
	}	
});


module.exports = router;




