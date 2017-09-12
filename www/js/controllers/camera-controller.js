let CameraController = function ($scope, $window, $timeout, $cordovaCamera, BeerService) {

    $scope.beerSearch = function() {
        BeerService.beerDBTest()
        .then((data) => {
            console.log("DID THIS RUN?????", data.data.data);
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

    const findBeerNamesInText = function(text) {
        // let onLettersAndCarriage = text.replace(/[\W]/g, '');

        // console.log("onLetters", onLettersAndCarriage);
        // let splitByCarriage = onLettersAndCarriage.split(/\n/g, '');
        
        // console.log('splitByCarriage', splitByCarriage);

        // for (var index = 0; index < splitByCarriage.length; index++) {
        //     var element = splitByCarriage[index];
            
        //     let onlyLetters = element.replace(//g)
            
        // }

        // let noLetters = text.replace(/[^A-Za-z]/g, '');
        
    };

    const doSomething = function (error, text) {
        if (error) {
            $window.alert("error", error);
        } else {
            $window.alert(text);
        }
    }

    // $scope.beerSearch();
    $scope.scan = function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // error
        });
    };

};

angular.module('beer').controller('CameraController', CameraController);