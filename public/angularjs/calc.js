
var app = angular.module('calc',[]);

app.controller('calc',function($scope,$http){
	
	$scope.load = function(){	
		$http({			
			method: "POST",
			url : '/getHistory',						
		}).success(function(data){
			if(data.history){
				console.log(data.history);
				$scope.history = data.history;
			}else{
				alert("somthing's wrong in callback of retrieval of history");
			}
		});	
	};  

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