/**************************************************************************************************
Constructor the Game class
**************************************************************************************************/
function Game() {
	this.speed = 0.4 * ((fRatioLargeur+fRatioHauteur)/2);
	this.endlineHeight = canvas.height / 1.25 - (140 * ((fRatioLargeur+fRatioHauteur)/2)) * ((fRatioLargeur+fRatioHauteur)/2);
	this.isPaused = false;
	this.active = false;
	this.activeWave = 1;
	this.activeBackground = 1;
	this.cometsSpawned = 0;
	this.currentScore = 0;
	this.activeColumn = [true, true, true, true];
}

/**************************************************************************************************
Start the game
**************************************************************************************************/
Game.prototype.start = function() {

	window.addEventListener("blur", handleBlur);
	window.addEventListener("keydown", handleKeyDown, false);
	
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
	document.getElementById("wave").style.display = "block";
	document.getElementById("gameOver").style.display = "none";
	
	// X position of the columns where comets fall
	aListColonneX[0] = document.getElementById("igloo0").x;
	aListColonneX[1] = document.getElementById("igloo1").x;
	aListColonneX[2] = document.getElementById("igloo2").x;
	aListColonneX[3] = document.getElementById("igloo3").x;
	
	this.active = true;
	this.currentScore = 0;
	
	musicMenu.pause();
	musicGame.play();
	
	// Timer
	oTimer.start();
	//oTimerBonusYellowComets.start();
	//oTimerBonusRedComets.start();
	
	document.getElementById("score").innerHTML = "<span>00000000</span>";
}

/**************************************************************************************************
Stop and leave the game
**************************************************************************************************/
Game.prototype.stop = function() {
	
	window.removeEventListener("blur", handleBlur);
	window.removeEventListener("keydown", handleKeyDown, false);
	
	oGame.active = false;	
	oGame.destroyAllComets();
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	musicGame.pause();
	musicMenu.play();
	
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
	document.getElementById("wave").style.display = "none";
	document.getElementById("gameOver").style.display = "none";
}

/**************************************************************************************************
Pause the game
**************************************************************************************************/
Game.prototype.pause = function() {

	// Pause screen overlay displayed
	document.getElementById("pause").style.display = "block";
	
	oGame.isPaused = true;
	oTimer.pause();
	musicGame.pause();
}

/**************************************************************************************************
Resume the game (after a pause event)
**************************************************************************************************/
Game.prototype.resume = function() {

	// Pause screen overlay undisplayed
	document.getElementById("pause").style.display = "none";
	
	oGame.isPaused = false;
	oTimer.start();
	musicGame.play();
}

/**************************************************************************************************
Restart the game (after a game over or a win event)
**************************************************************************************************/
Game.prototype.restart = function() {
	
	this.destroyAllComets();
	
	document.getElementById("gameOver").style.display = "none";
	document.getElementById("background").style.backgroundImage = 'url("resources/backgrounds/1.jpg")';
	document.getElementById("background").style.backgroundSize = '100% 100%';
	document.getElementById("igloo0").src = "resources/igloos/intact.png";
	document.getElementById("igloo1").src = "resources/igloos/intact.png";
	document.getElementById("igloo2").src = "resources/igloos/intact.png";
	document.getElementById("igloo3").src = "resources/igloos/intact.png";
	
	this.isPaused = false;
	this.active = true;
	this.activeWave = 1;
	this.activeBackground = 1;
	this.cometsSpawned = 0;
	this.currentScore = 0;
	this.activeColumn = [true, true, true, true];
	
	musicGame.play();
	oTimer.reset();
	oTimer.start();
	
	document.getElementById("score").innerHTML = "<span>00000000</span>";
	document.getElementById("wave").innerHTML = "<span>Wave 1</span>";
	
}

/**************************************************************************************************
End the game - Call on "GAME OVER"
**************************************************************************************************/
Game.prototype.end = function() {

	this.saveScore();
	
	// Game over screen overlay displayed
	document.getElementById("gameOver").style.display = "block";
	
	oGame.isPaused = true;
	oTimer.pause();
	musicGame.pause();
}

