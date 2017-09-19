let NearestNeighborService = function($timeout, $window, $q, FirebaseService, BeerService, $window) {

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
        // let setupAlreadyRatedBeers = 'fu2qgB\nZoBIHx\naMyzLn\ns5lxSd\nsCgeAO\nuzOl1k\nd9iNtl\nIH5ajM\n1RvWY5\ncdkpyx';
        // let setupUnratedBeers = 'KhYQ9T\nL3Juq0\n5WWDVq\nksF9st\nsiPwY9\nOwh80E\niwiRoK\ncG6leo\nChfN0e\neke8de\nfdaHy4\nH61Gte\nBon4k4';
        // let setupAllBeers = 'fu2qgB\nZoBIHx\naMyzLn\ns5lxSd\nsCgeAO\nuzOl1k\nd9iNtl\nIH5ajM\n1RvWY5\ncdkpyx\nKhYQ9T\nL3Juq0\n5WWDVq\nksF9st\nsiPwY9\nOwh80E\niwiRoK\nChfN0e\neke8de\nfdaHy4\nH61Gte\nBon4k4';

        let setupAllBeers = $window.localStorage.getItem('listIDs');

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
    
    
               let onlyTestParams = onlyTestParamsFunction(singleObj, false);

               resolve(onlyTestParams);
            });
        });
    };

    const onlyTestParamsFunction = function(singleObj, status) {
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
            onlyTestParams[keys[index]].labels = oneBeer.labels;
            onlyTestParams[keys[index]].description = oneBeer.description;
            onlyTestParams[keys[index]].style = oneBeer.style;
            if (status) {
                onlyTestParams[keys[index]].rating = oneBeer.rating;
            }

        });
        return onlyTestParams;
    };

    const normalizeUnratedBeers = function(rated, unrated) {
        let params = ['ibu', 'abv', 'srm', 'ogMin', 'fgAvg'];
        let arraySortable = [];
        let ratedKeys = Object.keys(rated);
        $(ratedKeys).each((index, item) => {
            arraySortable.push(rated[item]);
        });

        let normalizedUnratedBeersArr = [];
        
        let unratedKeys = Object.keys(unrated);
        $(unratedKeys).each((index, item) => {
            let testBeer = unrated[item];

            arraySortable.push(testBeer);
            
            let holdArr = [];
            let ibuArr = [];
            let abvArr = [];
            let srmArr = [];
            let ogMinArr = [];
            let fgAvgArr = [];


            for (var i = 0; i < arraySortable.length; i++) {
                var element = arraySortable[i];
                if (isNaN(element.ibu)) {
                } else {
                    ibuArr.push(element.ibu);
                }

                if (isNaN(element.abv)) {
                } else {
                    abvArr.push(element.abv);
                }

                if (isNaN(element.srm)) {
                } else {
                    srmArr.push(element.srm);
                }


                if (isNaN(element.ogMin) ) {
                } else {
                    ogMinArr.push(element.ogMin);
                }

                if (isNaN(element.fgAvg)) {
                } else {
                    fgAvgArr.push(element.fgAvg);
                }
            }

            holdArr.push(ibuArr, abvArr, srmArr, ogMinArr, fgAvgArr);
            


            let testedBeerArr = [];
            let testedBeerObj = {};

            for (var i = 0; i < holdArr.length; i++) {
                var element = holdArr[i];
                element.sort((a, b) => {
                    return b - a;
                });
                let max = element[0];
                let min = element[element.length - 1];

                // console.log('max', max);
                // console.log('min', min);

                // console.log('testBeer[params[i]]', testBeer[params[i]]);

                if (isNaN(testBeer[params[i]])) {
                    testedBeerObj[params[i]] = null;
                } else {
                    testedBeerObj[params[i]] = (testBeer[params[i]] - min) / (max - min);
                }

                testedBeerArr.push(testedBeerObj[params[i]]);

                if (i === holdArr.length - 1) {
                    testedBeerArr.push(testBeer.id, testBeer.name);
                }
            }

            normalizedUnratedBeersArr.push(testedBeerArr);

            arraySortable.pop();
        });

        return normalizedUnratedBeersArr;

    };

    const normalizeRatedBeers = function(rated) {
        let params = ['ibu', 'abv', 'srm', 'ogMin', 'fgAvg'];
        let arraySortable = [];

        let normalizedRatedBeersArr = [];

        let keys = Object.keys(rated);
        $(keys).each((index, item) => {
            let testBeer = rated[item];
            arraySortable.push(testBeer);
        });

        let holdArr = [];
        let ibuArr = [];
        let abvArr = [];
        let srmArr = [];
        let ogMinArr = [];
        let fgAvgArr = [];


        for (var i = 0; i < arraySortable.length; i++) {
            var element = arraySortable[i];
        
            if (isNaN(element.ibu)) {
            } else {
                ibuArr.push(element.ibu);
            }

            if (isNaN(element.abv)) {
            } else {
                abvArr.push(element.abv);
            }

            if (isNaN(element.srm)) {
            } else {
                srmArr.push(element.srm);
            }


            if (isNaN(element.ogMin)) {
            } else {
                ogMinArr.push(element.ogMin);
            }

            if (isNaN(element.fgAvg)) {
            } else {
                fgAvgArr.push(element.fgAvg);
            }

        }
        holdArr.push(ibuArr, abvArr, srmArr, ogMinArr, fgAvgArr);

        let rateKeys = Object.keys(rated);
        $(rateKeys).each((index, item) => {
            let testBeer = rated[item];
            arraySortable.push(testBeer);
        

            let testedBeerArr = [];
            let testedBeerObj = {};


            for (var i = 0; i < holdArr.length; i++) {
                var element = holdArr[i];
                element.sort((a, b) => {
                    return b - a;
                });
                let max = element[0];
                let min = element[element.length - 1];

                // console.log('max', max);
                // console.log('min', min);

                // console.log('testBeer[params[i]]', testBeer[params[i]]);

                if (isNaN(testBeer[params[i]])) {
                    testedBeerObj[params[i]] = null;
                } else {
                    testedBeerObj[params[i]] = (testBeer[params[i]] - min) / (max - min);
                }

                testedBeerArr.push(testedBeerObj[params[i]]);

                if (i === holdArr.length - 1) {
                    testedBeerArr.push(testBeer.id, testBeer.name, testBeer.rating);
                }
            }

            normalizedRatedBeersArr.push(testedBeerArr);

        });

        return normalizedRatedBeersArr;

    };

    const compareNormalizedData = function(ratedList, unratedList, myBeersOnList) {
        ratedList.sort((a, b) => {
            return b[7] - a[7];
        });

        let holderArray = [];

        let newRated = [];
        let onListIDs = [];

        for (var k = 0; k < myBeersOnList.length; k++) {
            var element = myBeersOnList[k];
            onListIDs.push(element['id']);
        }

        for (var h = 0; h < ratedList.length; h++) {
            var testRate = ratedList[h];
            if (onListIDs.indexOf(testRate[5]) === -1) {
                newRated.push(testRate);
            } 
        }

        let euclideanValsArr = [];


        for (var i = 0; i < unratedList.length; i++) {
            var unratedBeer = unratedList[i];

            for (var j = 0; j < ratedList.length; j++) {
                var ratedBeer = ratedList[j];

                let ibuDelta = Math.pow((unratedBeer[0] - ratedBeer[0]), 2);
                let abvDelta = Math.pow((unratedBeer[1] - ratedBeer[1]), 2);
                let srmDelta = Math.pow((unratedBeer[2] - ratedBeer[2]), 2);
                let ogMinDelta = Math.pow((unratedBeer[3] - ratedBeer[3]), 2);
                let fgMinDelta = Math.pow((unratedBeer[4] - ratedBeer[4]), 2);

                let sum = ibuDelta + abvDelta + srmDelta + ogMinDelta + fgMinDelta;
                let euclideanVal = Math.sqrt(sum);



                 euclideanValsArr.push({ratedBeer: ratedBeer[5], unratedBeer: unratedBeer[5], eucVal: euclideanVal});
                
                
            }
        }
        
        euclideanValsArr.sort((a, b) => {
            return b.eucVal - a.eucVal;
        });

        holderArray.push(onListIDs, euclideanValsArr);
        
        return holderArray;
    };

    const getSuggestions = function(valArray) {

        let suggestionsArray = [];

        let alreadyOnListIDs = valArray[0];
        let comparisonVals = valArray[1];


        for (var i = 0; i < comparisonVals.length; i++) {
            var element = comparisonVals[i];
            if (suggestionsArray.length < 5 ) {
                if (alreadyOnListIDs.indexOf(element.ratedBeer) === -1 && suggestionsArray.indexOf(element.unratedBeer) === -1) {
                    suggestionsArray.push(element.unratedBeer);
                }
            } else {
                break;
            }
        }

        console.log('suggestionsArray', suggestionsArray);
        return suggestionsArray;

    };

    const createSuggestedBeersObject = function(suggestions, unratedBeers) {
        console.log('suggestionsController', suggestions);
        console.log('unratedBeers', unratedBeers);

        let beerObj = {};

        let keys = Object.keys(unratedBeers);
        $(keys).each((index, item) => {
            let beer = unratedBeers[item];
            if (suggestions.indexOf(beer.id) !== -1) {
                beerObj[beer.id] = beer;
            }
        });

        console.log('beerObj', beerObj);
        return beerObj;
    };
    

    return { getUnratedInfo, splitUnratedAndRated, onlyTestParamsFunction, normalizeUnratedBeers, normalizeRatedBeers, compareNormalizedData, getSuggestions, createSuggestedBeersObject };

};

angular.module('beer').factory('NearestNeighborService', NearestNeighborService);