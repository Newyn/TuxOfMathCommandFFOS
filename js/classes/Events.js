var mouseClickKeypad = function(e) {

	if(e.offsetX || e.offsetY) {
        x = e.offsetX;
		y = e.offsetY;
    }
    else if(e.layerX || e.layerY){
        x = e.layerX;
		y = e.layerY;
    } 
	
	for (var i=0; i<aListKeypad.length; i++) {
		aListKeypad[i].click(x, y);
	}
}

var handleBlur = function() {
	if (oGame.isPaused == false) {
		oGame.pause();
	}
}

var handleClickPause = function() {
	oGame.pause();
}

var handleClickResume = function() {
	oGame.resume();
}

var handleClickExit = function() {
	oGame.stop();
}

var handleClickKeypad = function() {

	var key = this.id.charAt(6);
	oGame.updateLednums(key);
}

var handleKeyDown = function(e) {

	// 0
	if ((e.keyCode == 48) || (e.keyCode == 96)) {
		oGame.updateLednums(0);
	}
	// 1
	else if ((e.keyCode == 49) || (e.keyCode == 97)) {
		oGame.updateLednums(1);
	}
	// 2
	else if ((e.keyCode == 50) || (e.keyCode == 98)) {
		oGame.updateLednums(2);
	}
	// 3
	else if ((e.keyCode == 51) || (e.keyCode == 99)) {
		oGame.updateLednums(3);
	}
	// 4
	else if ((e.keyCode == 52) || (e.keyCode == 100)) {
		oGame.updateLednums(4);
	}
	// 5
	else if ((e.keyCode == 53) || (e.keyCode == 101)) {
		oGame.updateLednums(5);
	}
	// 6
	else if ((e.keyCode == 54) || (e.keyCode == 102)) {
		oGame.updateLednums(6);
	}
	// 7
	else if ((e.keyCode == 55) || (e.keyCode == 103)) {
		oGame.updateLednums(7);
	}
	// 8
	else if ((e.keyCode == 56) || (e.keyCode == 104)) {
		oGame.updateLednums(8);
	}
	// 9
	else if ((e.keyCode == 57) || (e.keyCode == 105)) {
		oGame.updateLednums(9);
	}
	// Negative sign
	else if (e.keyCode == 109) {
		oGame.updateLednums("-");
	}
	// Enter
	else if (e.keyCode == 13) {
		oGame.updateLednums("+");
	}
}

var launchGame = function() {

	oGame.start();
	
	setInterval( function () {
		stats.begin();
			// Step
			step();
		stats.end();
	}, 1000 / 60 );	
}

var launchHelp = function() {alert("Help")};
var launchOptions = function() {alert("Options")};
var launchExit = function() {alert("Exit")};