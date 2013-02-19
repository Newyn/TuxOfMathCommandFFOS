/**************************************************************************************************
Constructor the game
**************************************************************************************************/

function Game() {
	this.speed = 5.0;
	this.isPaused = false;
	this.active = false;
	this.activeWave = 1;
	this.activeBackground = 1;
	this.cometsSpawned = 0;
	this.currentScore = 0;
	this.activeColumn = [true, true, true, true];
}

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
	oTimer.start();

	document.getElementById("score").innerHTML = "<span>00000000</span>";
}

Game.prototype.stop = function() {
	
	window.removeEventListener("blur", handleBlur);
	window.removeEventListener("keydown", handleKeyDown, false);
	
	oGame.active = false;	
	oGame.deleteAllComets();
	
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

Game.prototype.pause = function() {

	document.getElementById("pause").style.display = "block";
	
	oGame.isPaused = true;
	oTimer.pause();
	musicGame.pause();
}

Game.prototype.resume = function() {

	// Pause screen overlay undisplayed
	document.getElementById("pause").style.display = "none";
	
	oGame.isPaused = false;
	oTimer.start();
	musicGame.play();
}

Game.prototype.restart = function() {
	
	this.deleteAllComets();
	
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

Game.prototype.end = function() {

	// Game over screen overlay displayed
	document.getElementById("gameOver").style.display = "block";
	
	oGame.isPaused = true;
	oTimer.pause();
	musicGame.pause();
}

/**************************************************************************************************
Update lednums
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
	
		this.calculComete(val);
		
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
		
		// Creating and adding a new comet in the table
		console.log ();
		var oComete = new Comete(imgCometeZero, aListColonneX[randomColumn], 0, wavesTab[this.activeWave-1]);
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
		
		
		if (aListComete[i].y < GAME_ENDLINE_HEIGHT) {
		
			aListComete[i].descendre(GAME_SPEED);
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
			else {
				// TODO : Il n'y a plus de vies => GAME OVER
			}
			
			// TOFIX : Explosion de la comète
			
			//var oCometeImage = new Image();
			//oCometeImage.src = "resources/comets/cometex0.png";
			//aListComete[i]._img = oCometeImage;
			//ctx.drawImage(aListComete[i]._img, aListComete[i]._x, aListComete[i]._y);
			//ctx.drawImage(oCometeImage, aListComete[i]._x, aListComete[i]._y);
			
			
			/*for (var j=0;j<aListIgloo.length;j++) {
				
				// Readjustment of the position x igloos with that of comets
				var oIglooX = aListIgloo[j].x + 15;
				
				// Once we found the igloo is the comet
				if (oIglooX == aListComete[i].x) {
					
					//Working principle, whenever a comet igloo button:
					// - If igloo intact then it becomes half
					// - If half igloo then it becomes melted1
					// - If igloo melted1 then GAME OVER
					if (aListIgloo[j].img.src.indexOf("intact.png") !== -1) {
					
						aListIgloo[j].img = imgIglooHalf;
						
						ctx.drawImage(aListIgloo[j].img, aListIgloo[j].x, aListIgloo[j].y, aListIgloo[j].width, aListIgloo[j].height);
					}
					else if (aListIgloo[j].img.src.indexOf("half.png") !== -1) {

						aListIgloo[j].img = imgIglooMelted;
						
						// Repositionnement de la nouvelle image 
						aListIgloo[j].x = aListIgloo[j].x - 20;
						aListIgloo[j].y = aListIgloo[j].y + 38;
						
						
						ctx.drawImage(aListIgloo[j].img, aListIgloo[j].x, aListIgloo[j].y, aListIgloo[j].width, aListIgloo[j].height);
					}
					else {
						// TODO : Il n'y a plus de vies => GAME OVER
					}
				}
			}*/
			
			// Suppression de la comète de l'array aListComete 
			aListComete.remove(i);
			
			if ((this.activeColumn[0] == false) && (this.activeColumn[1] == false) && (this.activeColumn[2] == false) && (this.activeColumn[3] == false)) {
				this.end();
			}
			
			if ((this.cometsSpawned == wavesTab[this.activeWave-1].nbrEq) && (aListComete.length == 0)){
				this.goToNextWave();
			}
		}
		
		
	}
}

/**************************************************************************************************
***************************************************************************************************
Destruction des comètes à partir de la console
/**************************************************************************************************
**************************************************************************************************/
Game.prototype.calculComete = function(val) {
	
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
			
			this.majScore();
			
			this.cometsSpawned = this.cometsSpawned + 1;

			if (this.cometsSpawned == wavesTab[this.activeWave-1].nbrEq) {
				this.goToNextWave();
			}
		}
	}
	
	if (verifComet == false) {
		soundBuzz.play();
	}
}

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

Game.prototype.majScore = function() {

	this.currentScore += 10;
	
	var tmpScore = ""+this.currentScore+"";
	
	while (tmpScore.length != 8) {
		tmpScore = "0"+tmpScore;
	}
	
	document.getElementById("score").innerHTML = "<span>"+tmpScore+"</span>";
}
/**************************************************************************************************
Delete all comets
**************************************************************************************************/
Game.prototype.deleteAllComets = function() {

	aListComete = [];
}