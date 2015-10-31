app.config(function($routeProvider,$locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: 'views/landing.html',
		controller: 'LoginCtrl'
	})
	.when('/explore', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
	.when('/material', {
		templateUrl: 'views/material.html',
		controller: 'MaterialCtrl'
	})
	.when('/loggedIn', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
});
