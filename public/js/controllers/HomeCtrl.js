// angular.module('foto')
app.controller('HomeCtrl', ["$mdDialog","$scope", "$http", "$firebaseArray", "$firebaseAuth", function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth){
	console.log("Hola Amigo")

	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.users = $firebaseArray(ref);

	$scope.authObj = $firebaseAuth(ref);
	$scope.logout = function(){
		$scope.authObj.$unauth();
	}

	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  	$scope.userData = authData;
	    console.log("Logged in as:", authData.google.displayName);
	  } else {
	    console.log("Logged out");
	  }
	});

	$scope.postComment = function(){
		$scope.users.$add({
			author : $scope.newComment.author,
			body: $scope.newComment.body
		})
	}

	$scope.removeComment = function(obj){
		$scope.users.$remove(obj).then(function(ref){
			ref.key() === obj.$id; // true
		})
	}

	$scope.imagePath = 'imgs/tall.jpg';
	$scope.thumbPath = 'imgs/thumb.png';


	// get the local json object
	// $http.get('js/data.json').success(function(data){
	// 	$scope.users = data
	// 	console.log($scope.users);
	// })

	// EDIT COMMENT DIALOG CONTROLLERS
	 $scope.showAdvanced = function(ev, user, index) {
	 	$scope.editComment = user;
	 	console.log('shitface',$scope.editComment.author);
	 	$scope.editCommentIndex = index;
	 	// console.log(user);
	 	// console.log('comment'+ $scope.editComment.author);
	 	// console.log('index'+ $scope.editCommentIndex);
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: './views/dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      resolve:{
	      	user:function(){
	      		return $scope.editComment;
	      	},
	      	index: function(){
	      		return $scope.editCommentIndex;
	      	}
	      }
	    });
	  };
	  function DialogController($scope, $mdDialog, user, index) {
	  	var ref = new Firebase("https://smsfoto.firebaseio.com");
		$scope.users = $firebaseArray(ref);

	  	// console.log(user);
	  	$scope.editComment = user;
		$scope.editCommentIndex = index;

		  $scope.hide = function() {
		    $mdDialog.hide();
		  };

		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };

		  $scope.answer = function() {
			console.log($scope.editCommentIndex);

		  	$scope.users[$scope.editCommentIndex] = $scope.editComment;
		  	$scope.users.$save($scope.editCommentIndex).then(function(ref){});
		    $mdDialog.hide();
		  };
		}

}]);

