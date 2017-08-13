
var app = angular.module('calc',[]);

app.controller('calc',function($scope,$http){
	
	  // var operation;
	  // $scope.operation = function(x){
	  //   operation = x;
	  // }

	$scope.calculate= function(){
		
		$http({			
			method: "POST",
			url : '/dna',
			data : {
				
				"dna" : $scope.seq,
				
			}		
		}).success(function(data){
			console.log(data.result);
			if(data.result == null || data.result == undefined){
				$scope.result = "Something wrong!";
			}else{
				$scope.result = data.result;
			}
			
			
		}).error(function(error){
			console.log(data.msg);
			$scope.result = data.msg;
			
		});
	}
			
})