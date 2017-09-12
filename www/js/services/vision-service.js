let VisionService = function($http, $q, VisionKey) {

    const getVisionKey = function() {
        let apiKey = VisionKey.getVisionKey();
        return apiKey;
    }

    const getTextFromImage = function(json) {
        return $http.post(`https://vision.googleapis.com/v1/images:annotate?key=${getVisionKey()}`, json)
        .then((response) => {

            let visionTextResponse = response.data.responses[0];
            
            return visionTextResponse;

        })
        .catch((error) => {
            console.log("error", error);
        });
    }

    const findBeerNames = function(text) {
        console.log("text", text);
    }


    return { getTextFromImage };

};

angular.module('beer').factory('VisionService', VisionService);