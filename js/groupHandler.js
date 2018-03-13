/* Choose group to write in */
function changeGroup(value) {
    $('#' + chosenGroup).removeClass('activeChat');

    chosenGroup = value;

    $('#' + value).toggleClass('activeChat');

    loadChat();
}


/* load groups */
function loadGroups() {

    var groupsRef = db.ref('/groups/'); /* Where to look for data */

    groupsRef.on('child_added', function(snapshot) {
        var childData = snapshot.val();
        if (childData.settings.groupID === chosenGroup){
            ui.groups.innerHTML += "<li onclick='changeGroup(this.id)' class='changeGroup activeChat' id='" + childData.settings.groupID + "'>" + childData.settings.name + "</li>";

        } else {
            ui.groups.innerHTML += "<li onclick='changeGroup(this.id)' class='changeGroup' id='" + childData.settings.groupID + "'>" + childData.settings.name + "</li>";

        }


        $('.changeGroup').click(function(e){
            $('#sidebar').removeClass('menuMobileShow');
            $('#mainContent').removeClass('mainContentHide');
            $('#headerGroupMenu, #headerUser, #headerGroupNameID, #sendMessageForm, #headerUserSettings').removeClass('mobileHide');
            $('#headerGroupMenu').removeClass('ipadHide');
        });
    });
}