// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('beer', ['ionic', 'ngCordova']);

// let isAuth = ($location, AuthService) => new Promise((resolve, reject) => {

//   AuthService.isAuthenticated()
//     .then((userExists) => {

//       if (userExists) {

//         console.log("true");
//         resolve();

//       } else {

//         console.log("false");
//         reject();

//       }

//     });

//   });
  
  angular.module('beer').run(function($ionicPlatform, $rootScope, $state, AuthService, FirebaseService) {
    $ionicPlatform.ready(function() {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      
    });
    
    FirebaseService.initializeFirebase();
    $rootScope.isLoggedIn = function () {

        // let currentUserEmail = $window.localStorage.getItem('email');
        // let currentUserPassword = $window.localStorage.getItem('password');

        let currentUser = window.localStorage.getItem('uglyID');

        if (currentUser !== undefined && currentUser !== null) {

          return true;

        } else {

          return false;
        }

      };

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: 'LoginController'
  })
  .state('register', {
    url: '/register',
    templateUrl: '../templates/registration.html',
    controller: 'RegistrationController'
  })
  .state('registerBeers', {
    url: '/registerBeers',
    templateUrl: '../templates/register-beers.html',
    controller: 'RegisterBeersController'
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/side-menu.html',
    controller: 'SideMenuController'
  })
  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'CameraController'
      }
    }
  })
  .state('app.brews', {
    url: '/brews',
    views: {
      'menuContent': { 
        templateUrl: 'templates/tabs-menu.html',
        controller: 'TabsController'
      }
    }
  })
  .state('app.brews.suggestions', {
    url: '/suggestions',
    views: {
      'tab-suggestions': {
        templateUrl: 'templates/suggestions.html',
        controller: 'SuggestionsController'
      }
    }
  })
  .state('app.brews.myBeers', {
    url: '/myBeers',
    views: {
      'tab-myBeers': {
        templateUrl: 'templates/my-beers.html',
        controller: 'MyBeersController'
      }
    }
  })
  .state('app.brews.addBeer', {
    url: '/addBeer',
    views: {
      'tab-addBeer': {
        templateUrl: 'templates/add-beer.html',
        controller: 'AddBeerController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});