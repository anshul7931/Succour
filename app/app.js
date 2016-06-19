(function(){
	
	angular.module('webApp',['ui.router','ngFileUpload'])
			.config(function($stateProvider, $urlRouterProvider){

				$urlRouterProvider.otherwise("/");

				$stateProvider
					.state('signup',{
						url: "/signup",
						templateUrl: "app/signup/signup.html",
						controller: "SignUpController"
					})

					.state('editProfile',{
						url: "/edit-profile",
						templateUrl: "app/profile/edit-profile-view.html",
						controller: "EditProfileController"
					})

					.state('main',{
						url: "/",
						templateUrl: "app/main/main.html",
						controller: "MainController"
					})

					.state('follow',{
						url: '/follow',
						templateUrl: "app/follow/follow.html",
						controller: "FollowController"
					})
			}) 
}());