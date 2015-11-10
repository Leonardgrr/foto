// angular.module('foto')
app.controller('HomeCtrl', ["$mdDialog","$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject){
	console.log("Hola Amigo")

	var ref = new Firebase("https://smsfoto.firebaseio.com");
	// var comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
	$scope.comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
	// $scope.userrs = $firebaseArray(Firebase("https://smsfoto.firebaseio.com/users/"));
	$scope.users = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"));
	console.log($scope.users);
	$scope.userFotos = $firebaseArray(ref);

	$scope.authObj = $firebaseAuth(ref);


	// This gets the data for the logged in user to CRUD
	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  	$scope.userData = authData;
	  	// var user = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"+authData.uid));

	  	// for use to use with current user crud ie: edit/delete user comments
	  	$scope.currentUser = $scope.userData.uid;
	  	console.log("current user is ", $scope.currentUser);
	  } 
	});


	// $scope.authObj.$onAuth(function(authData) {
	//   if (authData) {
	//   	$scope.userData = authData;
	//   	var user = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"+authData.uid));

	//   	user.profilePic = authData.google.profileImageURL;
	//   	user.userName = authData.google.displayName;
	//   	user.$save();
	//     // console.log("Logged in as:", authData.google.displayName);
	//   } else {
	//     // console.log("Logged out");
	//   }
	// });

	// COMMENT CRUD
	// $scope.postComment = function(){
	// 	$scope.comments.$add({
	// 		author : $scope.newComment.author,
	// 		body: $scope.newComment.body
	// 	})
	// 	$scope.newComment.userSays = "";
	// }

	// $scope.removeComment = function(obj){
	// 	$scope.users.$remove(obj).then(function(ref){
	// 		ref.key() === obj.$id; // true
	// 	})
	// }
	
	// console.log($scope.userData);
	// USER COMMENT CRUD
	$scope.userPostComment = function(){
		console.log("new comment was posted");

		$scope.comments.$add({
			userId : $scope.userData.uid,
			body: $scope.newComment.userSays
		})
		$scope.newComment.userSays = "";
	}

	$scope.userRemoveComment = function(obj){
		$scope.comments.$remove(obj).then(function(ref){
			ref.key() === obj.$id; // true
		})
	}

	$scope.imagePath = 'imgs/tall.jpg';
	$scope.thumbPath = 'imgs/thumb.png';

	// EDIT COMMENT DIALOG CONTROLLERS
	 $scope.showAdvanced = function(ev, user, index) {
	 	$scope.editComment = user;
	 	console.log('dippitydoodah',$scope.editComment.author);
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

	  // COMMENT DIALOG FUNCTIONS
	  function DialogController($scope, $mdDialog, user, index) {
	  	var ref = new Firebase("https://smsfoto.firebaseio.com");
		// $scope.users = $firebaseArray(ref);

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
