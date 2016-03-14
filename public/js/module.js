var app = angular.module('foto', ['ngRoute', 'firebase', 'ngMaterial', 'photosphere', 'ngSanitize'])
// DECIDE THE COLOR FOR THE THEME HERE
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');
});
