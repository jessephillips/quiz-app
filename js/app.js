var secretNum = 99;

$(document).ready(function(){

	$('.container').on('click', '#new-game', function( e ){
		startNewGame();

	});

	$('.container').on('click', 'button', function ( e ) {
		var inputBox = $('.container').find('input').val();
		var msg = guess(inputbox);
		.val(msg)
		inputBox.val("");
	});

	$("input").keypress(function(event) {
    	if (event.which == 13) {
        	var inputBox = $('.container').find('input').val();
        	guess(inputbox);
			inputBox.val("");
    	}
	});
});

var validateInput = function ( inputString ) {
	var stringToNum = +inputString;

	if ( isNaN(stringToNum) ) {
		alert("you must enter a number. you entered: " + inputString + ". Please try again." );
	} else if ( stringToNum % 1 != 0 ) {
		alert("You must enter an integer (non-decimal). You entered: " + stringToNum + ". Please try again.");
	} else {
		fizzBuzz(stringToNum);
	}
};

function startNewGame () {
	secretNum = randonNum();
}

function randomNum () {
	var rando = 99;
	return rando = 50;
}