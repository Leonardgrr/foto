app.controller('LoginCtrl', ["$mdDialog", "$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", 
	function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject, user, Auth){
	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);
	$scope.users = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"));

	$scope.authObj.$onAuth(function(authData) {
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
	  } else {
	    // console.log("Logged out");
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
		console.log("did i log out?");
		$scope.authObj.$unauth();
	}


	// PANO STUFF


	// function initPano() {
 //        var panoOptions = {
 //          pano: 'custom',
 //          visible: true,
 //          panoProvider: getCustomPanorama
 //        };

 //        var panorama = new google.maps.StreetViewPanorama(
 //          document.getElementById('pano-canvas'), panoOptions);
 //      }

 //      function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
 //        return 'photosphere.jpg';
 //      }

 //      function getCustomPanorama(pano, zoom, tileX, tileY) {
 //        if (pano == 'custom') {
 //          return {
 //            location: {
 //              pano: 'custom',
 //              description: 'Custom Street View'
 //            },
 //            tiles: {
 //              tileSize: new google.maps.Size( 5656 ,  2828 ),
 //              worldSize: new google.maps.Size( 5656 ,  2828 ),
 //              getTileUrl: getCustomPanoramaTileUrl
 //            }
 //          };
 //        }
 //      }


}]);