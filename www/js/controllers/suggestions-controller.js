let SuggestionsController = function ($scope, $window, $ionicLoading, BeerService, FirebaseService, NearestNeighborService) {
    $scope.$on('$ionicView.beforeEnter', function () {

        $scope.toggleBigCard = function($event) {
  
            let cT = $event.currentTarget;

            if ($(cT).next().hasClass('showCard')) {
                $(cT).next().addClass('hideCard');
                $(cT).next().removeClass('showCard');
            } else if ($(cT).next().hasClass('hideCard')) {
                $(cT).next().addClass('showCard');
                $(cT).next().removeClass('hideCard');
            } else {
                $(cT).next().addClass('showCard');
            }
        };

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            template: '<ion-spinner icon="ripple"></ion-spinner>',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });


        // -KuFl-i0lXCsoyJpGg0Y
        // This will be gotten from local storage and set when user logs in
        $window.localStorage.setItem('uglyID', '-KuFl-i0lXCsoyJpGg0Y');
        console.log('userlocal', $window.localStorage.getItem('uglyID'));

        $scope.beerSuggestions = '';
        
        FirebaseService.getUsersBeers()
        .then((response) => {

            // All my beers
            let allMyBeers = response.data;

            // Split b/w unrated and already rated beers
            let split = NearestNeighborService.splitUnratedAndRated(allMyBeers);

            // IDs = all of the unrated beers
            let IDs = split[0];

            // ratedBeers = rated beers on list sorted in ascending order by rating
            // USE THIS TO SHOW HIGHEST RATED ON CURRENT BEER MENU
            let ratedBeersUntouched = split[1];


            // Get correct Test Params for comparison
            let ratedBeers = NearestNeighborService.onlyTestParamsFunction(allMyBeers, true);

            // Get unrated beers correct test params info
            NearestNeighborService.getUnratedInfo(IDs)
            .then((unratedBeers) => {
                let normalizedUnrated = NearestNeighborService.normalizeUnratedBeers(ratedBeers, unratedBeers);

                let normalizedRated = NearestNeighborService.normalizeRatedBeers(ratedBeers);

                let eucVals = NearestNeighborService.compareNormalizedData(normalizedRated, normalizedUnrated, ratedBeersUntouched);

                let suggestions = NearestNeighborService.getSuggestions(eucVals);

                let unratedBeersToShow = NearestNeighborService.createSuggestedBeersObject(suggestions, unratedBeers);

                let keys = Object.keys(unratedBeersToShow);
                $(keys).each((index, item) => {
                    if (unratedBeersToShow[item].labels === undefined) {
                        unratedBeersToShow[item].labels = {icon: '../img/pint_glass.jpg', medium: '../img/pint_glass.jpg', large: '../img/pint_glass.jpg'}
                    }
                });

                $scope.someBrews = unratedBeersToShow;
                $ionicLoading.hide();
            });
        });

    })
   

};

angular.module('beer').controller('SuggestionsController', SuggestionsController);