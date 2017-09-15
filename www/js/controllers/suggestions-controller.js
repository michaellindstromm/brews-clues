let SuggestionsController = function ($scope, BeerService) {
    
    $scope.beerSuggestions = '';

    // testID for ---- Lagunitas IPA
    let testID = 'iLlMCb';

    // BeerService.getBeersByID( testID )
    // .then((data) => {
    //     console.log("data", data.data.data[0]);
    // });

};

angular.module('beer').controller('SuggestionsController', SuggestionsController);