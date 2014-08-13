var globalCount = -1;
var globalCorrect = 0;

var q1 = new Question (1, "How could you select the second item in an unordered list (#mylist)?", ["#mylist:li(2)","#mylist:nth-child(2)","#mylist li:nth-child(2)","#mylist li.nth-child(2)"], "I learned this while making this quiz. It's counter-intuitive to me, but it's like saying \"find an li that's an nth-child(2)\".", "#mylist li:nth-child(2)");
var q2 = new Question (2, "What is the new HTML5 element used for menu bars?", ["menu","header","nav","ul"], "\"nav\" is the new HTML5 element. No more having to do <div class=\"nav\">.","nav");
var q3 = new Question (3, "Which of these is an example of an attirbute selector?", ["a.value","a:href=\"google.com\"","a:target","a[target]"], "foo[bar] is the Attribute Present selector. This selects foo elements if the given bar attribute is present.","a[target]");
var q4 = new Question (4, "Which attribute selector will select <a href=\"foobar\"> and not <a href=\"barfoo\">?", ["a[\"foobar\"]","a[href\$=\"bar\"]","a[href~=\"foobar\"]","a[href*=\"foo\"]"], "\$= is the \"attribute ends with\" selector. So href$=\"bar\" will select foobar rather than barfoo","a[href\$=\"bar\"]");
var q5 = new Question (5, "What's a good way to center an element with css?", ["align: center","float: center","padding: 0 auto","margin: 0 auto"], "This seems to be the standard way to center an element. I'm not sure if it works in all cases...", "margin: 0 auto");
var q6 = new Question (6, "Which type of positioning would you use to lock a footer at the bottom of the browser window?", ["absolute","static","fixed","relative"], "Fixed positioning is relative to the browser viewport and does not scroll with the page.","fixed");
var q7 = new Question (7, "Which type of positioning would you use to move an element relative to its parent?", ["absolute","static","fixed","relative"], "Absolutely positioned elements are removed from the normal flow of the document. Upon removing the element from the normal flow, elements are positioned directly in relation to their containing parent whom is relatively or absolutely positioned.","absolute");
var q8 = new Question (8, "What is the most valuable use for relative positioning?", ["removing an element from flow","making a flyout menu","as a containing box for absolutely positioned elements","as a containig box for fixed positioned elements"], "relative positioning is weird. It moves the element, but everything else flows around where it would've been. It seems most often used as a containing box for absolutely positioned elements.","as a containing box for absolutely positioned elements");
var q9 = new Question (9, "Which background css will make a white background with a single image 30 px from the top and 20 pix from the left?", ["background: #fff url(\"img.gif\") 30px 20px no-repeat","background: #000 url(\"img.gif\") 30px 20px no-repeat","background: #fff url(\"img.gif\") 20px 30px no-repeat","background: #000 url(\"img.gif\") 20px 30px no-repeat"], "#fff is white & the first pixel value is the horizontal value, while the second pixel value is the vertical value.","background: #fff url(\"img.gif\") 20px 30px no-repeat");
var q10 = new Question (10, "How do you get rid of the dots from a ul?", ["list-style: none","list-style-type: blank","margin: 0","list-style: unordered"], "list-style is a shorthand property for list-style-type & list-style-position. list-style-type: none\; and list-style: none\; will remove the default marker for a ul or ol.","list-style: none");
var q11 = new Question (11, "Which of these html elements will make a textarea?", ["<input type=\"textarea\">some text</>","<text-input type=\"textarea\">some text</>","<textarea>some text</>","<div type=\"input\">some text</>"], "<textarea> is the correct form element. But text boxes are made like <input type=\"text\">, so it's kinda weird to me.", "<textarea>some text</>");
var q12 = new Question (12, "How do you make a form element required in HTML5?", ["jQuery form validation","<input ... required>","<input ... required=\"true\">","input { required: true\;}"], "I guess this is sorta a trick question. Adding the \"required\" attribute to a form element will make it required. Using required=\"true\" is technically incorrect because required=\"false\" does not actually make it optional.","<input ... required>");



var questionList = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12];

