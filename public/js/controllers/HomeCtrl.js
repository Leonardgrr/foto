// angular.module('foto')
app.controller('HomeCtrl', ["$mdDialog","$scope", "$http", "$firebaseArray", function($mdDialog, $scope, $http, $firebaseArray){
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


	 $scope.showAdvanced = function(ev) {
	 	console.log("hello there");
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'dialog1.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    });
	  };
	  function DialogController($scope, $mdDialog) {
		  $scope.hide = function() {
		    $mdDialog.hide();
		  };

		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };

		  $scope.answer = function(answer) {
		    $mdDialog.hide(answer);
		  };
		}
}]);

