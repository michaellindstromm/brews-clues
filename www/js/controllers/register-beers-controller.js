let RegisterBeersController = function ($scope, NearestNeighborService, BeerService) {


    

    $scope.rate = function() {
        console.log(NearestNeighborService.getRadomBeerFromFoundationList());
    }

    

};

angular.module('beer').controller('RegisterBeersController', RegisterBeersController);