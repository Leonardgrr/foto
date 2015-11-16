// angular.module('foto')
app.controller('DetailCtrl', ["$mdDialog", "$location","$rootScope", "$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", "$routeParams", "$sce", function($mdDialog, $location, $rootScope, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject, $routeParams, $sce){

	var ref = new Firebase("https://smsfoto.firebaseio.com");
	$scope.comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
	$scope.users = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"));
	var imageRef = new Firebase("https://smsfoto.firebaseio.com/pictures/"+$routeParams.imageID);
	$scope.authObj = $firebaseAuth(ref);

	// grabs the slected image set as 'currentImage' for use in HTML ng-show line 64
	$scope.currentImage = $routeParams.imageID;

	// This gets the data for the logged in user to CRUD
	// $scope.authObj.$onAuth(function(authData) {
	// 	$rootScope.authorize(authData);
	// 	// $scope.initPano('pano-canvas');
	// 	if (authData) {
	// 	  	$scope.userData = authData;
	// 	  	// for use to use with current user crud ie: edit/delete user comments
	// 	  	$scope.currentUser = $scope.userData.uid;
	// 	  	console.log("current user is ", $scope.currentUser);
	// 	} 
	// });

	$scope.userPostComment = function(){
		$scope.comments.$add({
			userId : $rootScope.currentUser1,
			body: $scope.newComment.userSays, 
			imageID : $routeParams.imageID
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

	$scope.imagePath = 'imgs/tall.jpg';
	$scope.thumbPath = 'imgs/thumb.png';

	// EDIT COMMENT DIALOG CONTROLLERS
	 $scope.showAdvanced = function(ev, comment, index) {
	 	$scope.editComment = comment;
	 	console.log(comment);
	 	$scope.editCommentIndex = index;
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

		

		// working on some custom street view stuff
		$scope.image.$loaded()
		  .then(function(data) {
		  	$scope.userId = data.userId;
		  	$scope.id = data.id;
		  	// $scope.imageURL = data.picture;
		  	$scope.imageURL = $sce.trustAsResourceUrl(data.picture);

		  	console.log("this is ", $scope.imageURL);
		})

		  .catch(function(error) {
		    console.error("Error:", error);
		  });





	//Pano Scripts
	// $rootScope.initPano = function(elementId){
	//     var panoOptions = {
	//       pano: 'custom',
	//       visible: true,
	//       panoProvider: getCustomPanorama
	//     };

	//     var panorama = new google.maps.StreetViewPanorama(
	//       document.getElementById(elementId), panoOptions)

	//       function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
	//         return $scope.imageURL;
	//       }

	//       function getCustomPanorama(pano, zoom, tileX, tileY) {
	//         if (pano == 'custom') {
	//           return {
	//             location: {
	//               pano: 'custom',
	//               description: 'Custom Street View'
	//             },
	//             tiles: {
	//               tileSize: new google.maps.Size( 5656 ,  2828 ),
	//               worldSize: new google.maps.Size( 5656 ,  2828 ),
	//               getTileUrl: getCustomPanoramaTileUrl
	//             }
	//           };
	//         }
	//     }
	// }
}]);