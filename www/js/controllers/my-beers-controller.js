let MyBeersController = function ($scope, BeerService, FirebaseService) {


    FirebaseService.getUsersBeers()
    .then((data) => {
        $scope.myBeerList = data.data;
    });

};

angular.module('beer').controller('MyBeersController', MyBeersController);