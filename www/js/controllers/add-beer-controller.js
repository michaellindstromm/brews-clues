let AddBeerController = function ($scope, BeerService) {

    $scope.search = function (search) {
        BeerService.getBeersBySearch(search)
            .then((data) => {
                // console.log("data", data.data.data[0].name);
                // let name = data.data.data[0].name;
                $('#searchOutput').text(data);
            });
    };

};

angular.module('beer').controller('AddBeerController', AddBeerController);