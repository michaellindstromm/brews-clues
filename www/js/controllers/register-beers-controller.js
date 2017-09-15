let RegisterBeersController = function ($scope, $window, NearestNeighborService, BeerService, FirebaseService) {


    console.log('local', $window.localStorage.getItem('uglyID'));

    FirebaseService.getRegisterBeerList()
    .then((data) => {
         $scope.registerBeerList = data.data;
         FirebaseService.setCurrentlyViewedBeers(data.data);
         let beer = FirebaseService.getCurrentlyViewedBeers();
         console.log("beer", beer);
    });
    




    $scope.rate = function() {
        // console.log(NearestNeighborService.getRadomBeerFromFoundationList());
        let ratingOutput = $('.ratingOutput');

        let beers = FirebaseService.getCurrentlyViewedBeers();

        $(ratingOutput).each((index, item) => {
            console.log('ratingOutput', item.innerText);
            if (item.innerText !== "") {
                beers[index].rating = Number(item.innerText);
            }
        });

        FirebaseService.rateBeers();
    }

    

};

angular.module('beer').controller('RegisterBeersController', RegisterBeersController);