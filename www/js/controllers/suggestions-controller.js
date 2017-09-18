let SuggestionsController = function ($scope, $window, BeerService, FirebaseService, NearestNeighborService) {
    // $scope.$on('$ionicView.beforeEnter', function () {

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

            console.log('ratedBeersUntouched', ratedBeersUntouched);

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


                $scope.someBrews = unratedBeersToShow;
            });
        });

    // });

};

angular.module('beer').controller('SuggestionsController', SuggestionsController);