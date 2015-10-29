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


	 $scope.showAdvanced = function(ev, artist, index) {
	 	$scope.editComment = artist;
	 	console.log('shitface',$scope.editComment.author);
	 	$scope.editCommentIndex = index;
	 	// console.log(artist);
	 	// console.log('comment'+ $scope.editComment.author);
	 	// console.log('index'+ $scope.editCommentIndex);
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: './views/dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      resolve:{
	      	artist:function(){
	      		return $scope.editComment;
	      	},
	      	index: function(){
	      		return $scope.editCommentIndex;
	      	}
	      }
	    });
	  };
	  function DialogController($scope, $mdDialog, artist, index) {
	  	var ref = new Firebase("https://smsfoto.firebaseio.com");
		$scope.artists = $firebaseArray(ref);

	  	// console.log(artist);
	  	$scope.editComment = artist;
		$scope.editCommentIndex = index;

		  $scope.hide = function() {
		    $mdDialog.hide();
		  };

		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };

		  $scope.answer = function() {
			console.log($scope.editCommentIndex);

		  	$scope.artists[$scope.editCommentIndex] = $scope.editComment;
		  	$scope.artists.$save($scope.editCommentIndex).then(function(ref){});
		    $mdDialog.hide();
		  };
		}

}]);

