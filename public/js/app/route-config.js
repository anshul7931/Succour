(function(){
'use strict';

angular
	.module('app')
	.config(config);

config.$inject=['$routeProvider'];

function config($routeProvider){
	$routeProvider
		.when('/index',{
			templateUrl:'/js/app/posts/index.html',
			controller:'AppCtrl2'
		});
}
}());