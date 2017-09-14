let RegistrationController = function ($scope, $state, AuthService, FirebaseService) {

    $('#firstPass').on('keyup', (e) => {

        if (e.target.value.length === 0) {
            $('#firstPassLabel').css('border-bottom-color', '#30CBBA');
        } else if (e.target.value.length < 8) {
            $('#firstPassLabel').css('border-bottom-color', 'red');
        } else {
            $('#firstPassLabel').css('border-bottom-color', '#30CBBA');
        }

    });
    $('#repeatPass').on('keyup', (e) => {

        if (e.target.value.length === 0) {
            $('#repeatPassLabel').css('border-bottom-color', '#30CBBA');
        } else if ($('#firstPass').val() === $('#repeatPass').val()) {
            $('#repeatPassLabel').css('border-bottom-color', '#30CBBA');
        } else {
            $('#repeatPassLabel').css('border-bottom-color', 'red');
        }

    });

    $scope.register = function (email, password) {
        let firstPass = $('#firstPass').val();
        let repeatPass = $('#repeatPass').val();
        let registerEmail = $('#registerEmail').val();
        let firstName = $('#registerFirst').val();
        let lastName = $('#registerLast').val();


        let checkEmail = function() {
            let matcher = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (registerEmail.match(matcher)) {
                return true;
            } else {
                return false;
            }
        }

        if (firstPass === repeatPass && repeatPass.length > 7 && firstName.length > 0 && lastName.length && checkEmail()) {


            AuthService.createNewFirebaseUser(registerEmail, repeatPass)
                .then((response) => {

                    let fullName = firstName + " " + lastName;
                    let user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: fullName
                    })

                })
                .then(() => {
                    let fullName = firstName + " " + lastName;
                    let currentUser = firebase.auth().currentUser;
                    console.log("current user", currentUser);
                    let newUser = {
                        name: fullName,
                        uid: currentUser.uid,
                        email: currentUser.email
                    }

                    FirebaseService.addUsertoNode(newUser);

                    FirebaseService.getUsers()
                        .then((data) => {
                            let users = data.data;
                            let keys = Object.keys(users);

                            let correctUser;

                            $(keys).each((index, item) => {
                                let thisUser = users[item];
                                if (thisUser.email === currentUser.email) {
                                    correctUser = thisUser.uglyID;
                                }
                            })

                            if (correctUser !== null) {
                                AuthService.setCurrentUser(correctUser);
                                $state.go('categories');
                            }
                        })
                });






        } else if (firstPass !== repeatPass) {
            console.log("Password does not match");
        } else if (repeatPass.length < 8) {
            console.log("Passwords must be at least 8 characters");
        } else if (!checkEmail()) {
            console.log('invalid email');
        } else if (firstName.length === 0) {
            console.log("Must input first name");
        } else if (lastName.length === 0) {
            console.log("Must input last name");
        }
    };

    $scope.goToRegisterBeers = function() {
        $state.go('registerBeers');
    };

};

angular.module('beer').controller('RegistrationController', RegistrationController);