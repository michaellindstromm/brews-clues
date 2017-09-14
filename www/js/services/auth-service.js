let AuthService = function($q, $http) {
    
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

    const setCurrentUser = function(user) {

        // currentUser.email = user.email;
        // currentUser.password = user.password;
        // currentUser.uglyID = user.uglyID;
        // $window.localStorage.setItem("email", user.email);
        // $window.localStorage.setItem("password",user.password);
        // $window.localStorage.setItem("uglyID", user.uglyID);
        currentUser.uglyID = user;
        window.localStorage.setItem('uglyID', user);

    };


    const logout = function() {
        // $window.localStorage.removeItem("email");
        // $window.localStorage.removeItem("password");
        window.localStorage.removeItem('uglyID');
    };

    const createNewFirebaseUser = function (email, password) {
        return $q((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    console.log("firebase login success response:", response);
                    resolve(response);
                })
                .catch((error) => {
                    console.log("firebase login error: ", error);
                    reject(error);
                });
        })
    };

    const loginFirebaseUser = function (email, password) {
        return $q((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });

        })
    };

    const addUsertoNode = function(user) {
        let uglyIDKey = firebase.database().ref('/users').push({}).getKey();
        firebase.database().ref(`/users/${uglyIDKey}`).set({
            uglyID: uglyIDKey,
            name: user.name,
            email: user.email,
            uid: user.uid
        });
    }


    return { getCurrentUser, isAuthenticated, setCurrentUser, logout, loginFirebaseUser, createNewFirebaseUser, addUsertoNode }
}

angular.module('beer').factory('AuthService', AuthService);