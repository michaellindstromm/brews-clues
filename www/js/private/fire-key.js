let FireKey = function() {
    let config = {
        apiKey: "AIzaSyAEvupXN4_izMs7j6I6gjnzLtSeZadnlj8",
        authDomain: "brews-clues-a07a1.firebaseapp.com",
        databaseURL: "https://brews-clues-a07a1.firebaseio.com",
        projectId: "brews-clues-a07a1",
        storageBucket: "",
        messagingSenderId: "265015075559"
    };

    const getConfig = function() {
        return config;
    };

    return { getConfig };

 };

angular.module('beer').factory('FireKey', FireKey);