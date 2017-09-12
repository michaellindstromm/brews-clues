let AddBeerController = function ($scope, BeerService) {

    $scope.searchBeersFromUserInput = function () {
        let search = document.querySelector('#beerListGenTest').value;
        BeerService.getBeersBySearch(search)
            .then((data) => {
                console.log("data", data);
            });
    };

};

angular.module('beer').controller('AddBeerController', AddBeerController);