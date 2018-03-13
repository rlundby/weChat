/* Header functions */
$('#headerUser, #headerUserSettings > #headerUserBack').click(function () {
    $('#headerUser').toggleClass('headerUserHide');
    $('#headerUserSettings').toggleClass('headerUserSettingsHide');
});


/* on resize: scroll to bottom of div. */
window.onresize = function() {
    ui.messagebox.scrollTop = ui.messagebox.scrollHeight; //Scroll to bottom
};


// load:
loadGroups(); /* Initiate load of groups */
loadChat(); /* Initiate load of chat */