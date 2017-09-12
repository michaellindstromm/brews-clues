let FirebaseService = function ($http, FireKey) {

    let config = FireKey.getConfig();

    let initializeFirebase = function() {
        firebase.initializeApp(config);
    };

    let pushTextToFirebase = function(data) {
        $http.post('https://brews-clues-a07a1.firebaseio.com/', data) 
            .then((response) => {
                
            });
    }

    return { initializeFirebase };

};

angular.module('beer').factory('FirebaseService', FirebaseService);