/**************************************************************************************************
Constructeur de la partie
**************************************************************************************************/

function Game() {
	this.speed = 0.5;
}

/**************************************************************************************************
***************************************************************************************************
Lancement et initialisation de la partie
/**************************************************************************************************
**************************************************************************************************/

Game.prototype.start = function() {

	
	ctx.shadowColor = "";
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 0;
	
	for (var i=0;i<4;i++) {
		var oIglooImage = new Image();
		oIglooImage.src = "resources/igloos/intact.png";
		
		var oIgloo = new Igloo(oIglooImage, aListColonneX[i] - 15, COL_Y);
		
	}
	
	
}

/**************************************************************************************************
***************************************************************************************************
Affichage des igloos
/**************************************************************************************************
**************************************************************************************************/

Game.prototype.drawIgloo = function() {

	for(var i=0; i<aListIgloo.length; i++) {
		aListIgloo[i].draw();
	}
}

/**************************************************************************************************
***************************************************************************************************
Affichage de la console
/**************************************************************************************************
**************************************************************************************************/

Game.prototype.drawConsole = function() {
	oConsole.draw();
}

/**************************************************************************************************
***************************************************************************************************
Affichage des comètes
/**************************************************************************************************
**************************************************************************************************/

Game.prototype.drawComete = function() {
	/* Mise à jour de l'intervalle d'apparition des comètes */
	previousTimestamp = currentTimestamp;
	currentTimestamp = Date.now();
	elapsedTime += currentTimestamp - previousTimestamp;
	
	/* 5000 = 5 secondes */
	if (elapsedTime >= 8000) {
		
		var oCometeImage = new Image();
		oCometeImage.src = "resources/comets/comet0.png";
		
		/* Création d'une nouvelle comète et ajout au tableau */
		var oComete = new Comete(oCometeImage, aListColonneX[Math.floor(Math.random() * 4)], 0);
		aListComete.push(oComete);
		
		ctx.drawImage(oComete.img, oComete.x, oComete.y, oComete.width / 1.5, oComete.height / 1.5);
				
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillText(oComete.eq2, oComete.x,  oComete.y + 50);
		
		elapsedTime = 0;
	}
	
	for(var i=0;i<aListComete.length;i++) {
		
		/* Mise à jour de l'intervalle du mouvement des comètes descendantes */
		previousTimestamp2 = currentTimestamp2;
		currentTimestamp2 = Date.now();
		elapsedTime2 += currentTimestamp2 - previousTimestamp2;
		
		/* 100 = 0.1 secondes */
		if (elapsedTime2 >= 100) {
		
			/* Principe de fonctionnement, pour chacune des comètes :
				- Si comet0 alors comet1
				- Si comet1 alors comet2
				- Si comet2 alors comet0
			   Et ainsi de suite ... cela permet d'avoir l'illusion de mouvement pour chacune des comètes
			*/
			for(var j=0;j<aListComete.length;j++) {
			
				if (aListComete[j].img.src.indexOf("comet0.png") !== -1) {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet1.png";
					aListComete[j].img = oCometeImage;
				}
				else if (aListComete[j].img.src.indexOf("comet1.png") !== -1) {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet2.png";
					aListComete[j].img = oCometeImage;
				}
				else {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet0.png";
					aListComete[j].img = oCometeImage;
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
		
			// TOFIX : Explosion de la comète
			
			/*var oCometeImage = new Image();
			oCometeImage.src = "resources/comets/cometex0.png";
			aListComete[i]._img = oCometeImage;*/
			//ctx.drawImage(aListComete[i]._img, aListComete[i]._x, aListComete[i]._y);
			//ctx.drawImage(oCometeImage, aListComete[i]._x, aListComete[i]._y);
			
			
			for (var j=0;j<aListIgloo.length;j++) {
				
				/* Réajustement de la position x des igloos avec celle des comètes */
				var oIglooX = aListIgloo[j].x + 15;
				
				/* Dès qu'on a trouvé l'igloo qui correspond à la comète */
				if (oIglooX == aListComete[i].x) {
					
					/* Principe de fonctionnement, à chaque fois qu'une comète touche un igloo :
						- Si igloo intact alors il devient half
						- Si igloo half alors il devient melted1
						- Si igloo melted1 alors GAME OVER
					*/
					if (aListIgloo[j].img.src.indexOf("intact.png") !== -1) {
					
						var oIglooImage = new Image();
						oIglooImage.src = "resources/igloos/half.png";	
						aListIgloo[j].img = oIglooImage;
						
						ctx.drawImage(aListIgloo[j].img, aListIgloo[j].x, aListIgloo[j].y, aListIgloo[j].width, aListIgloo[j].height);
					}
					else if (aListIgloo[j].img.src.indexOf("half.png") !== -1) {
					
						var oIglooImage = new Image();
						oIglooImage.src = "resources/igloos/melted1.png";	
						aListIgloo[j].img = oIglooImage;
						
						/* Repositionnement de la nouvelle image */
						aListIgloo[j].x = aListIgloo[j].x - 20;
						aListIgloo[j].y = aListIgloo[j].y + 38;
						
						
						ctx.drawImage(aListIgloo[j].img, aListIgloo[j].x, aListIgloo[j].y, aListIgloo[j].width, aListIgloo[j].height);
					}
					else {
						// TODO : Il n'y a plus de vies => GAME OVER
					}
				}
			}
			
			/* Suppression de la comète de l'array aListComete */
			aListComete.remove(i);
		}
		
		
	}
}

/**************************************************************************************************
***************************************************************************************************
Destruction des comètes à partir de la console
/**************************************************************************************************
**************************************************************************************************/
Game.prototype.calculComete = function() {

	for (var i=0; i<aListComete.length;i++) {
		
		if (aListComete[i].eq.solution == valLednum) {
		
			ctx.beginPath();
			ctx.strokeStyle='red';
			ctx.lineWidth=4;
			ctx.moveTo(oConsole.x,oConsole.y);
			ctx.lineTo(aListComete[i].x,aListComete[i].y);
			ctx.stroke(); 

			aListComete.remove(i);
		}
	}
}

