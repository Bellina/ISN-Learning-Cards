function CoursesListView (controller) {
	
    var self = this;
    
    self.tagID = 'coursesListView';
	self.controller = controller;
    
    
	$('#coursesListSetIcon').click(function(){ self.clickSettingsButton(); } );
}

CoursesListView.prototype.handleTap = doNothing;
CoursesListView.prototype.handleSwipe = doNothing;
CoursesListView.prototype.openDiv = openView;
CoursesListView.prototype.open = function() {
	this.update();
	this.openDiv();
};
CoursesListView.prototype.close = closeView;

CoursesListView.prototype.clickCourseItem = function (course_id) {
	controller.models['questionpool'].loadData(course_id);
    controller.transitionToQuestion();
};

CoursesListView.prototype.clickSettingsButton = function () {controller.transitionToSettings();};

CoursesListView.prototype.clickStatisticsIcon = function (courseID) { console.log("statistics button clicked");};

CoursesListView.prototype.update = function() {
	var self = this;
	
	var courseModel = self.controller.models['course'];
	courseModel.reset();
    
    $("#coursesList").empty();
    
	    
		do {
			var courseID = courseModel.getId();
			
			
			var li = $("<li/>", {
				  "id": "course" + courseID,
				  text: courseModel.getTitle(),
<<<<<<< HEAD
				  click: function(event){
				    self.click(event, $(this));
				  }
				}).appendTo("#coursesList");
			
			$("<span/>", {
				"class": courseModel.isLoaded() ? "span1" : "span2",
			}).appendTo(li);
		} while (courseModel.nextCourse());	
};


CoursesListView.prototype.click = function(event, element) {
	var $target = $(event.target);
	if ( $target.is(".span1") ) {
		console.log("statistics clicked");
		this.clickStatisticsIcon(element.parent().attr('id').substring(6));
	  } else {
		  console.log("li item clicked");
		  this.clickCourseItem(element.attr('id').substring(6));
	  }
=======
				  click: function(){
					  self.clickCourseItem($(this).attr('id').substring(6));
				  }
				}).appendTo("#coursesList");
			
			var span = $("<span/>", {
				"class": "statisticsIcon",
				click: function(event) {
					self.clickStatisticsIcon($(this).parent().attr('id').substring(6));
					event.stopPropagation();
				}
			}).appendTo(li);
			
			$("<i/>", {
				"class": courseModel.isLoaded() ? "icon-signal" : "icon-refresh"
			}).appendTo(span);
			
		} while (courseModel.nextCourse());	
>>>>>>> refs/heads/belinastrack
};