$(document).ready(function(){

// quiz data structure


	$('form').on('click', '#answerButton', function( e ){
		e.preventDefault();
		if(globalCount == -1) {
			startQuiz();
		} else {
			resolveAnswer(questionList[globalCount]);
		}
	});

	$('#overlay').on('click', 'button', function ( e ) {
		e.preventDefault();
		globalCount++;
		if (globalCount < questionList.length) {
			displayQuestion(questionList[globalCount]);
		} else {
			endGame();
		}
		$('#overlay').hide();
	});
});

function startQuiz() {
	$('#answerButton').val("submit");
	$('form').find('.answers').show();

	var qList = $('.container').find('.question-list');
	qList.empty();

	for (i = 1; i <= questionList.length; i++) {
		qList.append('<li>'+i+'</li>');
	}
	qList.show();

	globalCount++;
	displayQuestion(questionList[globalCount]);
}

function Question (num, questionText, answerOptions, explanation, correct) {
	this.num = num;
	this.questionText = questionText;
	this.answerOptions = answerOptions;
	this.explanation = explanation;
	this.correct = correct;
}

function displayQuestion (curQ) {
	$('.header').find('h1').text('Question '+curQ.num);
	$('.container').find('.question').text(curQ.questionText);
	displayAnswers(curQ);
}

function displayAnswers (curQ) {
	var answerList = curQ.answerOptions;
	var numAnswers = answerList.length;
	// remove current "answers"
	$('form').find('.answers').empty();

	for (var i = 0; i < numAnswers; i++) {
		$('form').find('.answers').append('<li><input type="radio" id="radio'+i+'" name="answers" value="'+i+'"><label for="radio'+i+'">'+answerList[i]+'</label></li>');
	}
}

function resolveAnswer( curQ ) {
	var checkedAnswerIndex = $("form input[type='radio']:checked").val();
	// x = user answer
	var userAns = curQ.answerOptions[checkedAnswerIndex];
	// y = correct answer
	var correctAns = curQ.correct;
	// compare x & y, then do stuff
	var theH = $('#overlay').find('h1');
	var qNum = curQ.num;
	if (userAns == correctAns) {
		theH.text("Correct!");
		theH.removeClass('wrong');
		$('.question-list li:nth-child('+qNum+')').addClass('right');
		globalCorrect++;
	} else {
		theH.text("Wrong :(");
		theH.addClass('wrong');
		$('.question-list li:nth-child('+qNum+')').addClass('wrong');
	}
	// populate overlay with x, y, and explanation
	$('#overlay').find('h2').text('correct answer: '+correctAns);
	$('#overlay').find('h3').text('your answer: '+userAns);
	$('#overlay').find('p').text(curQ.explanation);
	// pop-up overlay
	$('#overlay').show();
}

function endGame () {
	var lastWord = calculateLastWord();

	$('.header').find('h1').text('Game Over');
	$('.container').find('.question').text('You scored '+globalCorrect+' out of '+questionList.length+'.');
	$('.container').find('.question').append('<h1 class="last-word">'+lastWord+'</h1>')
	$('#answerButton').val("play again");
	$('.answers').hide();
	globalCorrect = 0;
	globalCount = -1;
}

function calculateLastWord() {
	var numCorrect = globalCorrect;
	var totalQ = questionList.length;
	var percent = numCorrect/totalQ;
	var lastWord = "foo bar";

	if (percent == 1) {
		lastWord = "PERFECT! YOU ARE A CHAMPION!";
	} else if ( percent >= .9 ) {
		lastWord = "Well Done! Go make a website!";
	} else if ( percent >= .8 ) {
		lastWord = "Very good, grasshoppa.";
	} else if ( percent >= .7 ) {
		lastWord = "Not Bad. Study harder.";
	} else if ( percent >= .6 ) {
		lastWord = "If you can't do, teach.";
	} else if ( percent >= .4 ) {
		lastWord = "Well done. Now, about that bridge I have for sale...";
	} else {
		lastWord = "um ... yeah ... better just stick to using weebly."
	}
	return lastWord;
}





