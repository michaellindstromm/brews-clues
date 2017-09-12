let AuthService = function($q, $http) {

    let currentUser = null;

    let googleClientID = '24755791061-tn51l2juoa9hco7osf91ts3slatj29b4.apps.googleusercontent.com';

    let googleClientSecret = 'z63-qYByG_yWhoziO4VO8Wq6';

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

    const loginWithGoogle = function() {
        let google = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(google);
    };


    return { getCurrentUser, isAuthenticated, loginWithGoogle }
}

angular.module('beer').factory('AuthService', AuthService);