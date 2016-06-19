(function(){
	angular.module('webApp')
		.controller('EditProfileController',['Upload' , '$scope' , '$state' , '$http' ,
							 function( Upload, $scope, $state,$http){

							 	$scope.user = JSON.parse(localStorage['User-Data']) || undefined;
							 	var id = {_id: $scope.user._id};

							 	$scope.refresh = function(){
							 		$http.post('api/user/ref',id).success(function(response){
							 			
							 			localStorage.clear();
							 			localStorage.setItem('User-Data', JSON.stringify(response));
							 			$scope.user = JSON.parse(localStorage['User-Data']) || undefined;

							 			$state.go('main');

							 		}).error(function(error){
							 			console.log(error);
							 		})
							 	};

							 	
							 	$scope.addDetails = function(){

							 		var file = $scope.File;
							 		console.log(file);
							 		console.log($scope.user);

							 		if(file){
							 			Upload.upload({
							 				url:'api/profile/editDetails',
							 				method: 'POST',
							 				data: {user: $scope.user},
							 				file: file
							 			}).progress(function(evt){
							 				console.log('firing');
							 			}).success(function(data){
							 				console.log('here');
							 				$scope.refresh();							 				
							 			}).error(function(error){
							 				console.log(error);
							 			})
							 		}
							 	};

							}])
}());