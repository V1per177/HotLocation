'use strict';

angular.module('myApp.addPost',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost',{
		templateUrl: 'addPost/addPost',
		controller:'AddPostCtrl'
	});
}])

.controller('AddPostCtrl',['$scope', function($routeProvider){

}]);