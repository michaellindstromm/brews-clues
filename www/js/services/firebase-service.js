let FirebaseService = function ($http, $window, FireKey) {

    let localUser = $window.localStorage.getItem('uglyID');
    
    const config = FireKey.getConfig();

    const initializeFirebase = function () {
        firebase.initializeApp(config);
    };

    // *****************************************************************************
    // Keep track of beers the viewer is currently viewing and rating to hold data
    // *****************************************************************************

    let currentlyViewedBeers = [];

    const setCurrentlyViewedBeers = function(beers) {
        let keys = Object.keys(beers);
        $(keys).each((index, item) => {
            currentlyViewedBeers.push(beers[item]);
        });
    };
    
    const getCurrentlyViewedBeers = function() {
        return currentlyViewedBeers;
    };

    // *****************************************************************************
    // *****************************************************************************

    const rateBeers = function() {
        let beers = currentlyViewedBeers;
        let beerObj = {};
        $(beers).each((index, item) => {
            if (item.hasOwnProperty('rating')) {
                beerObj[item.id] = item;
            }
        });

        // firebase.database().ref(`/users/${localUser}/beers`).set(beerObj);
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

    const getUsersBeers = function() {
        return $http.get(`https://brews-clues-a07a1.firebaseio.com/users/${localUser}/beers/.json`)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log('error', error);
        });
    };

    return { initializeFirebase, getUsers, addUsertoNode, pushInitialBeers, getRegisterBeerList, setCurrentlyViewedBeers, getCurrentlyViewedBeers, rateBeers, getUsersBeers };

};

angular.module('beer').factory('FirebaseService', FirebaseService);