let NearestNeighborService = function($timeout, $q, FirebaseService, BeerService, $window) {

    // let params = ['abv', 'ibu', 'srmId', 'ogMin', 'fgAvg'];

    // const pushListToFirebase = function() {
    //     for (var i = 0; i < beerFoundationList.length; i++) {
    //         var beerName = beerFoundationList[i];

    //         BeerService.getBeersBySearch(beerName)
    //         .then((data) => {
    //             console.log("data", data.data.data[0]);
    //             let eachBeer = data.data.data[0];
    //             FirebaseService.pushInitialBeers(eachBeer);
    //         });

    //     }
    // };

    const splitUnratedAndRated = function(obj) {

        // This first part is just setup for testing. Will get a string from QR Code that will look like setupAllBeers.
        let setupAlreadyRatedBeers = 'fu2qgB\nZoBIHx\naMyzLn\ns5lxSd\nsCgeAO\nuzOl1k\nd9iNtl\nIH5ajM\n1RvWY5\ncdkpyx';
        let setupUnratedBeers = 'KhYQ9T\nL3Juq0\n5WWDVq\nksF9st\nsiPwY9\nOwh80E\niwiRoK\ncG6leo\nChfN0e\neke8de\nfdaHy4\nH61Gte\nBon4k4';
        let setupAllBeers = 'fu2qgB\nZoBIHx\naMyzLn\ns5lxSd\nsCgeAO\nuzOl1k\nd9iNtl\nIH5ajM\n1RvWY5\ncdkpyx\nKhYQ9T\nL3Juq0\n5WWDVq\nksF9st\nsiPwY9\nOwh80E\niwiRoK\ncG6leo\nChfN0e\neke8de\nfdaHy4\nH61Gte\nBon4k4';


        // Split string by carriage return
        let split = setupAllBeers.split('\n');

        
        // Split into arrays of already rated and unrated beers
        let afterSplitMyBeers = [];
        let afterSplitUnknown = [];

        for (var i = 0; i < split.length; i++) {
            var element = split[i];
            if (obj[element] !== undefined) {
                afterSplitMyBeers.push(obj[element]);
            }  else {
                afterSplitUnknown.push(element);
            }
        }

        // Sort rated beers by highest rating. This is to show user highest rated beers

        afterSplitMyBeers.sort((a, b) => {
            return b.rating - a.rating;
        });


        // Split unrated beers into chunks of 10. 
        // This is because the breweryDB API can take up to 10 ids in one $http request

        let chunkUnknown = [];

        let chunkSize = 10;

        for (var j = 0; j < afterSplitUnknown.length; j+=chunkSize) {
            chunkUnknown.push(afterSplitUnknown.slice(j, j+chunkSize))
        }

        let newChunk = {};

        for (var i = 0; i < chunkUnknown.length; i++) {
            var element = chunkUnknown[i];
            newChunk[i] = element.join(',');
        }
        
        let unratedChunkAndMyBeers = [];
        unratedChunkAndMyBeers.push(newChunk, afterSplitMyBeers);
        return unratedChunkAndMyBeers;

    };

    
    const getUnratedInfo = function(beers) {

        return $q((resolve, reject) => {

            let keys = Object.keys(beers);
    
            let promises = [];
    
           $(keys).each((index, item) => {
                let IDs = beers[index];
                let promise = BeerService.getBeersByID(IDs)
                .then((data) => {
                    let response = data.data.data;
                    return response;
                });
    
                promises.push(promise);
            });
    
            $q.all(promises).then((response) => {
    
            // ARRAY METHODS!
            // [].concat.apply to reduce from array of arrays to array of elements which are all objects
               let flatten = [].concat.apply([], response);
    
            // array.reduce to create object of objects
               let singleObj = flatten.reduce((obj, item) => {
                   obj[item.id] = item;
                   return obj;
               }, {});
    
    
               // Create obj with user beer's id's as keys
    
               let onlyTestParams = {};
    
               let keys = Object.keys(singleObj);
               $(keys).each((index, item) => {
                   let oneBeer = singleObj[item];
                   onlyTestParams[keys[index]] = {};
               });
    
               // Get only necessarry calculation info from each beer
    
               $(keys).each((index, item) => {
                   let oneBeer = singleObj[item];
    
                   if (oneBeer.ibu === undefined) {
                       let styleAvgIbu = (Number(oneBeer.style.ibuMax) + Number(oneBeer.style.ibuMin)) / 2;
                       onlyTestParams[keys[index]].ibu = styleAvgIbu;
                   } else {
                       onlyTestParams[keys[index]].ibu = Number(oneBeer.ibu);
                   }
    
                   if (oneBeer.abv === undefined) {
                       let styleAvgAbv = (Number(oneBeer.style.abvMax) + Number(oneBeer.style.abvMin)) / 2;
                       onlyTestParams[keys[index]].abv = styleAvgAbv;
                   } else {
                       onlyTestParams[keys[index]].abv = Number(oneBeer.abv);
                   }
    
                   if (oneBeer.srmId === undefined) {
                       onlyTestParams[keys[index]].srm = Number(oneBeer.style.srmMin);
                   } else {
                       onlyTestParams[keys[index]].srm = Number(oneBeer.srmId);
                   }
    
                   let fgAvg = ((Number(oneBeer.style.fgMax) + Number(oneBeer.style.fgMin)) / 2).toFixed(3);
    
                   onlyTestParams[keys[index]].ogMin = Number(oneBeer.style.ogMin);
                   onlyTestParams[keys[index]].fgAvg = Number(fgAvg);
                   onlyTestParams[keys[index]].id = keys[index];
                   onlyTestParams[keys[index]].name = oneBeer.name;
               });
               resolve(onlyTestParams);
            });
        });
    };

    

    return { getUnratedInfo, splitUnratedAndRated};

};

angular.module('beer').factory('NearestNeighborService', NearestNeighborService);