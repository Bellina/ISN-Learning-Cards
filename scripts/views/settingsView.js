function SettingsView() {
    var self = this;
    
    self.tagID = 'settingsView';
    
    $('#closeSettingsIcon').click(function(){ self.closeSettings(); } );
    $('#logOutSettings').click(function(){ self.logout(); } );
} 

SettingsView.prototype.handleTap = doNothing;
SettingsView.prototype.handleSwipe = doNothing;
SettingsView.prototype.openDiv = openView;
SettingsView.prototype.open = function() {
	this.loadData();
	this.openDiv();
};
SettingsView.prototype.close = closeView;

SettingsView.prototype.closeSettings = function() {
	controller.transitionToCourses();
};

SettingsView.prototype.logout = function() {
	controller.transitionToLogout();
};

SettingsView.prototype.loadData = function() {
	
	var config = controller.models['authentication'];
	
	$("#settingsData").empty();
	$("<li/>", {
	  text: config.getDisplayName()
	}).appendTo("#settingsData");
	$("<li/>", {
		  text: config.getUserName()
		}).appendTo("#settingsData");
	$("<li/>", {
		  text: config.getEmailAddress()
		}).appendTo("#settingsData");
};
