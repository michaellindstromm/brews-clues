let AuthService = function($q, $http, $rootScope) {
    $rootScope.isLoggedIn = function () {
    
        let currentUserEmail = $window.localStorage.getItem('email');
        let currentUserPassword = $window.localStorage.getItem('password');
    
        if (currentUserEmail !== undefined && currentUserPassword !== undefined) {
            
            return true;
    
        } else {
    
            return false;
        }
    };
    
    let currentUser = {};


    const getCurrentUser = function () {
        return currentUser;
    }

    const isAuthenticated = function() {
        return $q((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user;
                    console.log("user", user);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    const setCurrentEmailAndPass = function(email, password) {
        currentUser.email = email;
        currentUser.password = password;
        $window.localStorage.setItem("email", email);
        $window.localStorage.setItem("password", password);
    };


    const logout = function() {
        $window.localStorage.removeItem("email");
        $window.localStorage.removeItem("password");
    };


    return { getCurrentUser, isAuthenticated, setCurrentEmailAndPass, logout }
}

angular.module('beer').factory('AuthService', AuthService);