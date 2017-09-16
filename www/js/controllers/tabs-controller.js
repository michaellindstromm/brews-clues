let TabsController = function($state, $window, $scope, $location) {
    $scope.goBeers = function() {
        console.log('local', $window.localStorage.getItem('uglyID'));
        // $state.go('app.brews.myBeers');
        $state.go('app.brews.myBeers');
    };

    $scope.goSuggestions = function() {
        $state.go('app.brews.suggestions');
    };

    $scope.goAddBeer = function() {
        $state.go('app.brews.addBeer')
    };
};  

angular.module('beer').controller('TabsController', TabsController);