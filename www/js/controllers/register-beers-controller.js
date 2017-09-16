let RegisterBeersController = function ($scope, $window, $state, $timeout, $ionicLoading, NearestNeighborService, BeerService, FirebaseService) {

    $scope.beersLoaded = false;

    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        template: '<ion-spinner icon="ripple"></ion-spinner>',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    console.log('local', $window.localStorage.getItem('uglyID'));

    FirebaseService.getRegisterBeerList()
    .then((data) => {
         $scope.registerBeerList = data.data;
         $ionicLoading.hide();
         $scope.beersLoaded = true;
         console.log('data.data', data.data);
         FirebaseService.setCurrentlyViewedBeers(data.data);
         let beer = FirebaseService.getCurrentlyViewedBeers();
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
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            template: '<ion-spinner icon="ripple"></ion-spinner>',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $timeout(() => {
            $ionicLoading.hide();
            $state.go('app.brews.myBeers')
        }, 3000);
    }

    

};

angular.module('beer').controller('RegisterBeersController', RegisterBeersController);