let AuthController = function($cordovaOauth, AuthService, $scope, $window) {

    console.log("cordovaOauth", $cordovaOauth);

    $scope.login = '';

    let currentUser = AuthService.getCurrentUser();

    console.log("currentUser", currentUser);
    
    $scope.login = function() {
        $cordovaOauth.google(AuthService.getClientID(), ["email"])
        .then((result) => {
            console.log("Response Object -> " + JSON.stringify(result));
        }) 
        .catch((error) => {
            console.log("Error -> " + error);
        });

    };

        // AuthService.loginWithGoogle()
        // .then((result) => {
        //     console.log("result", result);
        // });

};

angular.module('beer').controller('AuthController', AuthController);