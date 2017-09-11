let BeerService = function ($http, BeerKey) {

    const getBeerKey = function() {
        let apiKey = BeerKey.getBeerKey();
        return apiKey;
    }

    const beerDBTest = function() {
        return $http.get(`http://api.brewerydb.com/v2/search?q=Goosinator&type=beer&key=${getBeerKey()}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    return { beerDBTest };

};

angular.module('beer').factory('BeerService', BeerService);