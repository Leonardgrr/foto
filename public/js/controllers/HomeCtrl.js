// angular.module('foto')
app.controller('HomeCtrl', ["$mdDialog", "$location","$rootScope", "$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", function($mdDialog, $location, $rootScope, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject){
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
		$rootScope.authorize(authData);
		$rootScope.initPano('pano-canvas');
		if (authData) {
		  	$scope.userData = authData;
		  	// for use to use with current user crud ie: edit/delete user comments
		  	$scope.currentUser = $scope.userData.uid;
		  	console.log("current user is ", $scope.currentUser);
		} 
	});

	// USER COMMENT CRUD
	$scope.userPostComment = function(){

		$scope.comments.$add({
			userId : $scope.userData.uid,
			body: $scope.newComment.userSays
		})
		$scope.newComment.userSays = "";
	}

	// USER COMMENT CRUD
	$scope.userPostComment = function(){

		$scope.comments.$add({
			userId : $scope.userData.uid,
			body: $scope.newComment.userSays
		})
		$scope.newComment.userSays = "";
	}

	$scope.userRemoveComment = function(obj){
		console.log("trying to delete");
		console.log(obj);
		$scope.comments.$remove(obj).then(function(ref){
			var boot = "boot";
			console.log(boot);
			ref.key() === obj.$id; // true
			console.log("deleted?");
		})
	}

	// var obj = $firebaseObject(ref);
	// obj.$remove().then(function(ref) {
	//   // data has been deleted locally and in the database
	// }, function(error) {
	//   console.log("Error:", error);
	// });

	$scope.imagePath = 'imgs/tall.jpg';
	$scope.thumbPath = 'imgs/thumb.png';

	// EDIT COMMENT DIALOG CONTROLLERS
	 $scope.showAdvanced = function(ev, comment, index) {
	 	$scope.editComment = comment;
	 	console.log(comment);
	 	// console.log('dippitydoodah',$scope.editComment.author);
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
	  	// creates a reference back to firebase to use for edit
	  	var ref = new Firebase("https://smsfoto.firebaseio.com");
		$scope.comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
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
		  	$scope.comments[$scope.editCommentIndex] = $scope.editComment;
		  	$scope.comments.$save($scope.editCommentIndex).then(function(ref){});
		    $mdDialog.hide();
		  };
		}

}]);