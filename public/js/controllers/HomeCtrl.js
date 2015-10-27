angular.module('foto')
.controller('HomeCtrl', ["$scope", "$http", "$firebaseArray", function($scope, $http, $firebaseArray){
	console.log("Hola Amigo")

	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.artists = $firebaseArray(ref);

	$scope.postComment = function(){
		$scope.artists.$add({
			author : $scope.newComment.author,
			body: $scope.newComment.body
		})
	}

	$scope.removeComment = function(obj){
		$scope.artists.$remove(obj).then(function(ref){
			ref.key() === obj.$id; // true
		})
	}

	$scope.imagePath = 'imgs/mountain.jpg';


	// get the local json object
	// $http.get('js/data.json').success(function(data){
	// 	$scope.artists = data
	// 	console.log($scope.artists);
	// })
}]);