let SuggestionsController = function ($scope, $window, $ionicLoading, BeerService, FirebaseService, NearestNeighborService) {
    $scope.isLoaded = false;

    $scope.firstLogin = false;

    $scope.$on('$ionicView.beforeEnter', function () {
        
        
        $scope.addOrEdit = ($event, id) => {

            FirebaseService.getUsersBeers()
            .then((data) => {
                let userBeers = data.data;
                let keys = Object.keys(userBeers);
                console.log('keys', keys);
                console.log('target', $event.currentTarget);
                let thumb = $event.currentTarget;
                $(thumb).css('color', 'blue');
                if (keys.indexOf(id) === -1) {
                    let beerObj = {};
                    let unrated = FirebaseService.getUnratedBeers();
                    let beerToAdd = unrated[id];
                    beerObj[beerToAdd.id] = beerToAdd;
                    let test = $(`div[data-beer-rating='${id}']`).text();
                    console.log('test', test);
                    let userRating = Number(test);
                    console.log('userRating', userRating);
                    beerObj[id].rating = userRating;
                    
                    FirebaseService.addSuggestedBeerToUserFirebase(beerObj);
                } else {
                    let test = $(`div[data-beer-rating='${id}']`).text();
                    let rating = Number(test);
                    console.log('test', Number(test));
                    FirebaseService.editBeerRating(id, rating);
                }
            });
            
        };

        $scope.toggleBigCard = function($event) {
            
            let cT = $event.currentTarget;
            
            console.log('cT', cT);
            
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
        
        $scope.beerSuggestions = '';

        if ($window.localStorage.getItem('listIDs') === null) {
            $ionicLoading.hide();
            $scope.firstLogin = true;

        } else {

            // console.log('localList', $window.localStorage.getItem('listIDs'));

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
                
                $ionicLoading.hide();

                console.log('IDs', IDs);
                // Get unrated beers correct test params info
                NearestNeighborService.getUnratedInfo(IDs)
                .then((unratedBeers) => {
                    
                    FirebaseService.setUnratedBeers(unratedBeers);
                    
                    
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
                    
                    console.log('ratedBeersUntouch', ratedBeersUntouched);
                    
                    let top5RatedOnList = [];
                    
                    for (var i = 0; i < 5; i++) {
                        var element = ratedBeersUntouched[i];
                        top5RatedOnList.push(element);
                    }
                    
                    $scope.isLoaded = true;
                    
                    $scope.myBrews = top5RatedOnList;
                    $scope.someBrews = unratedBeersToShow;
                    
                    
                });
            });

        }
        
        
    });
    
    
};

angular.module('beer').controller('SuggestionsController', SuggestionsController);