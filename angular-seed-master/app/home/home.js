'use strict'

angular.module('myApp.home',['ngRoute','firebase'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl',['$scope','$firebaseAuth', function($scope, $firebaseAuth){

	var firebaseObj= new Firebase("https://amber-torch-5013.firebaseio.com");
	var loginObj = $firebaseAuth(firebaseObj);

	$scope.SignIn=function(e){
		e.preventDefault(); // Preventing from refreshing
		var username=$scope.user.email;
		var password=$scope.user.password;

		//Auth logic

		loginObj.$authWithPassword({
			email:username,
			password:password
		})
		.then(function(user){
			//success login
			console.log('Authentication successful');
		},function(error){
			//login failure
			console.log('Authentication failure');
		});
	}
}]);