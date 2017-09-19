let MyBeersController = function ($scope, BeerService, FirebaseService) {

    // $scope.$on('$ionicView.beforeEnter', function () {
        // update campaigns everytime the view becomes active
        // (on first time added to DOM and after the view becomes active after cached
      
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
    // });


};

angular.module('beer').controller('MyBeersController', MyBeersController);