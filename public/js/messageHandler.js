/* Push message */
function pushMessage() {

    let textInput = document.querySelector('#sendMessageInput');

    let msgText = textInput.value;

    let d = new Date();
    let newDate = {
        hour: (d.getHours()<10?'0':'') + d.getHours(),
        minute: (d.getMinutes()<10?'0':'') + d.getMinutes(),
        day: (d.getDate()<10?'0':'') + d.getDate(),
        month: ((d.getMonth() +1)<10?'0':'') + (d.getMonth() +1),
        year: d.getFullYear()
    };

    /* Need to check if message is empty, if not we push it */
    if (msgText === ''){
        alert('cannot send empty text!');

    } else{
        textInput.value = "";
        db.ref('/groups/' + chosenGroup + '/messages').push({
            uid: userID,
            userName: userName,
            text: msgText,
            timeStamp: newDate.hour + ":" + newDate.minute,
            fullTimeStamp: newDate.year + "-" + newDate.month + "-" + newDate.day + " " + newDate.hour + ":" + newDate.minute,
            forGroup: chosenGroup
        });
    }
}