//***********************************************************ANSWER MODEL**********************************************************************************
// The answer model handles the answering 

// Constructor. It 
function AnswerModel() {
	this.answerList = [];
	this.answerScoreList = [];
	this.answerScore = 0;

};

AnswerModel.prototype.setAnswers = function(tickedAnswers) {
	this.answerList = tickedAnswers;
};

AnswerModel.prototype.getAnswers = function() {
	return this.answerList;
};

AnswerModel.prototype.getScoreList = function() {
	return this.answerScoreList;
};

AnswerModel.prototype.deleteData = function() {
	this.answerList = [];
	this.answerScoreList = [];
	this.answerScore = 0;
};

AnswerModel.prototype.getAnswerResults = function() {
	console.log("answer score: " + this.answerScore);
	if (this.answerScore == 1) {
		console.log("Excellent");
		return "Excellent";
	} else if (this.answerScore == 0) {
		return "Wrong";
	} else {
		return "Partially Correct";
	}
};

AnswerModel.prototype.calculateSingleChoiceScore = function() {
	var clickedAnswerIndex = this.answerList[0];

	if (controller.models["questionpool"].getScore(clickedAnswerIndex) > 0) {
		this.answerScore = 1;
	} else {
		this.answerScore = 0;
	}
};

AnswerModel.prototype.calculateMultipleChoiceScore = function() {
	var questionpool = controller.models["questionpool"];

	var correctAnswers = questionpool.getAnswer();
	var numberOfAnswers = correctAnswers.length;

	var correctAnswers = 0;
	var corr_ticked = 0;
	var wrong_ticked = 0;

	for ( var i = 0; i < numberOfAnswers; i++) {
		console.log("answer " + i + ": " + questionpool.getScore(i));
		if (questionpool.getScore(i) > 0) {
			correctAnswers++;
			if (this.answerList.indexOf(i) != -1) {
				corr_ticked++;
				console.log("corr_ticked");
			}
		} else {
			if (this.answerList.indexOf(i) != -1) {
				wrong_ticked++;
				console.log("wrong_ticked");
			}
		}
	}

	console.log("Number of answers: " + numberOfAnswers);
	console.log("Correct ticked: " + corr_ticked);
	console.log("Wrong ticked: " + wrong_ticked);

	if ((corr_ticked + wrong_ticked) == numberOfAnswers || corr_ticked == 0) {
		// if all answers are ticked or no correct answer is ticked, we assign 0
		// to the answer score
		this.answerScore = 0;
	} else if ((corr_ticked > 0 && corr_ticked < correctAnswers)
			|| (corr_ticked == correctAnswers && wrong_ticked > 0)) {
		// if some but not all correct answers are ticked or if all correct
		// answers are ticked but also some wrong one,
		// we assign 0.5 to the answer score
		this.answerScore = 0.5;
	} else if (corr_ticked == correctAnswers && wrong_ticked == 0) {
		// if all correct answers and no wrong ones, we assign 1 to the answer
		// score
		this.answerScore = 1;
	}
};

AnswerModel.prototype.calculateTextSortScore = function() {
	var scores = [];
	this.answerScore = 0;

	for ( var i = 0; i < this.answerList.length; i++) {

		// 1. Check for correct sequences
		var currAnswer = this.answerList[i];
		var followingIndex = i + 1;
		var followingCorrAnswers = 0;
		// count the number of items in sequence and stop if we loose the
		// sequence
		while (followingIndex < this.answerList.length
				&& this.answerList[followingIndex++] == (++currAnswer) + "") {
			followingCorrAnswers++;
			// followingIndex++;
		}

		// 2. calculate the score for all elements in a sequence
		var itemScore = 0;
		// if the item is in the correct position we assign a low score
		if (this.answerList[i] == i) {
			itemScore += 0.5;
		}
		// if the item is in a sequence, we assign a higher score
		if (followingCorrAnswers + 1 > this.answerList.length / 2) {
			itemScore += 1;
			this.answerScore = 0.5;
		}
		if (followingCorrAnswers + 1 == this.answerList.length) {
			this.answerScore = 1;
		}

		// 3. assign the score for all items in the sequence
		for ( var j = i; j <= i + followingCorrAnswers; j++) {
			scores[this.answerList[j]] = itemScore;
		}

		// 4. skip all items that we have handled already
		i = i + followingCorrAnswers;

	}
	this.answerScoreList = scores;
};

AnswerModel.prototype.calculateNumericScore = function() {

	var answerModel = controller.models["answers"];
	var questionpoolModel = controller.models['questionpool'];

	if (questionpoolModel.getAnswer()[0] == answerModel.getAnswers()) {
		this.answerScore = 1;
	} else {
		this.answerScore = 0;
	}
};

