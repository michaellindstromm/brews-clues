let BeerKey = function() {

    const apiKey = '858c317e739adfde1bbe7c407c0d5036';

    let getBeerKey = function () {
        return apiKey;
    };

    return { getBeerKey };

};

angular.module('beer').factory('BeerKey', BeerKey);