app.controller('LoginCtrl', ["$mdDialog", "$location", "$route", "$rootScope", "$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", "$routeParams",
	function($mdDialog, $location, $route, $rootScope, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject, $routeParams, user, Auth){
	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"));
	$scope.pictures = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/pictures/"));
	$scope.authObj.$onAuth(function(authData) {
	  $rootScope.authorize(authData);
	  //$rootScope.initPano('pano-canvas');
	});
// $rootScope.userData2 = authData;
$scope.imagePath = 'imgs/photosphere.jpg';

	$rootScope.authorize = function(authData){
		if (authData) {
		  	$scope.userData = authData;
		  	var user = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"+authData.uid));
		  	if (authData.provider === "google"){
			  	user.profilePic = authData.google.profileImageURL;
			  	user.userName = authData.google.displayName;
			  	user.$save();
		  	}else if (authData.provider === "twitter"){
		  		user.profilePic = authData.twitter.profileImageURL;
			  	user.userName = authData.twitter.displayName;
			  	user.$save();
		  	}else if (authData.provider === "facebook"){
		  		user.profilePic = authData.facebook.profileImageURL;
			  	user.userName = authData.facebook.displayName;
			  	user.$save();	
		  	}
		}
		//  else {
		//   	//if user not logged in
		//   	$location.path('/');
		// }
	}

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
		  // console.log("Logged in as:", authData.uid);
		  // console.log(authData.facebook.displayName);
		  // console.log(authData.facebook.profileImageURL);
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

	//LOGOUT
	$scope.logout = function(){
		$scope.authObj.$unauth();
		$route.reload();
	}

	// This gets the data for the logged in user to CRUD
	$scope.authObj.$onAuth(function(authData) {
		$rootScope.authorize(authData);
		if (authData) {
		  	$scope.userData = authData;
		  	// for use to use with current user crud ie: edit/delete user comments
		  	$rootScope.currentUser = $scope.userData.uid;
		  	$rootScope.currentUserDataAll = $scope.userData;
		  	// $rootScope.currentUser1 = $scope.userData.uid;
		  	// console.log("current user is ", $scope.currentUser);
		  	// console.log($scope.currentUserDataAll);
		  	// console.log("current user is ", $rootScope.currentUser1);
		} 
	});



	// //Pano Scripts


	//user can save a link to their picture
	$scope.userAddPicture = function(){
		$scope.pictures.$add({
			userId : $scope.userData.uid,
			picture: $scope.newPicture.userPic
		})
		$scope.newPicture.userPic = "";
	}

}]);