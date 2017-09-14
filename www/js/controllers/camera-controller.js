

let CameraController = function ($scope, $window, $timeout, $cordovaBarcodeScanner, $cordovaCamera, FirebaseService, BeerService) {
    
    // console.log("qr", QRScanner);

    console.log("pTag", $('#displayText').text());

    console.log("barCode", $cordovaBarcodeScanner);

    console.log("firebaseservice", FirebaseService.pushTextToFirebase);

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
            let beers = data.text.split('\n');
            console.log("beers: ", beers);

            $(beers).each((index, item) => {
                $('#displayText').append(item + '<br>');
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    // $scope.getImage = function() {
    //     var file = document.querySelector('#files').files[0];
    //     console.log("file", file);
    //     // prints the base64 stringd
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    
    //         let imagedata = reader.result;
    
    //         imagedata = imagedata.split('');
    
    //         imagedata = imagedata.splice(23, imagedata.length);
    
    //         imagedata = imagedata.join('');
    
    //         let vision_api_json = {
    //             "requests": [
    //                 {
    //                     "image": {
    //                         "content": imagedata
    //                     },
    //                     "features": [
    //                         {
    //                             "type": 'TEXT_DETECTION'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         };
    
    //         VisionService.getTextFromImage(vision_api_json)
    //             .then((data) => {
    //                 let text = data.fullTextAnnotation.text;
    //                 console.log("text", text);
    //                 findBeerNamesInText(text);
    //             })
    
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
        
        
    // };


    // $scope.beerSearch();

    // $scope.testPush = function() {
    //     let data = { text: "Sam Adams\nBudweiser\nDogfish Head IPA\nLagunitas IPA\nYazoo Dos Perros"};
    //     console.log('controller', data);
    //     FirebaseService.pushTextToFirebase(data);
    // }

    // $scope.testTextManipulation = function() {
    //     let data = { text: "Sam Adams\nBudweiser\nDogfish Head IPA\nLagunitas IPA\nYazoo Dos Perros" };
    //     let beers = data.text.split('\n');
    //     console.log("beers: ", beers);
    //     $(beers).each((index, item) => {
    //         $('#displayText').append(item + '<br>');
    //     });
    // }
    

};

angular.module('beer').controller('CameraController', CameraController);