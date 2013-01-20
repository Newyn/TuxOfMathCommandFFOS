/**************************************************************************************************
***************************************************************************************************
Initialisation requestAnimationFrame
***************************************************************************************************
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**************************************************************************************************
***************************************************************************************************
Initialisation du canvas
***************************************************************************************************
**************************************************************************************************/

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.id = "game";
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

document.body.appendChild(canvas);

/**************************************************************************************************
***************************************************************************************************
Variables globales
***************************************************************************************************
**************************************************************************************************/
var oMenu = new Menu();

var oGame = new Game();

// Vitesse du jeu
var GAME_SPEED = 0.5;

// Position X des colonnes
var COL_X1 = canvas.width / 10;
var COL_X2 = canvas.width / 3.26;
var COL_X3 = canvas.width / 1.94;
var COL_X4 = canvas.width / 1.38;

// Position Y des colonnes
var COL_Y = canvas.height / 1.25;

var GAME_ENDLINE_HEIGHT = canvas.height / 1.25 - 140;

// Tableau pour stocker la position des colonnes
var aListColonneX = [COL_X1, COL_X2, COL_X3, COL_X4];
// Tableau pour stocker les igloos
var aListIgloo = [];
// Tableau pour stocker les comètes 
var aListComete = [];

/* Gestion du timer d'apparition des comètes */
var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

/* Gestion du timer du mouvement des comètes */
var currentTimestamp2 = Date.now();
var previousTimestamp2 = 0;
var elapsedTime2 = 0;

for (var i=0;i<4;i++) {

	var oIglooImage = new Image();
	oIglooImage.src = "resources/igloos/intact.png";
	//oIglooImage.onload = function () {
		var oIgloo = new Igloo(oIglooImage, aListColonneX[i] - 15, COL_Y);
		aListIgloo.push(oIgloo);
	//}
}
/*var screenResize = function () {

	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	COL_X1 = canvas.width / 10;
	COL_X2 = canvas.width / 3.26;
	COL_X3 = canvas.width / 1.94;
	COL_X4 = canvas.width / 1.38;
	
	aListColonneX = [COL_X1, COL_X2, COL_X3, COL_X4];
	
	for (var i=0;i<aListIgloo.length;i++) {
		aListIgloo[i]._x = aListColonneX[i] - 15;
		ctx.drawImage(aListIgloo[i]._img, aListIgloo[i]._x, aListIgloo[i]._y);
	}
}*/
/* Fonction Step */
var step = function () {

	/* Réinitialisation de l'affichage */
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	/* Remplissage du canvas */
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	addIgloo();
	addComete();
}

/* Fonction addIgloo */
var addIgloo = function() {
	
	for(var i=0; i<aListIgloo.length; i++) {
		ctx.drawImage(aListIgloo[i]._img, aListIgloo[i]._x, aListIgloo[i]._y);
	}
}
/* Fonction addComete */
var addComete = function() {

	/* Mise à jour de l'intervalle d'apparition des comètes */
	previousTimestamp = currentTimestamp;
	currentTimestamp = Date.now();
	elapsedTime += currentTimestamp - previousTimestamp;
	
	/* 5000 = 5 secondes */
	if (elapsedTime >= 5000) {
		
		var oCometeImage = new Image();
		oCometeImage.src = "resources/comets/comet0.png";
		
		/* Création d'une nouvelle comète et ajout au tableau */
		var oComete = new Comete(oCometeImage, aListColonneX[Math.floor(Math.random() * 4)], 0);
		aListComete.push(oComete);
		
		ctx.drawImage(oComete._img, oComete._x, oComete._y);

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
			
				if (aListComete[j]._img.src.indexOf("comet0.png") !== -1) {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet1.png";
					aListComete[j]._img = oCometeImage;
				}
				else if (aListComete[j]._img.src.indexOf("comet1.png") !== -1) {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet2.png";
					aListComete[j]._img = oCometeImage;
				}
				else {
					var oCometeImage = new Image();
					oCometeImage.src = "resources/comets/comet0.png";
					aListComete[j]._img = oCometeImage;
				}
			}
			
			elapsedTime2 = 0;	
		}
		
		
		if (aListComete[i]._y < GAME_ENDLINE_HEIGHT) {
			aListComete[i].descendre(GAME_SPEED);
			ctx.drawImage(aListComete[i]._img, aListComete[i]._x, aListComete[i]._y);
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
				var oIglooX = aListIgloo[j]._x + 15;
				
				/* Dès qu'on a trouvé l'igloo qui correspond à la comète */
				if (oIglooX == aListComete[i]._x) {
					
					/* Principe de fonctionnement, à chaque fois qu'une comète touche un igloo :
						- Si igloo intact alors il devient half
						- Si igloo half alors il devient melted1
						- Si igloo melted1 alors GAME OVER
					*/
					if (aListIgloo[j]._img.src.indexOf("intact.png") !== -1) {
					
						var oIglooImage = new Image();
						oIglooImage.src = "resources/igloos/half.png";	
						aListIgloo[j]._img = oIglooImage;
						
						ctx.drawImage(aListIgloo[j]._img, aListIgloo[j]._x, aListIgloo[j]._y);
					}
					else if (aListIgloo[j]._img.src.indexOf("half.png") !== -1) {
					
						var oIglooImage = new Image();
						oIglooImage.src = "resources/igloos/melted1.png";	
						aListIgloo[j]._img = oIglooImage;
						
						/* Repositionnement de la nouvelle image */
						aListIgloo[j]._x = aListIgloo[j]._x - 20;
						aListIgloo[j]._y = aListIgloo[j]._y + 38;
						
						
						ctx.drawImage(aListIgloo[j]._img, aListIgloo[j]._x, aListIgloo[j]._y);
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

var startMenu = function () {
	
	canvas.addEventListener('mousedown', mouseClickMenu, false);
	window.addEventListener('resize', resizeCanvas, false);
	
	// Si on est pas dans une partie
	if(oMenu != null) {
	
		now = Date.now();
		delta = now - then;

		// on lance le menu
		oMenu.start();

		requestAnimationFrame(startMenu);
	} else {
	
		startGame();
	}
};

var startGame = function () {

	step();
	requestAnimationFrame(startGame);
}

/* Fonction main */
/*var main = function () {
	step();
	requestAnimationFrame(main);
}*/

//main();
//main(Date.now());
var then = Date.now();
var now = then;
var delta = 0;
startMenu();
