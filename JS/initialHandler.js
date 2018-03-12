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


// Variables to start the chatting system
var chosenGroup = "0001";
var userID = "SimonDyhr";
var userName = "Simon Dyhr";
var db = firebase.database();

/* Load UI */
var ui = {
    groups: document.getElementById("groupsUL"),
    messages: document.getElementById("messages"),
    header: document.getElementById("header"),
    headerGroupName: document.getElementById("headerGroupName"),
    headerUser: document.getElementById("headerUser"),
    messagebox: document.getElementById("messageBox")
};

//load username into header
document.getElementById("headerUserName").innerHTML = userName;