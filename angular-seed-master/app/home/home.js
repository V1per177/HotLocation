'use strict';

angular.module('myApp.home',['ngRoute','firebase'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl',['$scope','$location','CommonProp','$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth){
	
	var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com");
	var loginObj = $firebaseAuth(firebaseObj);
	$scope.user={};

	$scope.SignIn = function(e){
		e.preventDefault(); // Preventing from refreshing
		var username = $scope.user.email;
		var password = $scope.user.password;

		//Auth logic
		console.log('in function');

		loginObj.$authWithPassword({
			email: username,
			password: password
		})
		.then(function(user){
			//success login
			console.log('Authentication successful');
			CommonProp.setUser(user.password.email);
			$location.path('/welcome');

		},function(error){
			//login failure
			console.log('Authentication failure');
		});
	}
}])
.service('CommonProp', function(){
	var user='';

	return{
		getUser: function(){
			return user;
		},
		setUser: function(value){
			user=value;
		}
	};
});