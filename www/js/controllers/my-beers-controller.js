let MyBeersController = function ($scope, $window, BeerService, FirebaseService) {
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
            let test = $(`div[data-rating='${id}new']`).text();
            let rating = Number(test);
            console.log('test', Number(test));
            FirebaseService.editBeerRating(id, rating);
        };
      
        $scope.toggleBigCard = function ($event, id) {

            $(`.flipper${id}`).addClass('flipped');

            let cT = $event.currentTarget;

            console.log('cT', cT);

            if ($(cT).next().hasClass('showCard')) {
                $(`.flipper${id}`).removeClass('flipped');
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
                if (data.data[item].labels === undefined) {
                    data.data[item].labels = { icon: '../img/pint_glass.jpg', medium: '../img/pint_glass.jpg', large: '../img/pint_glass.jpg' }
                }
            });
            $scope.myBeerList = data.data;
        });
    });


};

angular.module('beer').controller('MyBeersController', MyBeersController);