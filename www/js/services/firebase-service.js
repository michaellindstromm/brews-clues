let FirebaseService = function ($http, $window, FireKey) {

   
    
    const config = FireKey.getConfig();

    const initializeFirebase = function () {
        firebase.initializeApp(config);
    };

    let unratedBeers;

    const setUnratedBeers = function(beers) {
        unratedBeers = beers;
    };

    const getUnratedBeers = function() {
        return unratedBeers;
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

        let localUser = $window.localStorage.getItem('uglyID');

        firebase.database().ref(`/users/${localUser}/beers`).set(beerObj);
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
        console.log('uglyIDKey', uglyIDKey);
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
        let localUser = $window.localStorage.getItem('uglyID');
        console.log('localUser', localUser);
        return $http.get(`https://brews-clues-a07a1.firebaseio.com/users/${localUser}/beers/.json`)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log('error', error);
        });
    };

    const editBeerRating = function(beerID, beerRating) {
        let currentUser = $window.localStorage.getItem('uglyID');
        let ref = firebase.database().ref(`users/${currentUser}/beers/${beerID}/`);
        ref.update({rating: beerRating});
    };

    const addSuggestedBeerToUserFirebase = function(beerObj) {
        console.log('beerObj', beerObj);
        let localUser = $window.localStorage.getItem('uglyID');
        firebase.database().ref(`users/${localUser}/beers`).update(beerObj);
    };

    // JUST USED IF RATE LIMIT REACHED

    const pushTestListToFirebase = function(response) {
        $http.post(`https://brews-clues-a07a1.firebaseio.com/testList/.json`, response)
        .then((data) => {
            console.log("data", data);
        })
        .catch((error) => {
            console.log("error", error);
        }); 
    };

    const getTestListFromFirebase = function() {
        return $http.get(`https://brews-clues-a07a1.firebaseio.com/testList/.json`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('error', error);
        });
    };

    return { initializeFirebase, getUsers, addUsertoNode, pushInitialBeers, getRegisterBeerList, setCurrentlyViewedBeers, getCurrentlyViewedBeers, rateBeers, getUsersBeers, editBeerRating, pushTestListToFirebase, getTestListFromFirebase, addSuggestedBeerToUserFirebase, setUnratedBeers, getUnratedBeers };

};

angular.module('beer').factory('FirebaseService', FirebaseService);