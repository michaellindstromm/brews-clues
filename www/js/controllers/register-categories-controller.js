let RegisterCategoriesController = function ($scope, $http, $window, BeerService) {

    // let catUglyID = "-Ku02RN-XCO50HgTll-k";

    // const showCategories = function() {
    //     return $http.get(`https://brews-clues-a07a1.firebaseio.com/${catUglyID}.json`)
    //     .then((data) => {
    //         console.log('data', data);
    //     })
    //     .catch((error) => {
    //         console.log('error', error);
    //     });
    // };

    // showCategories();

    let stylesUglyID = "-Ku02RocAtYTOZV_pe-T";


    const showStyles = function() {
        return $http.get(`https://brews-clues-a07a1.firebaseio.com/${stylesUglyID}.json`)
            .then((data) => {
                let styleObj = {};
                // console.log('data', data);
                $(data.data).each((index, item) => {
                    styleObj[index+1] = {
                        categoryId: item.categoryId,
                        name : item.name.toLowerCase(),
                        id: item.id
                    }
                });
                console.log('styleObj', styleObj);
                let newOrderedObj = {ipa:{}, stout:{}, porter:{}, pale:{}, pilsener:{}, red:{}, brown:{}, blonde:{}, wheat:{}, dark:{}, malt:{}, sour:{}, cider:{}, bitter:{}, lager:{}, wood:{}, fruit:{}, other:{}};
                let keys = Object.keys(styleObj);
                $(keys).each((index, item) => {
                    let eachOne = styleObj[item];
                    let name = eachOne.name.split(' ');
                    if (name.indexOf('india') !== -1) {
                        newOrderedObj.ipa[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('stout') !== -1) {
                        newOrderedObj.stout[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('porter') !== -1) {
                        newOrderedObj.porter[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('pale') !== -1) {
                        newOrderedObj.pale[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('pilsener') !== -1) {
                        newOrderedObj.pilsener[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('red') !== -1) {
                        newOrderedObj.red[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('brown') !== -1) {
                        newOrderedObj.brown[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('blonde') !== -1) {
                        newOrderedObj.blonde[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('wheat') !== -1) {
                        newOrderedObj.wheat[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('dark') !== -1) {
                        newOrderedObj.dark[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('malt') !== -1) {
                        newOrderedObj.malt[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('sour') !== -1) {
                        newOrderedObj.sour[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('cider') !== -1) {
                        newOrderedObj.cider[index+1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('bitter') !== -1) {
                        newOrderedObj.bitter[index + 1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('lager') !== -1) {
                        newOrderedObj.lager[index + 1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('wood') !== -1) {
                        newOrderedObj.wood[index + 1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else if (name.indexOf('fruit') !== -1) {
                        newOrderedObj.fruit[index + 1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    } else {
                        newOrderedObj.other[index + 1] = {
                            categoryId: eachOne.categoryId,
                            name: eachOne.name,
                            id: eachOne.id
                        }
                    }
                })
                console.log('newOrderedObj', newOrderedObj);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };


    showStyles();


};

angular.module('beer').controller('RegisterCategoriesController', RegisterCategoriesController);