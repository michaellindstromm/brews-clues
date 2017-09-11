let PlayListsController = function ($scope, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, BeerService, VisionService) {

    $scope.beerSearch = function() {
        BeerService.beerDBTest()
        .then((data) => {
            console.log("DID THIS RUN?????", data.data.data);
        });
    };

    $scope.getImage = function() {
        var file = document.querySelector('#files').files[0];
        console.log("file", file);
        // prints the base64 stringd
        VisionService.getBase64(file);
    }

    // $scope.beerSearch();

};

angular.module('beer').controller('PlayListsController', PlayListsController);