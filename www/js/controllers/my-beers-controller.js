let MyBeersController = function ($scope, $timeout, $window, BeerService, FirebaseService) {
    $scope.$on('$ionicView.beforeEnter', function () {
        // update campaigns everytime the view becomes active
        // (on first time added to DOM and after the view becomes active after cached
        

        $scope.markEditing = function(id) {
            $(`div[data-rating='${id}old']`).addClass('ng-hide');
            $(`div[data-rating='${id}old']`).removeClass('ng-show');
            $(`div[data-rating='${id}new']`).addClass('ng-show');
            $(`div[data-rating='${id}new']`).removeClass('ng-hide');
        }

        $scope.editMyBeers = function($event, id) {

            let thisCard = $event.currentTarget;
            console.log('thisCard', thisCard);

            console.log('target', $event.currentTarget);
            let thumb = $event.currentTarget;
            $(thumb).css('color', 'blue');

            // $(thisCard).parent().parent().parent().parent().addClass('addOrEditSuccess');
            // $timeout(() => {
            //     $(thisCard).parent().parent().parent().parent().removeClass('addOrEditSuccess');
            // }, 500);

            let test = $(`div[data-rating='${id}new']`).text();
            let rating = Number(test);
            FirebaseService.editBeerRating(id, rating);
        };
      
        $scope.toggleBigCard = function ($event, id) {

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

        console.log('how many times is this loading');
        $scope.myBeerList = '';
    
        FirebaseService.getUsersBeers()
        .then((data) => {

            let keys = Object.keys(data.data);
            $(keys).each((index, item) => {

                let thisBeer = data.data[item];

                if (thisBeer.labels === undefined) {
                    thisBeer.labels = { icon: '../img/pint_glass.jpg', medium: '../img/pint_glass.jpg', large: '../img/pint_glass.jpg' }
                }
            });

            // console.log('data.data', data.data);


            // let holdArr = [];

            // $(keys).each((index, item) => {
            //     holdArr.push(data.data[item]);
            // });

            // console.log("holdArr", holdArr);

            // let sortedArr = holdArr.sort((a, b) => {
            //     console.log('a.name', a.name);
            //     console.log('b.name', b.name);
            //     return a.name - b.name;
            // });

            // console.log('sortedArr', sortedArr);

            // let beerObj = {};

            // for (var i = 0; i < sortedArr.length; i++) {
            //     var element = sortedArr[i];
            //     beerObj[element.id] = element;
            // }

            console.log('data.data', data.data);

            let myBeersArr = [];

            $(keys).each((mindex, mitem) => {
                myBeersArr.push(data.data[mitem]);
            });


            myBeersArr.sort((a, b) => {
                return b.rating - a.rating;
            });

            let cervezas = {};

            for (var i = 0; i < myBeersArr.length; i++) {
                var element = myBeersArr[i];
                cervezas[element.id] = element;
            }

            $scope.myBeerList = cervezas;
        });
    });


};

angular.module('beer').controller('MyBeersController', MyBeersController);