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

var handleClickRestart = function() {
	oGame.restart();
}

var handleClickExitMenu = function() {
	document.getElementById("menu").style.display = "table";
	document.getElementById("tabScore").style.display = "none";
	document.getElementById("tabHelp").style.display = "none";
	document.getElementById("exitButton").style.display = "none";
}

var handleClickExitGame = function() {
	oGame.stop();
	exitButton.addEventListener("click", handleClickExitMenu, false);
	exitButton.removeEventListener("click", handleClickExitGame, false);
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

	exitButton.removeEventListener("click", handleClickExitMenu, false);
	exitButton.addEventListener("click", handleClickExitGame, false);
	
	oGame.start();
	
	//setInterval( function () {
	//	stats.begin();
			// Step
			step();
	//	stats.end();
	//}, 1000 / 60 );	
}

var launchHelp = function() {alert("Help")};
var launchOptions = function() {alert("Options")};

var launchScores = function() {
	
	readAllScores();
	document.getElementById("tabScore").style.display = "block";
	document.getElementById("exitButton").style.display = "block";
	
	document.getElementById("menu").style.display = "none";
};