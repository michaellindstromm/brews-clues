let LoginController = function(AuthService, $scope, $window, $state ) {
    
    $scope.login = function (email, password) {
        AuthService.setCurrentEmailAndPass(email, password);
    };

    $scope.logout = function () {
        AuthService.logout();
    };

    $scope.register = function() {
        $state.go('register');
    };

    $scope.goCameraTesting = function() {
        $state.go('app.camera');
    };

    
};

angular.module('beer').controller('LoginController', LoginController);