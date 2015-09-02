'use strict';

angular.module('myApp.addPost',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost',{
		templateUrl: 'addPost/addPost.html',
		controller:'AddPostCtrl'
	});
}])

.controller('AddPostCtrl',['$scope','$firebase',function($scope,$firebase){

	$scope.AddPost=function(){
	//get title and post
	var title = $scope.article.title;
	var post = $scope.article.post;

	//Instantiate firebase object
	var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com");
	var fb = $firebase(firebaseObj);
		//Add Post logic

		//Call pushAPI
		fb.$push({
			title: title,
			post: post
		}).then(function(ref){
			console.log(ref);
		}, function(error){
			console.log("Error:", error);
		});
	
	}

}]);