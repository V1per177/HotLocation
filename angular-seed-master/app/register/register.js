'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register',{
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', function($scope, $location, $firebaseAuth){

	var firebaseObj= new Firebase("https://amber-torch-5013.firebaseio.com");
	var auth = $firebaseAuth(firebaseObj);

	$scope.signUp=function(){

		//sign up logic
		if(!$scope.regForm.$invalid){
			var email=$scope.user.email;
			var password=$scope.user.password;

			if(email && password){
				auth.$createUser({email:email, password:password})
				.then(function(){
					//success signup
					console.log('Sign up successful');
					$location.path('/home');
				}, function(error){
					console.log(error);
					$scope.regError=true;
					$scope.regErrorMessage=error.message;
				});
			}
		}
	};
}]);