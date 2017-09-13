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

    return { initializeFirebase, pushTextToFirebase, getUsers };

};

angular.module('beer').factory('FirebaseService', FirebaseService);