/**************************************************************************************************
Update the lednums
**************************************************************************************************/
Game.prototype.updateLednums = function(key) {
	
	// Number
	if ((key != "+") && (key != "-")) {
		
		var oldLednum0 = lednum0.src;
		var oldLednum1 = lednum1.src;
	
		lednum0.src = "resources/status/lednums/lednums"+key+".png";
		lednum1.src = oldLednum0;
		lednum2.src = oldLednum1;
	}
	// Enter
	else if (key == "+") {
	
		var val = subStringRight(lednum2.src, 12).charAt(7) +""+subStringRight(lednum1.src, 12).charAt(7)+""+subStringRight(lednum0.src, 12).charAt(7);

		if (negativeSign== true) {
			val = "-"+val;
		}
	
		this.destroyComet(val);
		
		lednum0.src = "resources/status/lednums/lednums0.png";
		lednum1.src = "resources/status/lednums/lednums0.png";
		lednum2.src = "resources/status/lednums/lednums0.png";
		lednumneg.style.visibility = "hidden";
		negativeSign = false;
	}
	// Negative sign
	else if (key == "-") {
		lednumneg.style.visibility = "visible";
		negativeSign = true;
	}
}

/**************************************************************************************************
Affichage des comètes
**************************************************************************************************/
Game.prototype.drawComete = function() {

	// A comet spawn every 7 seconds
	if ((oTimer.secondsElapsed == 7) && (oTimer.cSecondsElapsed == 0) && (this.cometsSpawned < wavesTab[this.activeWave-1].nbrEq)){

		var randomColumn = Math.floor(Math.random() * 4);

		while (this.activeColumn[randomColumn] == false ){
			randomColumn = Math.floor(Math.random() * 4);
		}
		
		// Create and add a new comet in the array aListComet
		var oComete = new Comet(imgCometeZero, aListColonneX[randomColumn], 0, wavesTab[this.activeWave-1]);
		aListComete.push(oComete);
		
		ctx.drawImage(oComete.img, oComete.x, oComete.y, oComete.width / 1.5, oComete.height / 1.5);
				
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillText(oComete.eq2, oComete.x,  oComete.y + 50);

		// this.cometsSpawned = this.cometsSpawned + 1;
		
		oTimer.reset();
	}
	
	for(var i=0;i<aListComete.length;i++) {
		
		// Update the range of motion of comets down
		previousTimestamp = currentTimestamp;
		currentTimestamp = Date.now();
		elapsedTime += currentTimestamp - previousTimestamp;
		
		// 1000 = 1 second 
		// Currently = 100 = 0.1 seconds
		if (elapsedTime >= 100) {
		
			// Workng principle for each comet :
			//	- If so comet0 comet1
			//	- If so comet1 comet2
			//	- If so comet2 comet0
			// And so on ... This allows for the illusion of movement for each comet
			for(var j=0;j<aListComete.length;j++) {
			
				if (aListComete[j].img.src.indexOf("comet0.png") !== -1) {
					aListComete[j].img = imgCometeOne;
				}
				else if (aListComete[j].img.src.indexOf("comet1.png") !== -1) {
					aListComete[j].img = imgCometeTwo;
				}
				else {
					aListComete[j].img = imgCometeZero;
				}
			}
			
			elapsedTime = 0;		
		}
		
		if (aListComete[i].y < this.endlineHeight) {
		
			aListComete[i].down(this.speed);
			ctx.fillStyle = "white";
			ctx.drawImage(aListComete[i].img, aListComete[i].x, aListComete[i].y, aListComete[i].width / 1.5, aListComete[i].height / 1.5);
			
			var str = "";
			
			for (var k = 0; k<aListComete[i].eq2.length; k++) {
			
				var tmp = (aListComete[i].x + k * (12 * ((fRatioLargeur+fRatioHauteur)/2)));
				
				if (aListComete[i].eq2[k] == "+") {
					ctx.drawImage(oCometeNumsAdd, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsAdd.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsAdd.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "-") {
					ctx.drawImage(oCometeNumsSub, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsSub.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsSub.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "/") {
					ctx.drawImage(oCometeNumsDiv, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsDiv.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsDiv.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "*") {
					ctx.drawImage(oCometeNumsMul, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsMul.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsMul.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "=") {
					ctx.drawImage(oCometeNumsEqual, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsEqual.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsEqual.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "?") {
					ctx.drawImage(oCometeNumsInt, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsInt.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsInt.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "0") {
					ctx.drawImage(oCometeNums0, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums0.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums0.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "1") {
					ctx.drawImage(oCometeNums1, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums1.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums1.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "2") {
					ctx.drawImage(oCometeNums2, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums2.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums2.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "3") {
					ctx.drawImage(oCometeNums3, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums3.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums3.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "4") {
					ctx.drawImage(oCometeNums4, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums4.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums4.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "5") {
					ctx.drawImage(oCometeNums5, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums5.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums5.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "6") {
					ctx.drawImage(oCometeNums6, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums6.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums6.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "7") {
					ctx.drawImage(oCometeNums7, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums7.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums7.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "8") {
					ctx.drawImage(oCometeNums8, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums8.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums8.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (aListComete[i].eq2[k] == "9") {
					ctx.drawImage(oCometeNums9, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums9.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums9.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
			}
		}
		else {
			soundExplosion.play();
			
			var tmpNb = 0;
			
			for (var j=0;j<aListColonneX.length;j++) {
				if (aListColonneX[j] == aListComete[i].x) {					
					tmpNb = j;
				}
			}
			
			if (document.getElementById("igloo"+tmpNb).src.indexOf("intact.png") !== -1) {	
				document.getElementById("igloo"+tmpNb).src = "resources/igloos/half.png";
			}
			else if (document.getElementById("igloo"+tmpNb).src.indexOf("half.png") !== -1) {
				document.getElementById("igloo"+tmpNb).src = "resources/igloos/melted1.png";
				this.activeColumn[tmpNb] = false;
			}

			// Delete comet from the array aListComet
			aListComete.remove(i);
			
			this.updateScore(-25);
			
			// All igloos destroyed => Game over
			if ((this.activeColumn[0] == false) && (this.activeColumn[1] == false) && (this.activeColumn[2] == false) && (this.activeColumn[3] == false)) {
				this.end();
			}
			
			// All comets destroyed => Go to the next wave 
			if ((this.cometsSpawned == wavesTab[this.activeWave-1].nbrEq) && (aListComete.length == 0)){
				this.goToNextWave();
			}
		}
	}
}

/**************************************************************************************************
Draw yellow comets
**************************************************************************************************/
Game.prototype.drawYellowComets = function() {
	
	if ((oTimerBonusYellowComets.secondsElapsed == 45) && (oTimerBonusYellowComets.cSecondsElapsed == 0)) {
		
		if (oYellowComet == 0) {
			
			var randomHeight = Math.floor(Math.random() * canvas.height);
			var minHeight = canvas.height / 10;
			var maxHeight = canvas.height / 1.2;
			
			while ((randomHeight < minHeight) || (randomHeight > maxHeight)) {
				randomHeight = Math.floor(Math.random() * canvas.height);
			}
			
			oYellowComet = new Comet(imgYellowCometZero, 0, randomHeight, wavesTab[this.activeWave-1]);
			
			ctx.drawImage(oYellowComet.img, oYellowComet.x, oYellowComet.y, oYellowComet.width / 1.5, oYellowComet.height / 1.5);
			
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.fillText(oYellowComet.eq2, oYellowComet.x,  oYellowComet.y);
		}
	}
	
	if (oYellowComet != 0) {
	
		previousTimestampYellow = currentTimestampYellow;
		currentTimestampYellow = Date.now();
		elapsedTimeYellow += currentTimestampYellow - previousTimestampYellow
		
		if (elapsedTimeYellow >= 100) {
		
			// Workng principle for each comet :
			//	- If so comet0 comet1
			//	- If so comet1 comet2
			//	- If so comet2 comet0
			// And so on ... This allows for the illusion of movement for each comet

			if (oYellowComet.img.src.indexOf("comet0.png") !== -1) {
				oYellowComet.img = imgYellowCometOne;
			}
			else if (oYellowComet.img.src.indexOf("comet1.png") !== -1) {
				oYellowComet.img = imgYellowCometTwo;
			}
			else {
				oYellowComet.img = imgYellowCometZero;
			}
			
			elapsedTimeYellow = 0;		
		}
		
		if (oYellowComet.x < canvas.width) {
		
			oYellowComet.right(this.speed);
			ctx.fillStyle = "white";
			ctx.drawImage(oYellowComet.img, oYellowComet.x, oYellowComet.y, oYellowComet.width / 1.5, oYellowComet.height / 1.5);
			
			var str = "";
			
			for (var k = 0; k<oYellowComet.eq2.length; k++) {
			
				var tmp = (oYellowComet.x + k * (12 * ((fRatioLargeur+fRatioHauteur)/2)));
				
				if (oYellowComet.eq2[k] == "+") {
					ctx.drawImage(oCometeNumsAdd, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsAdd.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsAdd.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "-") {
					ctx.drawImage(oCometeNumsSub, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsSub.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsSub.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "/") {
					ctx.drawImage(oCometeNumsDiv, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsDiv.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsDiv.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "*") {
					ctx.drawImage(oCometeNumsMul, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsMul.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsMul.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "=") {
					ctx.drawImage(oCometeNumsEqual, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsEqual.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsEqual.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "?") {
					ctx.drawImage(oCometeNumsInt, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsInt.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsInt.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "0") {
					ctx.drawImage(oCometeNums0, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums0.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums0.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "1") {
					ctx.drawImage(oCometeNums1, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums1.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums1.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "2") {
					ctx.drawImage(oCometeNums2, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums2.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums2.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "3") {
					ctx.drawImage(oCometeNums3, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums3.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums3.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "4") {
					ctx.drawImage(oCometeNums4, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums4.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums4.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "5") {
					ctx.drawImage(oCometeNums5, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums5.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums5.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "6") {
					ctx.drawImage(oCometeNums6, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums6.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums6.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "7") {
					ctx.drawImage(oCometeNums7, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums7.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums7.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "8") {
					ctx.drawImage(oCometeNums8, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums8.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums8.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oYellowComet.eq2[k] == "9") {
					ctx.drawImage(oCometeNums9, tmp, oYellowComet.y + (50 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums9.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums9.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
			}
		}
		else {
			console.log("reset");
			oTimerBonusYellowComets.reset();
			oYellowComet = 0;
		}
	}
}

/**************************************************************************************************
Draw red comets
**************************************************************************************************/
Game.prototype.drawRedComets = function() {

	if ((oTimerBonusRedComets.secondsElapsed == 90) && (oTimerBonusRedComets.cSecondsElapsed == 0)) {
		
		if (oRedComet == 0) {
		
			var randomColumn = Math.floor(Math.random() * 4);
			
			oRedComet = new Comet(imgRedCometZero, aListColonneX[randomColumn], 0, wavesTab[this.activeWave-1]);

			ctx.drawImage(oRedComet.img, oRedComet.x,  oRedComet.y, oRedComet.width / 1.5, oRedComet.height / 1.5);
			
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.fillText(oRedComet.eq2, oRedComet.x,  oRedComet.y);
		}
	}
	
	if (oRedComet != 0) {
	
		previousTimestampRed = currentTimestampRed;
		currentTimestampRed = Date.now();
		elapsedTimeRed += currentTimestampRed - previousTimestampRed;
		
		if (elapsedTimeRed >= 100) {
		
			// Workng principle for each comet :
			//	- If so comet0 comet1
			//	- If so comet1 comet2
			//	- If so comet2 comet0
			// And so on ... This allows for the illusion of movement for each comet
			if (oRedComet.img.src.indexOf("comet0.png") !== -1) {
				oRedComet.img = imgRedCometOne;
			}
			else if (oRedComet.img.src.indexOf("comet1.png") !== -1) {
				oRedComet.img = imgRedCometTwo;
			}
			else {
				oRedComet.img = imgRedCometZero;
			}
			
			elapsedTimeRed = 0;		
		}
		
		if (oRedComet.y < this.endlineHeight) {
		
			oRedComet.down(this.speed * 2.0);
			ctx.fillStyle = "white";
			ctx.drawImage(oRedComet.img, oRedComet.x, oRedComet.y, oRedComet.width / 1.5, oRedComet.height / 1.5);
			
			var str = "";
			
			for (var k = 0; k<oRedComet.eq2.length; k++) {
			
				var tmp = (oRedComet.x + k * (12 * ((fRatioLargeur+fRatioHauteur)/2)));
				
				if (oRedComet.eq2[k] == "+") {
					ctx.drawImage(oCometeNumsAdd, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsAdd.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsAdd.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "-") {
					ctx.drawImage(oCometeNumsSub, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsSub.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsSub.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "/") {
					ctx.drawImage(oCometeNumsDiv, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsDiv.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsDiv.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "*") {
					ctx.drawImage(oCometeNumsMul, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsMul.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsMul.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "=") {
					ctx.drawImage(oCometeNumsEqual, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsEqual.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsEqual.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "?") {
					ctx.drawImage(oCometeNumsInt, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNumsInt.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNumsInt.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "0") {
					ctx.drawImage(oCometeNums0, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums0.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums0.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "1") {
					ctx.drawImage(oCometeNums1, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums1.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums1.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "2") {
					ctx.drawImage(oCometeNums2, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums2.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums2.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "3") {
					ctx.drawImage(oCometeNums3, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums3.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums3.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "4") {
					ctx.drawImage(oCometeNums4, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums4.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums4.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "5") {
					ctx.drawImage(oCometeNums5, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums5.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums5.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "6") {
					ctx.drawImage(oCometeNums6, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums6.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums6.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "7") {
					ctx.drawImage(oCometeNums7, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums7.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums7.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "8") {
					ctx.drawImage(oCometeNums8, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums8.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums8.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
				else if (oRedComet.eq2[k] == "9") {
					ctx.drawImage(oCometeNums9, tmp, oRedComet.y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums9.width / 1.5 * ((fRatioLargeur+fRatioHauteur)/2), oCometeNums9.height / 1.5 * ((fRatioLargeur+fRatioHauteur)/2));
				}
			}
		}
		else {
			oTimerBonusRedComets.reset();
			oRedComet = 0;
		}
	}
}

/**************************************************************************************************
Destroys all the comets whose they equation has solution the parameter val
**************************************************************************************************/
Game.prototype.destroyComet = function(val) {
	
	var aLednumsCoords = [];
	aLednumsCoords = getPosition("lednums");
	
	var verifComet = false;

	soundLaser.play();
	
	for (var i=0; i<aListComete.length;i++) {
		
		if (aListComete[i].eq.solution == val) {
			
			verifComet = true;
			
			ctx.beginPath();
			ctx.strokeStyle='red';
			ctx.lineWidth=4;
			ctx.moveTo(canvas.width / 2, aLednumsCoords[1]);
			ctx.lineTo(aListComete[i].x,aListComete[i].y);
			ctx.stroke();

			aListComete.remove(i);
			
			soundSizzling.play();
			
			this.updateScore(10);
			
			this.cometsSpawned = this.cometsSpawned + 1;

			if (this.cometsSpawned == wavesTab[this.activeWave-1].nbrEq) {
				this.goToNextWave();
			}
		}
	}
	
	if (oYellowComet != 0) {
	
		if (oYellowComet.eq.solution == val) {
		
			soundSizzling.play();
			
			verifComet = true;
			
			ctx.beginPath();
			ctx.strokeStyle='red';
			ctx.lineWidth=4;
			ctx.moveTo(canvas.width / 2, aLednumsCoords[1]);
			ctx.lineTo(oYellowComet.x,oYellowComet.y);
			ctx.stroke();
			
			this.updateScore(10 * aListComete.length + 75);
			
			this.destroyAllComets();
			oTimerBonusYellowComets.reset();
		}
		
	}
	
	if (oRedComet != 0) {
	
		if (oRedComet.eq.solution == val) {
		
			soundSizzling.play();
			
			verifComet = true;
			
			ctx.beginPath();
			ctx.strokeStyle='red';
			ctx.lineWidth=4;
			ctx.moveTo(canvas.width / 2, aLednumsCoords[1]);
			ctx.lineTo(oRedComet.x,oRedComet.y);
			ctx.stroke();
			
			this.updateScore(10 * aListComete.length + 75);
			
			this.healIgloo();
			oTimerBonusRedComets.reset();
			oRedComet = 0;
		}
		
	}
	
	if (verifComet == false) {
		soundBuzz.play();
	}
}


/**************************************************************************************************
Goes to the next wave and updates the interface
**************************************************************************************************/
Game.prototype.goToNextWave = function() {

	this.activeWave = this.activeWave + 1;
	this.cometsSpawned = 0;
	
	document.getElementById("wave").innerHTML = "<span>Wave "+this.activeWave+"</span>";
				
	var randomBackground = this.activeBackground;
				
	while (randomBackground == this.activeBackground) {
		randomBackground = Math.floor(Math.random()*7);
	}
				
	document.getElementById("background").style.backgroundImage = "url(resources/backgrounds/"+randomBackground+".jpg)";
	document.getElementById("background").style.backgroundSize = '100% 100%';
	
	oTimer.reset();
}

/**************************************************************************************************
Heals an igloo
**************************************************************************************************/
Game.prototype.healIgloo = function() {

	if ((this.activeColumn[0] == false) || (this.activeColumn[1] == false) || (this.activeColumn[2] == false) || (this.activeColumn[3] == false)) {
		if (this.activeColumn[0] == false) {
			this.activeColumn[0] = true;
			document.getElementById("igloo0").src = "resources/igloos/half.png";
		}
		else if (this.activeColumn[1] == false) {
			this.activeColumn[1] = true;
			document.getElementById("igloo1").src = "resources/igloos/half.png";
		}
		else if (this.activeColumn[2] == false) {
			this.activeColumn[2] = true;
			document.getElementById("igloo2").src = "resources/igloos/half.png";
		}
		else if (this.activeColumn[3] == false) {
			this.activeColumn[3] = true;
			document.getElementById("igloo3").src = "resources/igloos/half.png";
		}
	}
	else {
		
		var tmp = false;
		
		if (document.getElementById("igloo0").src.indexOf("half.png") !== -1) {
			document.getElementById("igloo0").src = "resources/igloos/intact.png";
			tmp = true;
		}
		else if ((document.getElementById("igloo1").src.indexOf("half.png") !== -1) && (tmp == false)) {
			document.getElementById("igloo1").src = "resources/igloos/intact.png";
			tmp = true;
		}
		else if ((document.getElementById("igloo2").src.indexOf("half.png") !== -1) && (tmp == false)) {
			document.getElementById("igloo2").src = "resources/igloos/intact.png";
			tmp = true;
		}
		else if ((document.getElementById("igloo3").src.indexOf("half.png") !== -1) && (tmp == false)) {
			document.getElementById("igloo3").src = "resources/igloos/intact.png";
			tmp = true;
		}
	}
}

/**************************************************************************************************
Destroys all comets present on the screen
**************************************************************************************************/
Game.prototype.destroyAllComets = function() {
	aListComete = [];
	oYellowComet = 0;
	oRedComet = 0;
}


/**************************************************************************************************
Updates the score
**************************************************************************************************/
Game.prototype.updateScore = function(update) {

	this.currentScore += update;
	
	if (this.currentScore > 0) {
		var tmpScore = ""+this.currentScore+"";
		
		while (tmpScore.length != 8) {
			tmpScore = "0"+tmpScore;
		}
		
		document.getElementById("score").innerHTML = "<span>"+tmpScore+"</span>";
	}
	else {
		this.currentScore = 0;
		document.getElementById("score").innerHTML = "<span>00000000</span>";
	}
}

/**************************************************************************************************
Saves the score
**************************************************************************************************/
Game.prototype.saveScore = function() {
	saveScore(this.currentScore, this.activeWave);
}

/**************************************************************************************************
Changes the image of Tux
**************************************************************************************************/
Game.prototype.animateTux = function(key) {
	
	if (key != 13) {
		if ((eltTux.src.indexOf("sit.png") !== -1) || (eltTux.src.indexOf("drat.png") !== -1) || (eltTux.src.indexOf("kiss2.png") !== -1) || (eltTux.src.indexOf("yay2.png") !== -1) || (eltTux.src.indexOf("yipe.png") !== -1)){
			eltTux.src = "resources/tux/tux-console1.png";
		}
		else if (eltTux.src.indexOf("console1.png") !== -1) {
			eltTux.src = "resources/tux/tux-console2.png";
		}
		else if (eltTux.src.indexOf("console2.png") !== -1) {
			eltTux.src = "resources/tux/tux-console3.png";
		}
		else if (eltTux.src.indexOf("console3.png") !== -1) {
			eltTux.src = "resources/tux/tux-console4.png";
		}
		else if (eltTux.src.indexOf("console4.png") !== -1) {
			eltTux.src = "resources/tux/tux-console1.png";
		}
	}
	else {
		var randomPosition = Math.floor(Math.random() * 5);
		
		if (randomPosition == 1) {
			eltTux.src = "resources/tux/tux-drat.png";
		}
		else if (randomPosition == 2) {
			eltTux.src = "resources/tux/tux-kiss2.png";
		}
		else if (randomPosition == 3) {
			eltTux.src = "resources/tux/tux-yay2.png";
		}
		else {
			eltTux.src = "resources/tux/tux-yipe.png";
		}
	}
}