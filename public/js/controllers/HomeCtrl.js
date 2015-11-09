// angular.module('foto')
app.controller('HomeCtrl', ["$mdDialog","$scope", "$http", "$firebaseArray", "$firebaseAuth", "$firebaseObject", function($mdDialog, $scope, $http, $firebaseArray, $firebaseAuth, $firebaseObject){
	console.log("Hola Amigo")

	var ref = new Firebase("https://smsfoto.firebaseio.com");
	// var comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
	$scope.comments = $firebaseArray(new Firebase("https://smsfoto.firebaseio.com/comments/"));
	// $scope.userrs = $firebaseArray(Firebase("https://smsfoto.firebaseio.com/users/"));
	$scope.users = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"));
	console.log($scope.users);
	// console.log($scope.users.uid);
	$scope.userFotos = $firebaseArray(ref);

	$scope.authObj = $firebaseAuth(ref);
	// $scope.logout = function(){
	// 	$scope.authObj.$unauth();
	// }

	$scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  	$scope.userData = authData;
	  	var user = $firebaseObject(new Firebase("https://smsfoto.firebaseio.com/users/"+authData.uid));
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
	$scope.postComment = function(){
		$scope.comments.$add({
			author : $scope.newComment.author,
			body: $scope.newComment.body
		})
	}

	$scope.removeComment = function(obj){
		$scope.users.$remove(obj).then(function(ref){
			ref.key() === obj.$id; // true
		})
	}
	
	console.log($scope.userData);
	// USER COMMENT CRUD
	$scope.userPostComment = function(){
		console.log("new comment was posted");

		$scope.comments.$add({
			userId : $scope.userData.uid,
			body: $scope.newComment.userSays
		})
	}

	$scope.userRemoveComment = function(obj){
		$scope.comments.$remove(obj).then(function(ref){
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


		//user uploads?
// var spinner = new Spinner({color: '#ddd'});
// var firebaseRef = 'https://smsfoto.firebaseio.com/';

// function handleFileSelect(evt) {
//   var f = evt.target.files[0];
//   var reader = new FileReader();
//   reader.onload = (function(theFile) {
//     return function(e) {

//       var filePayload = e.target.result;
//       // Generate a location that can't be guessed using the file's contents and a random number
//       var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
//       var f = new Firebase(firebaseRef + 'imgs/' + hash + '/filePayload');
//       spinner.spin(document.getElementById('spin'));
//       blah = e.target.result;
//       console.log(blah);
      
//       // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
//       f.set(filePayload, function() { 
//         spinner.stop();
//         document.getElementById("pano").src = e.target.result;
//         // $('#file-upload').hide();
//         // Update the location bar so the URL can be shared with others
//         // window.location.hash = hash;
//       });
//       return $scope.picture = blah;
//     };
//   })(f);
//   reader.readAsDataURL(f);
// }

// $(function() {
//   $('#spin').append(spinner);

//   var idx = window.location.href.indexOf('#');
//   var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
//   if (hash === '') {
//     // No hash found, so render the file upload button.
//     $('#file-upload').show();
//     document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
//   } else {
//     // A hash was passed in, so let's retrieve and render it.
//     spinner.spin(document.getElementById('spin'));
//     var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
//     f.once('value', function(snap) {
//       var payload = snap.val();
//       if (payload != null) {
//         document.getElementById("pano").src = payload;
//       } else {
//         $('#body').append("Not found");
//       }
//       spinner.stop();
//     });
//   }
// });




}]);
