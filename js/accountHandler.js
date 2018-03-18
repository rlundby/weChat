let userName;
let userID;

// Hides the chat by default
$('#chatApp').hide();


//Handles the sign in funciton
function handleSignIn() {
    // Reset error message
    $('#loginError').text("");
    // Makes sure there isnt an user logged in already
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        let email = document.getElementById('sign-in-email').value;
        let password = document.getElementById('sign-in-password').value;
        // Validates log in values
        if (email.length < 4) {
            $('#loginError').text('Please enter an valid email address.');
            return;
        }
        if (password.length < 4) {
            $('#loginError').text('Please enter an valid password.');
            return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                $('#loginError').text('Wrong password.');
            } else if (errorCode === 'auth/invalid-email') {
                $('#loginError').text('Please enter a valid email.');
            } else {
                console.log(errorMessage);
            }
            console.log(error);
        });
    }
}

//Handles the sign up funciton
function handleSignUp() {
    // Resets the regerror box
    $('#regerror').text("");
    // Collect values required
    let username = document.getElementById('username').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (password.length < 6) {
        $('#regerror').text('Please enter a valid password.');
        return;
    } else if (name === "" || username === "") {
        $('#regerror').text('Please enter a valid name.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            $('#regerror').text('The password is too weak.');
        } else if (errorCode == 'auth/email-already-in-use') {
            $('#regerror').text('This email is already in use.');
        } else {
            console.log(errorMessage);
        }
        console.log(error);
    }).then(function (user) {
        userID = user.uid;
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
    })
}

// Listen for auth changes
firebase.auth().onAuthStateChanged(user => {
    // If a user logs in - display the chat
    if (user) {
        // Sets the user uid
        userID = user.uid;
        // If user state changes and 'user' exists, check Firebase Database for user
        $("#startHeader").hide();
        $("#signinpls").text("Welcome to WeChat!")
        $(".start-screen").animate({
            opacity: 0,
        }, 1000, "linear", function () {
            $(".start-screen").hide();
        });
        //load username into header
        // Sign in
        getUsername(userID);
        signInOnlineUser(userID);
        $('#chatApp').show();
    }
    // If there is no logged in user - hide the chat
    else {
        $('#chatApp').hide();
        $(".start-screen").show().css("opacity", "1");
        $(".reg-main").show();
        $("#startHeader").show();
        $("#signinpls").show().text("Welcome! Please sign in or create an account.");
    }
});

// Gets the user name on login
function getUsername(userID) {
    let userReference = db.ref('/users/' + userID);
    userReference.on("value", function (snapshot) {
        let userInfo = snapshot.val();
        document.getElementById("headerUserName").innerHTML = userInfo.username;
        userName = userInfo.name;
    })
}

//Assign the click events
document.getElementById('sign-in').addEventListener('click', handleSignIn, false);
document.getElementById('sign-up').addEventListener('click', handleSignUp, false);