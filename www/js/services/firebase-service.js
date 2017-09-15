let FirebaseService = function ($http, $window, FireKey) {

    const config = FireKey.getConfig();

    const initializeFirebase = function () {
        firebase.initializeApp(config);
    };

    // *****************************************************************************
    // Keep track of beers the viewer is currently viewing and rating to hold data
    // *****************************************************************************

    let currentlyViewedBeers;

    const setCurrentlyViewedBeers = function(beers) {
        currentlyViewedBeers = beers;
    };
    
    const getCurrentlyViewedBeers = function() {
        return currentlyViewedBeers;
    };

    // *****************************************************************************
    // *****************************************************************************

    const pushTextToFirebase = function (data) {
        console.log('service', data);
        $http.post('https://brews-clues-a07a1.firebaseio.com/.json', data)
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const getUsers = function () {
        return $http.get('https://brews-clues-a07a1.firebaseio.com/users.json')
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const addUsertoNode = function (user) {

        let uglyIDKey = firebase.database().ref('/users').push({}).getKey();
        $window.localStorage.setItem('uglyID', uglyIDKey);
        console.log("localUgly", $window.localStorage.getItem('uglyID'));
        firebase.database().ref(`/users/${uglyIDKey}/profile`).set({
            uglyID: uglyIDKey,
            name: user.name,
            email: user.email,
            uid: user.uid
        });
    };

    const pushInitialBeers = function(beerObj) {
        $http.post('https://brews-clues-a07a1.firebaseio.com/registerBeerList.json', beerObj)
        .then((response) => {
            console.log("response", response);
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    const getRegisterBeerList = function() {
        return $http.get('https://brews-clues-a07a1.firebaseio.com/registerBeerList.json')
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    return { initializeFirebase, pushTextToFirebase, getUsers, addUsertoNode, pushInitialBeers, getRegisterBeerList, setCurrentlyViewedBeers, getCurrentlyViewedBeers };

};

angular.module('beer').factory('FirebaseService', FirebaseService);