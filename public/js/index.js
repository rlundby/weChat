// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRKZSF6TxNx5d4pFOa_DExL2TgA4UOnu4",
    authDomain: "we-chat-43a4a.firebaseapp.com",
    databaseURL: "https://we-chat-43a4a.firebaseio.com",
    projectId: "we-chat-43a4a",
    storageBucket: "we-chat-43a4a.appspot.com",
    messagingSenderId: "357283703015"
};
firebase.initializeApp(config);

// Vars for Firebase
var db = firebase.database();
var auth = firebase.auth();
var provider = new firebase.auth.GithubAuthProvider();
var userId;



// This is used to log in and verify details
function toggleSignIn() {
    if (firebase.auth().currentUser) {

        firebase.auth().signOut();

    } else {
        var email = document.getElementById('sign-in-email').value;
        var password = document.getElementById('sign-in-password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
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
        });
        }
    });
}

function initApp() {

    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('sign-out').addEventListener('click', function(e) {
        firebase.auth().signOut();
    });
}

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        let username;
        const userReference = db.ref(`/users/${user.uid}`);
        userReference.once("value")
            .then(function(snapshot) {
                 username = snapshot.child("name").val();
                $("#signinpls").text("You are signed in");
                $("#sign-out").show();
            })

        $(".reg-main").hide();
    }
     else {
        $(".reg-main").show();
        $("#signinpls").text("Welcome! Please sign in or create an account.");
        $("#sign-out").hide();
    }
});

window.onload = function() {
    initApp();
};
