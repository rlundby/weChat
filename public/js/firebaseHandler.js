// Initialize Firebase
let config = {
    apiKey: "AIzaSyDRKZSF6TxNx5d4pFOa_DExL2TgA4UOnu4",
    authDomain: "we-chat-43a4a.firebaseapp.com",
    databaseURL: "https://we-chat-43a4a.firebaseio.com",
    projectId: "we-chat-43a4a",
    storageBucket: "we-chat-43a4a.appspot.com",
    messagingSenderId: "357283703015"
};
firebase.initializeApp(config);
let db = firebase.database();