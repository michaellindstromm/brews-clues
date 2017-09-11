let VisionService = function($http, VisionKey) {

    const getVisionKey = function() {
        let apiKey = VisionKey.getVisionKey();
        return apiKey;
    }

    const getBase64 = function(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {

            let imagedata = reader.result;

            imagedata = imagedata.split('');

            imagedata = imagedata.splice(23, imagedata.length);

            imagedata = imagedata.join('');

            let vision_api_json = {
                "requests": [
                    {
                        "image": {
                            "content": imagedata
                        },
                        "features": [
                            {
                                "type": 'TEXT_DETECTION'
                            }
                        ]
                    }
                ]
            };

           let OCRText = getTextFromImage(vision_api_json);

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const getTextFromImage = function(json) {
        $http.post(`https://vision.googleapis.com/v1/images:annotate?key=${getVisionKey()}`, json)
        .then((response) => {

            let visionTextResponse = response.data.responses[0];

            console.log("TEXT DATA!!!! WILL THIS WORK!!!", visionTextResponse);
            
            return visionTextResponse;

        })
        .catch((error) => {
            console.log("error", error);
        });
    }

    const findBeerNames = function(text) {
        console.log("text", text);
    }

    return { getBase64 };

};

angular.module('beer').factory('VisionService', VisionService);