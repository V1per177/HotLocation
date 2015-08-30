'use strict'

angular.module('myApp.home',['ngRoute','firebase'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl',['$scope','$firebaseSimplelogin', function($scope, $firebaseSimplelogin){

	var firebaseObj= new Firebase("https://amber-torch-5013.firebaseio.com/");
	var loginObj = $firebaseSimplelogin(firebaseObj);

	$scope.SignIn=function(event){
		event.preventDefault(); // Preventing from refreshing
		var username=$scope.user.email;
		var password=$scope.user.password;

		//Auth logic

		loginObj.$login('password', {
			email:username,
			password: password
		})
		.then(function(user){
			//Successful
			console.log('Authentication successful');
		}, function(error){
			//Failure
			console.log('Authentication failure');
		});
	}
}]);