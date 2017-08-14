
var app = angular.module('myApp',[]);

app.controller('signinCtrl',function($scope,$http){
	console.log("posted data to server");	
	
	$scope.gotosignup = function(){
		window.location.assign("/signup");
	}
	
	$scope.signup = function(){
			$http({			
			method: "POST",
			url : '/signup',
			data : {
				"id" : $scope.username,
				"password" : $scope.password
			}
					
		}).success(function(data){
			if (data.statusCode == 401) {
				alert("Something's wrong in signup!");
				window.location.assign("/signin");
			} else{
				alert("You are successfully signed up! Please sign-in now!...");
				window.location.assign("/signin");
			}
			
		}).error(function(error){
			console.log("invalid");
			alert("username is already in records! please use different userid");		
			window.location.assign("/signin");
		});
	};

	
	$scope.signin = function(){
		
		$http({			
			method: "POST",
			url : '/signin',
			data : {
				"id" : $scope.username,
				"password" : $scope.password
			}
					
		}).success(function(data){
			
			if (data.statusCode == 10) {
				alert("user credentials are not valid!");
				window.location.assign("/signin");
			}else if(data.statusCode == 404){
				alert("No such user! please singup first!");
				window.location.assign("/signin");
			}
			else{
				alert("You are successfully Looged in..");
				window.location.assign("/home");
			}
			
		}).error(function(error){
			console.log(data.msg);
			$scope.result = data.msg;			
		});
	};
	
});


	
	
	
	
