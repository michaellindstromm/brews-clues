let LoginController = function(AuthService, FirebaseService, $timeout, $scope, $window, $state, $rootScope ) {
    
    console.log("isloggedin", $rootScope.isLoggedIn())

    $('#loginEmail').val('');
    $('#loginPass').val('');

    if ($rootScope.isLoggedIn()) {

        $timeout(() => {
            $state.go('app.brews.suggestions')
        }, 1500);
    }


    $scope.login = function (email, password) {

        // FirebaseService.createNewFirebaseUser(email, password);

        AuthService.loginFirebaseUser(email, password)
        .then((response) => {
            console.log("controller response", response);

            FirebaseService.getUsers()
            .then((data) => {
                let users = data.data;
                let keys = Object.keys(users);

                let correctUser;

                $(keys).each((index, item) => {
                    let thisUser = user[item];
                    if (thisUser.email === response.email) {
                        correctUser = response.uglyID;
                    }
                })

                if (correctUser !== null) {
                    AuthService.setCurrentUser(correctUser);
                    $state.go('app.brews.suggestions');
                }
            })
            // FirebaseService.getUsers()
            // .then((response) => {
            //     let users = response.data;
            //     let keys = Object.keys(users);
    
            //     let correctUser = {};
            //     $(keys).each((index, item) => {
            //         let thisUser = users[item];
            //         console.log("thisUser", thisUser.email);
            //         console.log("thisUser", thisUser.password);
    
            //         // Email Check
            //         if (thisUser.email === email) {
            //             correctUser.email = email;
            //         } else{}
    
            //         // Password Check
            //         if (thisUser.password === password) {
            //             correctUser.password = password;
            //         } else{}
    
            //         //UglyID set
            //         if (thisUser.email === email && thisUser.password === password) {
            //             correctUser.uglyID = keys[index];
            //         } else{}
            //     });
    
            //     let correctUserKeys = Object.keys(correctUser);
    
            //     if (correctUserKeys.length === 3) {
            //         AuthService.setCurrentUser(correctUser);
            //         $state.go('app.brews.suggestions');
            //     }
    
                
            // })
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