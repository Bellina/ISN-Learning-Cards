function AnswerModel() {
	this.answerList = [];

};

AnswerModel.prototype.getAnswerBody = function() {
}; // will assing a class
// with highligted
// foreground to the
// correct answers

AnswerModel.prototype.setAnswers = function(tickedAnswers) {

	this.answerList = tickedAnswers;

};

AnswerModel.prototype.getAnswers = function() {

	return this.answerList;

};

AnswerModel.prototype.getAnswerResults = function() {

	// to return the the 3 different answer results
	// excellent, partially correct, wrong
	var questionType = controller.models['questionpool'].getQuestionType();

	if (questionType == "Multiple Choice Question") {
		return this.getMultipleAnswerResults();
	} else if (questionType == "Single Choice Question") {
		return this.getSingleAnswerResults();
	} else if (questionType == "Text Sort Question") {
		return this.getTextSortAnswerResults();
	}

};

// the different possible answers of each question will be stored in the local
// storage, but
// the "taped" answers of the learner will not be stored. they will be passed on
// a variable

AnswerModel.prototype.getMultipleAnswerResults = function() {
	var questionpool = controller.models["questionpool"];
	var numberOfAnswers = 0;

	questionpool.resetAnswer();

	var correctAnswers = 0;
	var corr_ticked = 0;
	var wrong_ticked = 0;

	do {
		if (questionpool.getAnswerChoiceScore() == 1) {
			correctAnswers++;
			if (this.answerList.indexOf(numberOfAnswers) != -1) {
				corr_ticked++;
				console.log("corr_ticked");
			}
		} else {
			if (this.answerList.indexOf(numberOfAnswers) != -1) {
				wrong_ticked++;
				console.log("wrong_ticked");
			}
		}
		console.log("nextLoop");
		numberOfAnswers++;
	} while (questionpool.nextAnswerChoice());

	console.log("Number of answers: " + numberOfAnswers);
	console.log("Correct ticked: " + corr_ticked);
	console.log("Wrong ticked: " + wrong_ticked);

	if ((corr_ticked + wrong_ticked) == numberOfAnswers) {
		return "Wrong";
	}

	if (corr_ticked == 0) {
		return "Wrong";
	}

	if (corr_ticked > 0 && corr_ticked < correctAnswers) {
		return "Partially Correct";
	}

	if (corr_ticked == correctAnswers && wrong_ticked > 0) {
		return "Partially Correct";
	}

	if (corr_ticked == correctAnswers && wrong_ticked == 0) {
		return "Excellent";
	}

};

AnswerModel.prototype.getSingleAnswerResults = function() {

	var clickedAnswerIndex = this.answerList[0];
	// var correctAnswer =
	// controller.models.["questionpool"].["answer"][2].score;

	var returnedResult;

	if (!clickedAnswerIndex) {
		returnedResult = "Wrong";
	} else if (controller.models["questionpool"].getScore(clickedAnswerIndex) == 1) {
		returnedResult = "Excellent";

	} else {

		returnedResult = "Wrong";
	}
	console.log('XX ' + returnedResult);
	return returnedResult;
};

AnswerModel.prototype.getTextSortAnswerResults = function() {
	var scores = this.getTextSortScoreArray();

	if (scores.indexOf("1") == -1 && scores.indexOf("0.5") == -1) {
		return "Wrong";
	} else if (scores.indexOf("0.5") == -1 && scores.indexOf("0") == -1) {
		return "Excellent";
	} else {
		return "Partially Correct";
	}
}

AnswerModel.prototype.getTextSortScoreArray = function() {
	var scores = [];
	for ( var i = 0; i < this.answerList.length; i++) {
		if (this.answerList[i] == i) {
			scores[i] = "1";
		} else {
			var currIndex = this.answerList[i];
			var followingIndex = i + 1;
			var followingCorrAnswers = 0;
			while (followingIndex < this.answerList.length
					&& this.answerList[followingIndex] == (++currIndex) + "") {
				followingCorrAnswers++;
				followingIndex++;
			}
			if (followingCorrAnswers + 1 > this.answerList.length / 2) {
				for ( var j = i; j <= i + followingCorrAnswers; j++) {
					scores[this.answerList[j]] = "0.5";
				}
			} else {
				for ( var j = i; j <= i + followingCorrAnswers; j++) {
					scores[this.answerList[j]] = "0";
				}
			}
			i = i + followingCorrAnswers;
		}
	}
	return scores;
}

AnswerModel.prototype.deleteData = function() {
	this.answerList = [];
}