/**	THIS COMMENT MUST NOT BE REMOVED

Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file 
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0  or see LICENSE.txt

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.	

*/


/** @author Isabella Nake
 * @author Evangelia Mitsopoulou
   
*/


//View for displaying the settings

function SettingsView() {
    var self = this;
    
    self.tagID = 'settingsView';
    
    jester($('#closeSettingsIcon')[0]).tap(function(){ self.closeSettings(); } );
    $('#logOutSettings').click(function() {
    	self.logout();
    });
    
    $(document).bind("authenticationready", function(e, userID) {
		console.log("authentication ready called " + userID);
		self.loadData();
	});
} 

//pinch leads to course list

SettingsView.prototype.handlePinch = function() {
    controller.transitionToCourses();
};

//tap does nothing

SettingsView.prototype.handleTap = doNothing;

//swipe does nothing

SettingsView.prototype.handleSwipe = doNothing;

//opens the view
 
SettingsView.prototype.openDiv = openView;

//shows the settings data
 
SettingsView.prototype.open = function() {
	this.loadData();
	this.openDiv();
	
	controller.models['authentication'].loadFromServer();	
};

//closes the view

SettingsView.prototype.close = closeView;

//leads to course list
 
SettingsView.prototype.closeSettings = function() {
	console.log("close settings button clicked");
	controller.transitionToCourses();
};


//leads to logout confirmation view

SettingsView.prototype.logout = function() {
	controller.transitionToLogout();
};

//loads the statistics data

SettingsView.prototype.loadData = function() {
	var config = controller.models['authentication'];
	
	$("#nameLabelSet").text(jQuery.i18n.prop('msg_fullname'));
	$("#nameItemSet").text(config.getDisplayName());
	$("#usernameLabelSet").text(jQuery.i18n.prop('msg_username'));
	$("#usernameItemSet").text(config.getUserName());
	$("#emailLabelSet").text(jQuery.i18n.prop('msg_email'));
	$("#emailItemSet").text(config.getEmailAddress());
	$("#languageLabelSet").text(jQuery.i18n.prop('msg_language'));
	$("#languageItemSet").text(jQuery.i18n.prop('msg_' + config.getLanguage() + '_title'));	
};
