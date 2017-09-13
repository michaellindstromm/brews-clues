let FirebaseService = function ($http, FireKey) {

    let config = FireKey.getConfig();

    let initializeFirebase = function() {
        firebase.initializeApp(config);
    };

    let pushTextToFirebase = function(data) {
        console.log('service', data);
        $http.post('https://brews-clues-a07a1.firebaseio.com/.json', data) 
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    let getUsers = function() {
        return $http.get('https://brews-clues-a07a1.firebaseio.com/users.json')
        .then((data) => {
            return data;
        })  
        .catch((error) => {
            console.log("error", error);
        });
    };

    let createNewFirebaseUser = function(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log("firebase login success response:", response);
            })
            .catch((error) => {
                console.log("firebase login error: ", error);
            }); 
    };

    let login = function(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            console.log("firebase service response: ", response);
            return response;
        })
        .catch((error) => {
            console.log("firebase login error: ", error);
        });
    };

    return { initializeFirebase, pushTextToFirebase, getUsers };

};

angular.module('beer').factory('FirebaseService', FirebaseService);