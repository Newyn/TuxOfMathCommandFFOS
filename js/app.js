/**************************************************************************************************
Initialisation de l'objet requestAnimationFrame
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**************************************************************************************************
Initialisation du canvas
**************************************************************************************************/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var itemPlay = document.getElementById("play");
var itemHelp = document.getElementById("help");
var itemOptions = document.getElementById("options");
var itemExit = document.getElementById("exit");

itemPlay.addEventListener("click", function() {
    alert("Play");
});
itemHelp.addEventListener("click", function() {
    alert("Help");
});
itemOptions.addEventListener("click", function() {
	alert("Options");
});
itemExit.addEventListener("click", function() {
    alert("Exit");
});

//canvas.id = "game";
//canvas.width = document.documentElement.clientWidth;
//canvas.height = document.documentElement.clientHeight;

//document.body.appendChild(canvas);

/**************************************************************************************************
Variables globales
**************************************************************************************************/

// Largeur de base du canvas
var fLargeurDeBase = 1360;
// Hauteur de base du canvas
var fHauteurDeBase = 620;

var fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;

var aListMenuItem = [];

var oMenu = new Menu();
var oGame = new Game();
var oConsole = new Console();

var background = new Image();
background.src = "resources/backgrounds/1.jpg";
	
// Vitesse du jeu
var GAME_SPEED = 0.7 * ((fRatioLargeur+fRatioHauteur)/2);

// Position X des colonnes
var COL_X1 = canvas.width / 10;
var COL_X2 = canvas.width / 3.6;
var COL_X3 = canvas.width / 1.53;
var COL_X4 = canvas.width / 1.2;

// Position Y des colonnes
var COL_Y = canvas.height / 1.25;

var GAME_ENDLINE_HEIGHT = (canvas.height / 1.25 - (140 * ((fRatioLargeur+fRatioHauteur)/2)) * ((fRatioLargeur+fRatioHauteur)/2));

// Tableau pour stocker la position des colonnes
var aListColonneX = [COL_X1, COL_X2, COL_X3, COL_X4];
// Tableau pour stocker les igloos
var aListIgloo = [];
// Tableau pour stocker les comètes 
var aListComete = [];

var aListKeypad = [];
var aListLednums = [];

//  VALEUR DES LEDNUMS
var valLednum = "";

// Gestion du timer d'apparition des comètes 
var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

// Gestion du timer du mouvement des comètes
var currentTimestamp2 = Date.now();
var previousTimestamp2 = 0;
var elapsedTime2 = 0;

/**************************************************************************************************
Step
**************************************************************************************************/

var step = function () {

	// Réinitialisation de l'affichage 
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Fond du canvas
	ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);

	aListKeypad = [];

	oGame.drawConsole();
	oGame.drawIgloo();
	oGame.drawComete();
}

/**************************************************************************************************
Main de l'écran du menu
**************************************************************************************************/

var mainMenu = function () {

	canvas.addEventListener('mousedown', mouseClickMenu, false);
	window.addEventListener('resize', resizeMenu, false);
	
	// Si la partie n'est pas commencée
	if(oMenu != null) {

		// Lancement du menu
		requestAnimationFrame(mainMenu);
		
	} else {
	
		// Lancement de la partie
		canvas.removeEventListener('mousedown', mouseClickMenu, false);
		mainGame();
	}
};

/**************************************************************************************************
Main de la partie
**************************************************************************************************/

var mainGame = function () {

	canvas.addEventListener('mousedown', mouseClickKeypad, false);
	window.addEventListener('keypress', handleKeyPressGame, true);
	
	step();
	requestAnimationFrame(mainGame);
}

//var then = Date.now();
//var now = then;
//var delta = 0;


mainMenu();