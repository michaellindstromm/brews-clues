let RegisterBeersController = function ($scope, NearestNeighborService, BeerService, FirebaseService) {


    FirebaseService.getRegisterBeerList()
    .then((data) => {
         $scope.registerBeerList = data.data;
         FirebaseService.setCurrentlyViewedBeers(data.data);
         let beer = FirebaseService.getCurrentlyViewedBeers();
         console.log("beer", beer);
    });
    



    $scope.rate = function() {
        console.log(NearestNeighborService.getRadomBeerFromFoundationList());
    }

    

};

angular.module('beer').controller('RegisterBeersController', RegisterBeersController);