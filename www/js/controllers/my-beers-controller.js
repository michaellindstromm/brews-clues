let MyBeersController = function ($scope, BeerService, FirebaseService) {

    $scope.$on('$ionicView.beforeEnter', function () {
        // update campaigns everytime the view becomes active
        // (on first time added to DOM and after the view becomes active after cached
      
        console.log('how many times is this loading');
        $scope.myBeerList = '';
    
        FirebaseService.getUsersBeers()
        .then((data) => {
            $scope.myBeerList = data.data;
        });
    });


};

angular.module('beer').controller('MyBeersController', MyBeersController);