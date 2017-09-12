let BeerService = function ($http, BeerKey) {

    const getBeerKey = function() {
        let apiKey = BeerKey.getBeerKey();
        return apiKey;
    }

    const getBeersBySearch = function(search) {
        return $http.get(`http://api.brewerydb.com/v2/search?q=${search}&type=beer&key=${getBeerKey()}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    const getAllBeers = function(ids) {
        return $http.get(`http://api.brewerydb.com/v2/beers/?ids=${ids}&key=${getBeerKey()}`)
            .then((response) => {
                console.log("response", response);
                return response;
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    return { getBeersBySearch, getAllBeers };

};

angular.module('beer').factory('BeerService', BeerService);