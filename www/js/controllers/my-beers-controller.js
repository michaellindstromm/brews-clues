let MyBeersController = function ($scope, $ionicLoading, BeerService, FirebaseService) {

    $scope.$on('$ionicView.beforeEnter', function () {
        // update campaigns everytime the view becomes active
        // (on first time added to DOM and after the view becomes active after cached
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            template: '<ion-spinner icon="ripple"></ion-spinner>',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        console.log('how many times is this loading');
        $scope.myBeerList = '';
    
        FirebaseService.getUsersBeers()
        .then((data) => {
            $scope.myBeerList = data.data;
            $ionicLoading.hide();
        });
    });


};

angular.module('beer').controller('MyBeersController', MyBeersController);