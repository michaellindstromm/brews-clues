let SuggestionsController = function ($scope, $window, BeerService, FirebaseService, NearestNeighborService) {
    // $scope.$on('$ionicView.beforeEnter', function () {

        // -KuFl-i0lXCsoyJpGg0Y
        // This will be gotten from local storage and set when user logs in
        $window.localStorage.setItem('uglyID', '-KuFl-i0lXCsoyJpGg0Y');
        console.log('userlocal', $window.localStorage.getItem('uglyID'));

        $scope.beerSuggestions = '';
        
        FirebaseService.getUsersBeers()
            .then((response) => {
                console.log('response', response);

                // Used for comparison of unrated
                let myBeers = response;

                // Split b/w unrated and already rated beers
                let split = NearestNeighborService.splitUnratedAndRated(response.data);

                // IDs = all of the unrated beers
                let IDs = split[0];

                // ratedBeers = rated beers on list sorted in ascending order by rating
                let ratedBeers = split[1];

                NearestNeighborService.getUnratedInfo(IDs)
                .then((unrated) => {
                    console.log('turdBucket', unrated);
                    $scope.someBrews = unrated;
                });
            });

    // });

};

angular.module('beer').controller('SuggestionsController', SuggestionsController);