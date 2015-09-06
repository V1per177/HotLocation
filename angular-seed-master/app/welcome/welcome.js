'use strict';

angular.module('myApp.welcome',['ngRoute'])

.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope','$firebaseArray','$firebaseObject','CommonProp', function($scope, $firebaseArray,$firebaseObject,CommonProp){

	//populating welcome page
	$scope.username= CommonProp.getUser();
	var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com/Articles");
	$scope.articles= $firebaseArray(firebaseObj);

	//Populating edit popup modal
	$scope.editPost=function(id){
		//console.log(id);
		var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com/Articles/" + id);
		
		//console.log('URL is:'+firebaseObj);
		$scope.postToUpdate = $firebaseObject(firebaseObj);

		$('#editModal').modal(); //triggering modal popup
	}

	//Updating selected post
	$scope.update = function(){
		var fb = new Firebase("https://amber-torch-5013.firebaseio.com/Articles/"+ $scope.postToUpdate.$id);
		var article = $firebaseObject(fb);

		article.title = $scope.postToUpdate.title;
		article.post = $scope.postToUpdate.post;
		article.emailId = $scope.postToUpdate.emailId;

		article.$save().then(function(ref){
			$('#editModal').modal('hide');
		}, function(error){
			console.log("Error",error);
		});
	}

	//Confirm modal before actual delete
	$scope.confirmDelete= function(id){
		var fb = new Firebase("https://amber-torch-5013.firebaseio.com/Articles/" +id);
		$scope.postToDelete=$firebaseObject(fb);
		$('#deleteModal').modal();

	}

	//Actual delete
	$scope.deletePost=function(){
		var fb = new Firebase("https://amber-torch-5013.firebaseio.com/Articles/" +$scope.postToDelete.$id);
		var article = $firebaseObject(fb);

		article.$remove().then(function(ref){
			$('#deleteModal').modal('hide');
		}, function(error){
			console.log("Error",error);
		});
	}


}]);