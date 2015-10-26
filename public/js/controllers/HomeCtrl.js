angular.module('foto')
.controller('HomeCtrl', ["$scope", "$http", function($scope, $http){
	console.log("Hola Amigo")

	$http.get('js/data.json').success(function(data){
		$scope.artists = data
		console.log($scope.artists);
	})
}]);