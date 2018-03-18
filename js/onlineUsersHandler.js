/* Online users function */
function signInOnlineUser() {
    let userRef = new Firebase('https://we-chat-43a4a.firebaseio.com/presence/' + userID); //where to look
    userRef.set(true);
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