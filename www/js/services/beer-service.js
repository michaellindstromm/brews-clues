let BeerService = function ($http, $window, BeerKey) {

    const getBeerKey = function() {
        let apiKey = BeerKey.getBeerKey();
        return apiKey;
    }

    const getBeersBySearch = function(search) {
        return $http.get(`https://brewscluesd21.herokuapp.com/api/brewerydb/search?q=${search}&type=beer&key=${getBeerKey()}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error", error.status);
            return error.status;
        });
    };

    const getBeersByID = function(ids) {
        return $http.get(`https://brewscluesd21.herokuapp.com/api/brewerydb/beers/?ids=${ids}&key=${getBeerKey()}`)
            .then((response) => {
                console.log("response", response);
                return response;
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const getAllCategories = function() {
        return $http.get(`https://brewscluesd21.herokuapp.com/api/brewerydb/categories/?key=${getBeerKey()}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('error', error);
        });
    };

    const getAllStyles = function () {
        return $http.get(`https://brewscluesd21.herokuapp.com/api/brewerydb/styles/?key=${getBeerKey()}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return { getBeersBySearch, getBeersByID, getAllCategories, getAllStyles };

};

angular.module('beer').factory('BeerService', BeerService);