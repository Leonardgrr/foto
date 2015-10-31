app.controller('LoginCtrl', ["$mdDialog", "$scope", "$http", "$firebaseArray", "$firebaseAuth",
	function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth, user){
	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	// $scope.login = function(){
	// 	$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
	// 	  console.log("Logged in as:", authData.uid);
	// 	}).catch(function(error) {
	// 	  console.error("Authentication failed:", error);
	// 	});
	// }

	// $scope.logout = function(){
	// 	$scope.authObj.$unauth();
	// }



	// LOGIN DIALOG CONTROLLERS
	 $scope.loginDialog = function(ev) {
	    $mdDialog.show({
	      controller: LoginDialogController,
	      templateUrl: './views/dialog_login.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    });
	  };
	  
	function LoginDialogController($scope, $mdDialog, $firebaseAuth) {
		var ref = new Firebase("https://smsfoto.firebaseio.com");
		$scope.authObj = $firebaseAuth(ref);
		console.log("login dialog controller is loaded");

		$scope.login = function(){
			console.log("login dialog is here")
			$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			  console.log(authData);
			  console.log(authData.google.displayName);
			  $scope.userData = authData.google.displayName;
			}).catch(function(error) {
			  console.error("Authentication failed:", error);
			})
		}

		$scope.logout = function(){
			$scope.authObj.$unauth();
		}


		$scope.hide = function() {
			$mdDialog.hide();
		}

		$scope.cancel = function() {
			console.log("cancel is working");
			$mdDialog.cancel();
		}

	}






}]);