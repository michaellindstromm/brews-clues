let AddBeerController = function ($scope, BeerService, FirebaseService) {
    $scope.$on('$ionicView.beforeEnter', function () {

        let currentBeers = {};
        $scope.search = function (search) {
            BeerService.getBeersBySearch(search)
                .then((data) => {
                    // console.log("data", data.data.data[0].name);
                    // let name = data.data.data[0].name;
                    let beersToShow = data.data.data;
                    let keys = Object.keys(beersToShow);
                    $(keys).each((index, item) => {
                        let eachBeer = beersToShow[item];
                        if (eachBeer.labels === undefined) {
                            eachBeer.labels = { icon: '../img/pint_glass.jpg', medium: '../img/pint_glass.jpg', large: '../img/pint_glass.jpg' }
                        }
                        currentBeers[eachBeer.id] = eachBeer;
                    });
                    $scope.someBrews = beersToShow;

                    $(keys).each((nindex, nitem) => {
                        let eachBeer = beersToShow[nitem];
                        let name = eachBeer.name;
                        let chars = name.split('');
                        if (chars.length > 19) {
                            console.log('longbeername', name);
                            console.log('chars', chars);
                            console.log('correct name element', $(`#name--${eachBeer.id}`));
                            console.log('beerID', eachBeer.id);
                            $(`#name--${eachBeer.id}`).css('font-size', '1rem');
                        }
                    });
                });
        };

        $scope.addOrEdit = ($event, id) => {
            FirebaseService.getUsersBeers()
                .then((data) => {

                    console.log('data', data.data);
                    console.log('current Beers', currentBeers);
                    let userBeers = data.data;
                    let keys = Object.keys(userBeers);
                    if (keys.indexOf(id) === -1) {
                        let thisBeer = currentBeers[id];
                        let beerObj = {};
                        beerObj[thisBeer.id] = thisBeer;
                        let test = $(`div[data-beer-rating='${id}']`).text();
                        console.log('test', test);
                        let userRating = Number(test);
                        beerObj[id].rating = userRating;
                        delete beerObj[id]['$$hashKey'];

                        FirebaseService.addSuggestedBeerToUserFirebase(beerObj);
                    } else {
                        let test = $(`div[data-beer-rating='${id}']`).text();
                        let rating = Number(test);
                        console.log('test', Number(test));
                        FirebaseService.editBeerRating(id, rating);
                    }
                });

        };

    });

    $scope.toggleBigCard = function ($event) {

        let cT = $event.currentTarget;

        console.log('cT', cT);

        if ($(cT).next().hasClass('showCard')) {
            $(cT).next().addClass('hideCard');
            $(cT).next().removeClass('showCard');
        } else if ($(cT).next().hasClass('hideCard')) {
            $(cT).next().addClass('showCard');
            $(cT).next().removeClass('hideCard');
        } else {
            $(cT).next().addClass('showCard');
        }
    };

};

angular.module('beer').controller('AddBeerController', AddBeerController);