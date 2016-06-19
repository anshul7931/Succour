(function(){
	
	angular.module('app',['ui.router','ngRoute'])
			.config(function($stateProvider, $urlRouterProvider){

				$urlRouterProvider.otherwise("/index");

				$stateProvider
					.state('post',{
						url: "/post",
						templateUrl: "/js/app/posts/post.html",
						controller: "AppCtrl2"
					})

					.state('contact',{
						url: "/contact",
						templateUrl: "/js/app/posts/contact.html",
						controller: "AppCtrl1"
					})

					.state('details',{
						url: "/details",
						templateUrl:"/js/app/posts/details.html",
						controller: "AppCtrl"
					})

					.state('index',{
						url: '/index',
						templateUrl: "/js/app/posts/index.html",
						controller: "AppCtrl2"
					})
			}) 

}());