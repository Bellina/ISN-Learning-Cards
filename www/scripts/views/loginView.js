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

//View for displaying the login form

function LoginView(controller) {
	var self = this;

	self.tagID = 'splashScreen';
	this.controller = controller;
	this.active = false;

	jester($('#loginButton')[0]).tap(function() {
		self.clickLoginButton();
	});
		
   $(document).bind("errormessagehide", function() {
			console.log(" hide error message loaded ");
			self.hideErrorMessage();
		});	
		
	

	// if keyboard is displayed, move the logos up
	// if keyboard is not displayed anymore, move logos down
	$("#usernameInput")[0].addEventListener("focus", focusLogos);
	$("#password")[0].addEventListener("focus", focusLogos);
	$("#usernameInput")[0].addEventListener("blur", unfocusLogos);
	$("#password")[0].addEventListener("blur", unfocusLogos);

	function focusLogos(e) {
		console.log("focus logos " + e.currentTarget.id);
		$("#logos").removeClass("bottom");
		$("#logos").addClass("static");
	}

	function unfocusLogos(e) {
		console.log("unfocus logos " + e.currentTarget.id);
		$("#logos").addClass("bottom");
		$("#logos").removeClass("static");
	}

}

//tap, swipe and pinch do nothing

LoginView.prototype.handleTap = doNothing;
LoginView.prototype.handlePinch = doNothing;
LoginView.prototype.handleSwipe = doNothing;


//opens the view

LoginView.prototype.openDiv = openView;


//shows the login form

LoginView.prototype.open = function() {
    // hide unnecessary errors and warnings 
    this.hideErrorMessage();
    this.hideWarningMessage();
    
	this.showForm();
	this.openDiv();

	this.active = true;
};

//loses the view
 
LoginView.prototype.closeDiv = closeView;
LoginView.prototype.close = function() {
	$("#password").val("");
	$("#usernameInput").val("");
	$("#password").blur();
	$("#usernameInput").blur();
	this.active = false;

	this.closeDiv();
}

/**
 * click on the login button sends data to the authenication model data is only
 * send, if input fields contain some values after successful login, the course
 * list is displayed
 */
LoginView.prototype.clickLoginButton = function() {
	var user, password;
	var self = this;

	function cbLoginSuccess() {
		if (self.active) {
			console.log("is logIn");
			$(document).trigger("trackingEventDetected",["Login"]);
			controller.transitionToCourses();
		}
	}
	
	function cbLoginFailure(e, errormessage) {
		console.log("authentication failed, reason: " + errormessage);
		switch (errormessage) {
		case "connectionerror":
			self.showErrorMessage(jQuery.i18n.prop('msg_connection_message'));
			break;
		case "nouser":
			console.log("no user error");
			self.showErrorMessage(jQuery.i18n.prop('msg_authenticationFail_message'));
			break;
		case "invalidclientkey":
			self.showErrorMessage(jQuery.i18n.prop('msg_connection_message'));
			break;
		default:
			break;
		}
	}

	console.log("check logIn data");
	if ($("#usernameInput").val() && $("#password").val()) {
		if (!self.controller.models["connection"].isOffline()) {
			console.log("has logIn data");

			$(document).bind("authenticationready", cbLoginSuccess);
			$(document).bind("authenticationfailed", cbLoginFailure);

			self.showWarningMessage(jQuery.i18n.prop('msg_warning_message'));
			controller.models['authentication'].login(
					$("#usernameInput").val(), $("#password").val());
		}
	} else {
		self.showErrorMessage(jQuery.i18n.prop('msg_authentication_message'));
		//self.showErrorMessage("Please enter your username and password!");
	}
};


//displays the login form

LoginView.prototype.showForm = function() {
	$("#loginForm").show();
	this.hideErrorMessage();
	if (this.controller.models["connection"].isOffline()) {
		this.showErrorMessage(jQuery.i18n.prop('msg_network_message'));
		//this.showErrorMessage("Sorry, you need to be online to connect to your LMS");
	}
};

//shows the specified error message
 
LoginView.prototype.showErrorMessage = function(message) {
	$("#warningmessage").hide();
	$("#errormessage").text(message);
	$("#errormessage").show();
}

//shows the specified warning message

LoginView.prototype.showWarningMessage = function(message) {
	$("#errormessage").hide();
	$("#warningmessage").text(message);
	$("#warningmessage").show();
}

// hides the specified error message

LoginView.prototype.hideErrorMessage = function() {
	
	$("#errormessage").text("");
	$("#errormessage").hide();
}

//hides the specified warning message

LoginView.prototype.hideWarningMessage = function() {
	$("#warningmessage").text("");
	$("#warningmessage").hide();
}
