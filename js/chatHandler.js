/* Loop through all texts */
function loadChat() {

    var textsRef = db.ref('/groups/' + chosenGroup + '/messages'); /* Where to look for data */

    textsRef.off(); //Clear database reference, so items wont load several times after changing group. Apperantly you can have unlimited references open at the same time

    ui.messages.innerHTML = ""; /* Clean the messages div, so it's clean when we load in new texts */
    var childData = "";

    textsRef.on('child_added', function(snapshot) {
        childData = snapshot.val();

        /* Checks so that you are in the right group */
        if (childData.forGroup === chosenGroup) {
            /* Checks if you are the user so we can style it specificly later on */
            if (childData.uid === userID){
                ui.messages.innerHTML += "<div class='message userMessage'><span>" + childData.userName + " - " + childData.fullTimeStamp + "</span><p>" + childData.text + "</p></div>";
            } else{
                ui.messages.innerHTML += "<div class='message'><span>" + childData.userName + " - " + childData.fullTimeStamp + "</span><p>" + childData.text + "</p></div>";
            }
        }
        ui.messagebox.scrollTop = ui.messagebox.scrollHeight; //Scroll to bottom
    });


    /* Load groupname onto Header */
    var groupsRef = db.ref('/groups/' + chosenGroup + '/settings'); /* Where to look for data */
    groupsRef.off(); //Clear database reference, so items wont load several times after changing group. Apperantly you can have unlimited references open at the same time
    groupsRef.on('child_added', function(snapshot) {
        groupChildData = snapshot.val();
        ui.headerGroupName.innerHTML = "<span id='headerGroupMenu'><i class='fas fa-bars'></i></span><span id='headerGroupClose'><i class='fas fa-times'></i></span><h5 id='headerGroupNameID'>" + groupChildData + "</h5>";

        $('#headerGroupMenu, #headerGroupClose').click(function () {
            $('#sidebar').toggleClass('menuMobileShow');
            $('#mainContent').toggleClass('mainContentHide');
            $('#headerGroupMenu, #headerUser, #headerGroupNameID, #sendMessageForm, #headerUserSettings').toggleClass('mobileHide');
            $('#headerGroupClose').toggleClass('mobileShow');
            $('#headerGroupMenu').toggleClass('ipadHide');
            $('#headerGroupClose, #sendMessageForm, #headerGroupNameID').toggleClass('ipadShow');
        });
    });
}