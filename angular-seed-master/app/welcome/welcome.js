'use strict';

angular.module('myApp.welcome',['ngRoute'])

.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope','$firebaseArray','CommonProp', function($scope, $firebaseArray,CommonProp){

	$scope.username= CommonProp.getUser();
	var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com/Articles");

	
	$scope.articles= $firebaseArray(firebaseObj);
}]);