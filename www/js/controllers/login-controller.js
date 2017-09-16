let LoginController = function(AuthService, FirebaseService, $ionicLoading, $window, $timeout, $scope, $state, $rootScope ) {
    
    console.log("isloggedin", $rootScope.isLoggedIn())
    console.log('local', $window.localStorage.getItem('uglyID'));

    // $('#loginEmail').val('');
    // $('#loginPass').val('');

    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        template: '<ion-spinner icon="ripple"></ion-spinner>',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    
    if ($rootScope.isLoggedIn()) {

        $timeout(() => {
            $ionicLoading.hide();    
            $state.go('app.brews.suggestions')
        }, 2000)

    } else {

        $ionicLoading.hide();
    }


    $scope.login = function (email, password) {

        AuthService.loginFirebaseUser(email, password)
        .then((response) => {

            FirebaseService.getUsers()
            .then((data) => {
                let users = data.data;
                let keys = Object.keys(users);

                let correctUser;

                $(keys).each((index, item) => {
                    let thisUser = users[item];

                    if (thisUser.profile.email === response.email) {
                        correctUser = keys[index];
                    }
                })


                if (correctUser !== null && correctUser !== undefined) {
                    AuthService.setCurrentUser(correctUser);
                    $('#loginEmail').val('');
                    $('#loginPass').val('');
                    // location.reload();
                    $state.go('app.brews.suggestions');
                }
            })
        })
        .catch((error) => {
            console.log("controller error", error);
        });
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