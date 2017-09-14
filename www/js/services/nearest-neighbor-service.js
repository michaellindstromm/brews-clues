let NearestNeighborService = function() {

    let beerFoundationList = ['Bud Light', 'Lagunitas IPA', 'Yazoo Dos Perros', 'Fat Tire'];

    let foundationListIDs = ['', 'iLlMCb', '', ''];

    let beerRatedList = [];
    
    const getRadomBeerFromFoundationList = function() {

        let randomBeer = Math.floor(Math.random() * beerFoundationList.length);

        return beerFoundationList[randomBeer];
    }

    return { getRadomBeerFromFoundationList }

};

angular.module('beer').factory('NearestNeighborService', NearestNeighborService);