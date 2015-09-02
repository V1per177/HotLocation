'use strict';

angular.module('myApp.addPost',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost',{
		templateUrl: 'addPost/addPost.html',
		controller:'AddPostCtrl'
	});
}])

.controller('AddPostCtrl',['$scope','$firebaseObject','$location','CommonProp',function($scope,$firebaseObject,$location,CommonProp){

	$scope.AddPost=function(){
	//get title and post
	var title = $scope.article.title;
	var post = $scope.article.post;

	//Instantiate firebase object
	var firebaseObj = new Firebase("https://amber-torch-5013.firebaseio.com/Articles");
	
		//Add Post logic

		//Call pushAPI
		firebaseObj.push({
			title: title,
			post: post,
			emailId: CommonProp.getUser()
		}).then(function(ref){
			console.log(ref);
			$location.path('/welcome');
		}, function(error){
			console.log("Error:", error);
		});
	
	}

}]);