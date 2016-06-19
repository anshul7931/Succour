(function(){
	angular.module('webApp')
			.controller('FollowController',['$scope','$http','$window','$state', function($scope,$http,$window,$state){

				$scope.user = JSON.parse(localStorage['User-Data']);
				console.log($scope.user);

				var id = {_id: $scope.user._id};

				$scope.refresh = function(){
					$http.post('/api/user/ref',id).success(function(response){

						console.log("now here");
							 			
						localStorage.clear();
						localStorage.setItem('User-Data', JSON.stringify(response));
						$scope.user = JSON.parse(localStorage['User-Data']) || undefined;

						//$state.reload();
					 			
					}).error(function(error){
						console.log(error);
					})
				};

				$scope.goMain = function(){
					$state.go('main');
				}


				$http.get('/api/users/get').then(function(response){
					$scope.users = response.data;
					console.log($scope.users);
				})/*.error(function(err){
					console.log(err);
				})*/

				$scope.follow = function(follower, following){
					console.log("here");
					
					var request = { userId: follower,
								wasterId: following };

					$http.post('/api/users/follow', request).success(function(response){
						console.log("following: "+following);
						$scope.refresh();
					}).error(function(error){
						console.log(error);
					})

					
				}

				$scope.unfollow = function(follower, following){
					
					var request = { userId: follower,
								wasterId: following };

					console.log("unfollow func");

					$http.post('/api/users/unfollow', request).then(function(response){
						console.log("unfollowing: "+following);
						$scope.refresh();
					})
				}

				$scope.checkIsFollowing = function(wasterID){

					for(var i = 0, len = $scope.user.following.length; i < len; i++){
						if($scope.user.following[i].userId === wasterID){
							return true;
						}
					}
					return false;
				}
			}])
}());