let RegistrationController = function($scope, AuthService) {

    $scope.register = function() {
        let firstPass = $('#firstPass').val();
        let repeatPass = $('#repeatPass').val();
        console.log("firstPass", firstPass);
        console.log('repeatPass', repeatPass);
        if (firstPass === repeatPass) {
            console.log("Hooray! You match");
        } else {
            console.log("sorry. Try agin.");
        }
    };

};

angular.module('beer').controller('RegistrationController', RegistrationController);