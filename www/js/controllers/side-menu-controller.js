let SideMenuController = function ($scope, $timeout, $state, AuthService) {

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.goToSuggestions = function() {
    $state.go('app.brews.suggestions');
  };
};

angular.module('beer').controller('SideMenuController', SideMenuController);

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  