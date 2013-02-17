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

var handleClickPause = function() {

	oGame.pause = true;
	document.getElementById("pause").style.display = "block";
}

var handleClickResume = function() {

	oGame.pause = false;
	document.getElementById("pause").style.display = "none";
}

var handleClickExit = function() {
	
	oGame.active = false;	
	oGame.deleteAllComets();
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Set up menu
	document.getElementById("topLeftLogo").style.display = "block";
	document.getElementById("bottomLeftLogo").style.display = "block";
	document.getElementById("menu").style.display = "table";
	document.getElementById("background").style.backgroundImage = 'url("resources/title/menu_bkg.jpg")';
	document.getElementById("background").style.backgroundSize = '100% 100%';
	
	// Hide the game
	document.getElementById("keypad").style.display = "none";
	document.getElementById("igloo").style.display = "none";
	document.getElementById("console").style.display = "none";
	document.getElementById("exitButton").style.display = "none";
	document.getElementById("pauseButton").style.display = "none";
	document.getElementById("pause").style.display = "none";
	document.getElementById("score").style.display = "none";
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

	// Hide menu
	document.getElementById("topLeftLogo").style.display = "none";
	document.getElementById("bottomLeftLogo").style.display = "none";
	document.getElementById("menu").style.display = "none";
	
	// Setup the game
	document.getElementById("background").style.backgroundImage = 'url("resources/backgrounds/1.jpg")';
	document.getElementById("background").style.backgroundSize = '100% 100%';
	document.getElementById("keypad").style.display = "block";
	document.getElementById("igloo").style.display = "block";
	document.getElementById("console").style.display = "block";
	document.getElementById("exitButton").style.display = "block";
	document.getElementById("pauseButton").style.display = "block";
	document.getElementById("score").style.display = "block";
	
	// X position of the columns where comets fall
	aListColonneX[0] = document.getElementById("igloo0").x;
	aListColonneX[1] = document.getElementById("igloo1").x;
	aListColonneX[2] = document.getElementById("igloo2").x;
	aListColonneX[3] = document.getElementById("igloo3").x;
	
	oGame.active = true;
	oGame.currentScore = 0;
	oTimer.start();

	document.getElementById("score").innerHTML = "<span>00000000</span>";
	
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