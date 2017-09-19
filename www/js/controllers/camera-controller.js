

let CameraController = function ($scope, $state, $window, $timeout, $cordovaBarcodeScanner, $cordovaCamera, FirebaseService, BeerService, NearestNeighborService) {

    $scope.beerSearch = function() {
        BeerService.beerDBTest()
        .then((data) => {
            console.log("DID THIS RUN?????", data.data.data);
        });
    };
    $scope.scan = function() {
        // var options = {
        //     quality: 50,
        //     destinationType: Camera.DestinationType.DATA_URL,
        //     sourceType: Camera.PictureSourceType.CAMERA,
        //     allowEdit: true,
        //     encodingType: Camera.EncodingType.JPEG,
        //     targetWidth: 100,
        //     targetHeight: 100,
        //     popoverOptions: CameraPopoverOptions,
        //     saveToPhotoAlbum: false,
        //     correctOrientation: true
        // };

        // $cordovaCamera.getPicture(options).then(function (imageData) {
        //     var image = document.getElementById('myImage');
        //     image.src = "data:image/jpeg;base64," + imageData;
        // }, function (err) {
        //     // error
        // });

        $cordovaBarcodeScanner.scan()
        .then((data) => {
            console.log("data", data);
            let beers = data.text;
            console.log("beers: ", beers);

            NearestNeighborService.setBeerListIDs(beers);
            $state.go('app.brews.suggestions');
        })
        .catch((error) => {
            console.log("error", error);
        });
    };
    
};

angular.module('beer').controller('CameraController', CameraController);