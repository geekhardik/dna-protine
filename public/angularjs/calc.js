
var app = angular.module('calc',[]);

app.controller('calc',function($scope,$http){
	
	$scope.load = function(){	
		$http({			
			method: "POST",
			url : '/getHistory',						
		}).success(function(data){
			if(data.history!="500"){
				$scope.history = data.history;
			}else{
				
			}
		});	
	};  

	$scope.signout = function(){
		
	
			$http({			
				method: "POST",
				url : '/logout',
							
			}).success(function(data){
				if (data.statusCode != 200) {
					alert("somthing's wrong in logout");
				}
				else
					//Making a get call to the '/redirectToHomepage' API
					alert("You are successfully logged out");
					window.location.assign("/signin");
				
			}).error(function(error){
				alert("somthing's wrong in logout");
			});
		
}	

	$scope.calculate= function(){
		
		$http({			
			method: "POST",
			url : '/dna',
			data : {
				
				"dna" : $scope.seq,
				
			}		
		}).success(function(data){
			console.log(data.result);
			if(data.result == "500"){
				$scope.result = "Something wrong in retrieval of result!";
			}else{
				$scope.result = data.result;
				$scope.load();
			}
			
			
		}).error(function(error){
			$scope.result = "Oops.. Something went wrong! please try again later!";
		});
	}
			
})