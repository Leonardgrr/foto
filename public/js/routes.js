app.config(function($routeProvider,$locationProvider, $sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from imgur where demo photsphere are hosted from 
    'http://i.imgur.com/**'
  ]);
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: 'views/landing.html',
		controller: 'LoginCtrl'
	})
	.when('/logout', {
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
	.when('/account', {
		templateUrl: 'views/user.html',
		controller: 'LoginCtrl'
	})
	.when('/detail/:imageID', {
		templateUrl: 'views/detail.html',
		controller: 'DetailCtrl'
	})
	.when('/styleguide', {
		templateUrl: 'views/styleGuide.html',
		controller: 'DetailCtrl'
	})
});
