var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Calculator' });
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




