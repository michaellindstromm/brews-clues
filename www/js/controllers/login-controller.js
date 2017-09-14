let LoginController = function(AuthService, FirebaseService, $timeout, $scope, $state, $rootScope ) {
    
    // console.log("isloggedin", $rootScope.isLoggedIn())

    // $('#loginEmail').val('');
    // $('#loginPass').val('');

    // if ($rootScope.isLoggedIn()) {

    //         $state.go('app.brews.suggestions')

    // }


    $scope.login = function (email, password) {

        // AuthService.loginFirebaseUser(email, password)
        // .then((response) => {
        //     console.log("controller response", response);

        //     FirebaseService.getUsers()
        //     .then((data) => {
        //         let users = data.data;
        //         let keys = Object.keys(users);

        //         let correctUser;

        //         $(keys).each((index, item) => {
        //             let thisUser = users[item];
        //             if (thisUser.email === response.email) {
        //                 correctUser = response.uglyID;
        //             }
        //         })

        //         if (correctUser !== null) {
        //             AuthService.setCurrentUser(correctUser);
        //             $state.go('app.brews.suggestions');
        //         }
        //     })
        // })
        // .catch((error) => {
        //     console.log("controller error", error);
        // });
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