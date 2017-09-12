let FirebaseService = function (FireKey) {

    let config = FireKey.getConfig();

    let initializeFirebase = function() {
        firebase.initializeApp(config);
    };

    return { initializeFirebase };

};

angular.module('beer').factory('FirebaseService', FirebaseService);