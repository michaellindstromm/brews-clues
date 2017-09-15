let NearestNeighborService = function(FirebaseService, BeerService) {

    let beerFoundationList = ['Bud Light', 'Lagunitas IPA', 'Yuengling Traditional Lager', 'Blue Moon', 'Yazoo Dos Perros', 'Angry Orchard Crisp Apple', 'Curious Traveler', 'Samuel Adams Oktoberfest', 'Sameul Adams Boston Lager', 'Goose Island IPA', 'Michelob Ultra Light', 'Stell Artois', 'Founders All Day IPA', 'KY Bourbon Barrel Ale', 'Guinness Irish Stout', 'Yee Haw Dunkel', 'Budweiser', 'Miller Light', 'New Belgium Fat Tire', 'Dogfish Head 60 Minute IPA', 'Dos Equis Amber', 'Yazoo Gerst', 'Shiner Bock', 'Bearwalker Maple Brown', 'Sea Dog Blue Paw', 'Sierra Nevada Pale Ale', 'Blackstone St. Charles Porter', 'Sweetwater IPA', 'Corona Extra', 'Not Your Fathers Root Beer', 'Coors Light', 'Redds Apple Ale', 'Traveler Grapefruit Shandy', 'Bells Two Hearted'];
    
    const getRadomBeerFromFoundationList = function() {

        let randomBeer = Math.floor(Math.random() * beerFoundationList.length);

        return beerFoundationList[randomBeer];
    }

    const pushListToFirebase = function() {
        for (var i = 0; i < beerFoundationList.length; i++) {
            var beerName = beerFoundationList[i];

            BeerService.getBeersBySearch(beerName)
            .then((data) => {
                console.log("data", data.data.data[0]);
                let eachBeer = data.data.data[0];
                FirebaseService.pushInitialBeers(eachBeer);
            });

        }
    };

    return { getRadomBeerFromFoundationList }

};

angular.module('beer').factory('NearestNeighborService', NearestNeighborService);