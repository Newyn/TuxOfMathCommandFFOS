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

// Gestion du timer d'apparition des comètes 
var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

// Gestion du timer du mouvement des comètes
var currentTimestamp2 = Date.now();
var previousTimestamp2 = 0;
var elapsedTime2 = 0;

/**************************************************************************************************
***************************************************************************************************
Step
/**************************************************************************************************
**************************************************************************************************/

var step = function () {

	// Réinitialisation de l'affichage 
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Remplissage du canvas 
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	oGame.drawIgloo();
	oGame.drawComete();
}

/**************************************************************************************************
***************************************************************************************************
Main de l'écran du menu
***************************************************************************************************
**************************************************************************************************/

var mainMenu = function () {
	
	canvas.addEventListener('mousedown', mouseClickMenu, false);
	window.addEventListener('resize', resizeCanvas, false);
	
	// Si la partie n'est pas commencée
	if(oMenu != null) {

		// Lancement du menu
		oMenu.start();
		requestAnimationFrame(mainMenu);
		
	} else {
	
		// Lancement de la partie
		mainGame();
	}
};

/**************************************************************************************************
***************************************************************************************************
Main de la partie
***************************************************************************************************
**************************************************************************************************/

var mainGame = function () {

	step();
	requestAnimationFrame(mainGame);
}

//var then = Date.now();
//var now = then;
//var delta = 0;
mainMenu();
