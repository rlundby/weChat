let userName;
let userID;

// Hides the chat by default
$('#chatApp').hide();

// This is used to log in and verify details
function toggleSignIn() {
    $('#loginError').text("");
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        let email = document.getElementById('sign-in-email').value;
        let password = document.getElementById('sign-in-password').value;
        if (email.length < 4) {
            $('#loginError').text('Please enter an valid email address.');
            return;
        }
        if (password.length < 4) {
            $('#loginError').text('Please enter an valid password.');
            return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                $('#loginError').text('Wrong password.');
            } else {
                console.log(errorMessage);
            }
            console.log(error);
        });
    }
}

// Allows user to create an account

function handleSignUp() {
    $('#regerror').text("");
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let name = document.getElementById('name').value;
    if (password.length < 6) {
        $('#regerror').text('Please enter a valid password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            $('#regerror').text('The password is too weak.');
        } else {
            console.log(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });

    firebase.auth().onAuthStateChanged( user => {
        if (user) {
            // If user state changes and 'user' exists, check Firebase Database for user
            const userReference = db.ref(`/users/${user.uid}`);
            userReference.once('value', snapshot => {
                if (!snapshot.val()) {
                // User does not exist, create user entry
                userReference.set({
                    email: user.email,
                    username: username,
                    name: name,
                });
            }
            userReference.once("value")
                .then(function(snapshot) {
                userName = snapshot.child("name").val();
                $("#startHeader").hide();
                $("#signinpls").text("Welcome to WeChat!")
                $(".start-screen").animate({
                    opacity: 0,
                }, 1000, "linear", function() {
                    $(".start-screen").hide();
                });
                //load username into header
                document.getElementById("headerUserName").innerHTML = userName;
            });
         });
            $('#chatApp').show();
        } else {
            $('#chatApp').hide();
            $(".start-screen").show().css("opacity", "1");
            $(".reg-main").show();
            $("#signinpls").show().text("Welcome! Please sign in or create an account.");
            $("#sign-out").hide();

        }
    });
}

//  Catch username and edit site
firebase.auth().onAuthStateChanged( user => {
    if (user) {
        // Clear errors
        userID = user.uid;
        $('#regerror').text("");
        $('#loginError').text("");
        // Then
        const userReference = db.ref(`/users/${user.uid}`);
        userReference.once("value")
            .then(function(snapshot) {
                 userName = snapshot.child("name").val();
                $("#startHeader").hide();
                $("#signinpls").text("Welcome to WeChat!")
                $(".start-screen").animate({
                    opacity: 0,
                }, 1000, "linear", function() {
                    $(".start-screen").hide();
                });
                //load username into header
        document.getElementById("headerUserName").innerHTML = userName;
            });

        $('#chatApp').show();

    }
     else {
        $('#chatApp').hide();
        $(".start-screen").show().css("opacity", "1");
        $(".reg-main").show();
        $("#signinpls").show().text("Welcome! Please sign in or create an account.");
        $("#sign-out").hide();

    }
});

document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
//document.getElementById('sign-out').addEventListener('click', function(e) {
  //  firebase.auth().signOut(); });
