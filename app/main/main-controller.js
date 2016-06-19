(function(){
	angular.module('webApp')
		.controller('MainController',['$scope', '$http', "$interval",'$state', function($scope, $http, $interval,$state){

			
			
			$scope.loggedIn = false;

			if(localStorage['User-Data'] !== undefined){
				$scope.user = JSON.parse(localStorage['User-Data']);
				console.log($scope.user);
				$scope.loggedIn = true;
			}


			$scope.sendWaste = function(){

				if($scope.newWaste.trim().length > 0){					
					
					var request = {
						user: $scope.user.username || $scope.user.email,
						userId: $scope.user._id,
						userImage: $scope.user.image,
						content: $scope.newWaste
					}

					$http.post('api/waste/post',request).success(function(response){
						//console.log(response);
						getWastes(true);
						//$scope.wastes = response;
					}).error(function(err){
						console.log(err);
					})

					

					//$window.location.reload();
				}
			}

			function getWastes(initial){ 

				var data = {};
				
				if($scope.user){
					data.following = angular.copy($scope.user.following);
					data.following.push({ userId: $scope.user._id});
				}
				
				$http.post('api/waste/get', data).success(function(response){
						if(initial){
							$scope.wastes = response;
						}
						else{
							if(response.length > $scope.wastes.length){
								$scope.incomingWastes = response;
							}
						}
					}).error(function(err){
						console.log(err);
					})
			};

			$interval(function(){
				getWastes(false);

				if($scope.incomingWastes){
					$scope.difference = $scope.incomingWastes.length - $scope.wastes.length;
				}

				console.log("This is Working.");

			}, 5000);

			$scope.setNewWastes = function(){
				$scope.wastes = angular.copy($scope.incomingWastes);
				$scope.incomingWastes = undefined;
			}

			//initial
			getWastes(true);
		}])
}());