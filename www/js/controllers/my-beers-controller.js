let MyBeersController = function ($scope, BeerService, FirebaseService) {

    $scope.$on('$ionicView.beforeEnter', function () {
        // update campaigns everytime the view becomes active
        // (on first time added to DOM and after the view becomes active after cached
      
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