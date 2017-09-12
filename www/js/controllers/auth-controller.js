let AuthController = function($cordovaGooglePlus, AuthService, $scope, $window) {

    console.log("googleplus", $cordovaGooglePlus);

    $scope.login = '';

    let currentUser = AuthService.getCurrentUser();

    console.log("currentUser", currentUser);
    
    $scope.login = function() {
        $cordovaGooglePlus.login(
            {
                'webClientId': '24755791061-tn51l2juoa9hco7osf91ts3slatj29b4.apps.googleusercontent.com'
            },
            function(userData) {
                console.log("userdata", userData);
            }
        );



        // AuthService.loginWithGoogle()
        // .then((result) => {
        //     console.log("result", result);
        // });
    };

};

angular.module('beer').controller('AuthController', AuthController);