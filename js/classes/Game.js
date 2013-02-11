/**************************************************************************************************
Constructor the game
**************************************************************************************************/

function Game() {
	this.speed = 0.5;
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

	// Update interval appearance of comets
	previousTimestamp = currentTimestamp;
	currentTimestamp = Date.now();
	elapsedTime += currentTimestamp - previousTimestamp;
	
	// 1000 = 1 second 
	// Currently = 8000 = 8 seconds
	if (elapsedTime >= 8000) {
	
		// Creating and adding a new comet in the table
		var oComete = new Comete(imgCometeZero, aListColonneX[Math.floor(Math.random() * 4)], 0);
		aListComete.push(oComete);
		
		ctx.drawImage(oComete.img, oComete.x, oComete.y, oComete.width / 1.5, oComete.height / 1.5);
				
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillText(oComete.eq2, oComete.x,  oComete.y + 50);
		
		elapsedTime = 0;
	}
	
	for(var i=0;i<aListComete.length;i++) {
		
		// Update the range of motion of comets down
		previousTimestamp2 = currentTimestamp2;
		currentTimestamp2 = Date.now();
		elapsedTime2 += currentTimestamp2 - previousTimestamp2;
		
		// 1000 = 1 second 
		// Currently = 100 = 0.1 seconds
		if (elapsedTime2 >= 100) {
		
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
			
			elapsedTime2 = 0;	
		}
		
		
		if (aListComete[i].y < GAME_ENDLINE_HEIGHT) {
			aListComete[i].descendre(GAME_SPEED);
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.drawImage(aListComete[i].img, aListComete[i].x, aListComete[i].y, aListComete[i].width / 1.5, aListComete[i].height / 1.5);
			for (var k = 0; k<aListComete[i].eq2.length; k++) {
			
				var oCometeNums = new Image();
				
				if (aListComete[i].eq2[k] == "+") {
					oCometeNums.src = "resources/status/nums/add.png";
				}
				else if (aListComete[i].eq2[k] == "-") {
					oCometeNums.src = "resources/status/nums/sub.png";
				}
				else if (aListComete[i].eq2[k] == "/") {
					oCometeNums.src = "resources/status/nums/div.png";
				}
				else if (aListComete[i].eq2[k] == "*") {
					oCometeNums.src = "resources/status/nums/mul.png";
				}
				else if (aListComete[i].eq2[k] == "=") {
					oCometeNums.src = "resources/status/nums/equal.png";
				}
				else if (aListComete[i].eq2[k] == "?") {
					oCometeNums.src = "resources/status/nums/int.png";
				}
				else {
					oCometeNums.src = "resources/status/nums/"+aListComete[i].eq2[k]+".png";
				}
				
				oCometeNums.width = oCometeNums.width * ((fRatioLargeur+fRatioHauteur)/2);
				oCometeNums.height = oCometeNums.height * ((fRatioLargeur+fRatioHauteur)/2);
				
				var tmp = (aListComete[i].x + k * (12 * ((fRatioLargeur+fRatioHauteur)/2)));
				
				ctx.drawImage(oCometeNums, tmp, aListComete[i].y + (100 * ((fRatioLargeur+fRatioHauteur)/2)), oCometeNums.width / 1.5, oCometeNums.height / 1.5);
			}
			
			//ctx.fillText(aListComete[i].eq2, aListComete[i].x,  aListComete[i].y + 115);
		}
		else {
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
	
	for (var i=0; i<aListComete.length;i++) {
		
		if (aListComete[i].eq.solution == val) {
		
			ctx.beginPath();
			ctx.strokeStyle='red';
			ctx.lineWidth=4;
			ctx.moveTo(canvas.width / 2, aLednumsCoords[1]);
			ctx.lineTo(aListComete[i].x,aListComete[i].y);
			ctx.stroke();

			aListComete.remove(i);
		}
	}
}

