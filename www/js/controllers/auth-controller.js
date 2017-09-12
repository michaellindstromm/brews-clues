let AuthController = function($cordovaGooglePlus, AuthService, $scope) {

    $scope.login = '';

    let currentUser = AuthService.getCurrentUser();

    console.log("currentUser", currentUser);
    
    $scope.login = function() {
        AuthService.loginWithGoogle()
        .then((result) => {
            console.log("result", result);
        });
    };

};

angular.module('beer').controller('AuthController', AuthController);