app.controller('LoginCtrl', ["$mdDialog", "$scope", "$http", "$firebaseArray", "$firebaseAuth",
	function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth, user, Auth){
	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  	$scope.userData = authData;
	    console.log("Logged in as:", authData.google.displayName);
	  } else {
	    console.log("Logged out");
	  }
	});

	$scope.login = function(){
		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
		  // console.log("Logged in as:", authData.uid);
		  // console.log(authData);
		  // console.log(authData.google.profileImageURL);
		  $scope.userData = authData;
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		})
	}

	$scope.loginFacebook = function(){
		console.log("facebook login dialog is here")
		$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  console.log(authData.facebook.displayName);
		  console.log(authData.facebook.profileImageURL);
		  $scope.userData = authData;
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		})
	}

	$scope.loginTwitter = function(){
		console.log("twitter login dialog is here")
		$scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  console.log(authData.twitter.displayName);
		  console.log(authData.twitter.profileImageURL);
		  $scope.userData = authData;
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		})
	}

	$scope.logout = function(){
		$scope.authObj.$unauth();
	}


	// LOGIN DIALOG CONTROLLERS
	//  $scope.loginDialog = function(ev) {
	//     $mdDialog.show({
	//       controller: LoginDialogController,
	//       templateUrl: './views/dialog_login.html',
	//       parent: angular.element(document.body),
	//       targetEvent: ev,
	//       clickOutsideToClose:true
	//     });
	//   };
	  
	// function LoginDialogController($scope, $mdDialog, $firebaseAuth) {
	// 	var ref = new Firebase("https://smsfoto.firebaseio.com");
	// 	$scope.authObj = $firebaseAuth(ref);
	// 	console.log("login dialog controller is loaded");

	// 	$scope.login = function(){
	// 		console.log("login dialog is here")
	// 		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
	// 		  console.log("Logged in as:", authData.uid);
	// 		  console.log(authData);
	// 		  console.log(authData.google.profileImageURL);
	// 		  $scope.userData = authData;
	// 		}).catch(function(error) {
	// 		  console.error("Authentication failed:", error);
	// 		})
	// 	}

	// 	$scope.loginFacebook = function(){
	// 		console.log("facebook login dialog is here")
	// 		$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
	// 		  console.log("Logged in as:", authData.uid);
	// 		  console.log(authData.facebook.displayName);
	// 		  console.log(authData.facebook.profileImageURL);
	// 		  $scope.userData = authData;
	// 		}).catch(function(error) {
	// 		  console.error("Authentication failed:", error);
	// 		})
	// 	}

	// 	$scope.loginTwitter = function(){
	// 		console.log("twitter login dialog is here")
	// 		$scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
	// 		  console.log("Logged in as:", authData.uid);
	// 		  console.log(authData.twitter.displayName);
	// 		  console.log(authData.twitter.profileImageURL);
	// 		  $scope.userData = authData;
	// 		}).catch(function(error) {
	// 		  console.error("Authentication failed:", error);
	// 		})
	// 	}

	// 	$scope.logout = function(){
	// 		$scope.authObj.$unauth();
	// 	}


	// 	$scope.hide = function() {
	// 		$mdDialog.hide();
	// 	}

	// 	$scope.cancel = function() {
	// 		$mdDialog.cancel();
	// 	}

	// }


}]);