/* Online users function */
let currentUserID;

function signInOnlineUser() {
    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + userID); //where to look
    userRef.set(true);
    currentUserID = userID;
    userRef.onDisconnect().remove();
}

function signOutOnlineUser() {
    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + userID); //where to look
    userRef.remove();
    firebase.auth().signOut()
}







let usersOnline = db.ref('/presence'); /* Where to look for data PRESENCE */
usersOnline.on('value', function(snapshot) {
    ui.onlineUsersUL.innerHTML = ""; //Clear

    snapshot.forEach(function(data) {
        let checkUser = db.ref('/users/' + data.key); /* Where to look for data USER */
        checkUser.on("value", function(snapshot) {
            let userData = snapshot.val();
            ui.onlineUsersUL.innerHTML += "<li class='userNameOnlinePeople'>" + userData.name + "</li>";
            $('#onlinePeople > h4').html("ONLINE PEOPLE - " + $('#onlinePeopleUL').find('li').length ); //Count people online
        });
    });
});




/*
let currentUser;


let amOnline = new Firebase('https://we-chat-43a4a.firebaseio.com/.info/connected');  //check if connected

amOnline.on('value', function(snapshot) {

    if (!currentUser) {
        currentUser = userID
    }

    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + currentUser); //where to look
    if (snapshot.val()) {
        userRef.onDisconnect().remove();
        userRef.set(true);
    }
});



let usersOnline = db.ref('/presence'); /!* Where to look for data *!/
usersOnline.on('value', function(snapshot) {
    ui.onlineUsersUL.innerHTML = ""; //Clear

    snapshot.forEach(function(data) {
        let checkUser = db.ref('/users/' + data.key); /!* Where to look for data *!/
        checkUser.on("value", function(snapshot) {
            let userData = snapshot.val();
            ui.onlineUsersUL.innerHTML += "<li class='userNameOnlinePeople'>" + userData.name + "</li>";
            $('#onlinePeople > h4').html("ONLINE PEOPLE - " + $('#onlinePeopleUL').find('li').length ); //Count people online
        });
    });
});



function signOutOnlineUser() {
    firebase.auth().signOut()
    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + currentUser); //where to look
    userRef.onDisconnect().remove();
}


function signInOnlineUser(userIDCurrent) {
    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + userIDCurrent); //where to look
    userRef.set(true);
}*/
