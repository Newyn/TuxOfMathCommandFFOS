/**************************************************************************************************
Initialization of JavaScript Performance Monitor

FPS Frames rendered in the last second. The higher the number the better.
MS Milliseconds needed to render a frame. The lower the number the better.
**************************************************************************************************/

var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

/**************************************************************************************************
Setup requestAnimationFrame
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
/**************************************************************************************************
Initialization of canvas
**************************************************************************************************/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set the size of the canvas relative to the width and height of the window of the client
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

/**************************************************************************************************
Global variables
**************************************************************************************************/

// Largeur de base du canvas
var fLargeurDeBase = 1360;
// Hauteur de base du canvas
var fHauteurDeBase = 620;

var fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;

var oGame = new Game();
	
// Vitesse du jeu
var GAME_SPEED = 0.2 * ((fRatioLargeur+fRatioHauteur)/2);

// Position X des colonnes
var aListColonneX = [];

var GAME_ENDLINE_HEIGHT = (canvas.height / 1.25 - (140 * ((fRatioLargeur+fRatioHauteur)/2)) * ((fRatioLargeur+fRatioHauteur)/2));

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
Initialization of the menu
**************************************************************************************************/

// Music
var music = new Audio("resources/sounds/tuxi.ogg");
music.loop = true;
music.volume = 0.5;
music.load();
music.play();

// Get menu item
var itemPlay = document.getElementById("play");
var itemHelp = document.getElementById("help");
var itemOptions = document.getElementById("options");
var itemExit = document.getElementById("exit");

// Set up event listener for menu item
itemPlay.addEventListener("click", launchGame, false);
itemHelp.addEventListener("click", launchHelp, false);
itemOptions.addEventListener("click", launchOptions, false);
itemExit.addEventListener("click", launchExit, false);

/**************************************************************************************************
Initialization of the game
**************************************************************************************************/
// Get buttons
var pauseButton = document.getElementById("pauseButton");
var exitButton = document.getElementById("exitButton");
var resumeButton = document.getElementById("resumeButton");
var leaveButton = document.getElementById("leaveButton");

// Get keypad item
var keypad0 = document.getElementById("keypad0");
var keypad1 = document.getElementById("keypad1");
var keypad2 = document.getElementById("keypad2");
var keypad3 = document.getElementById("keypad3");
var keypad4 = document.getElementById("keypad4");
var keypad5 = document.getElementById("keypad5");
var keypad6 = document.getElementById("keypad6");
var keypad7 = document.getElementById("keypad7");
var keypad8 = document.getElementById("keypad8");
var keypad9 = document.getElementById("keypad9");
var keypadneg = document.getElementById("keypad-");
var keypadenter = document.getElementById("keypad+");

// Set up event listener for buttons
pauseButton.addEventListener("click", handleClickPause, false);
exitButton.addEventListener("click", handleClickExit, false);
resumeButton.addEventListener("click", handleClickResume, false);
leaveButton.addEventListener("click", handleClickExit, false);

// Set up event listener for keypad item
keypad0.addEventListener("click", handleClickKeypad, false);
keypad1.addEventListener("click", handleClickKeypad, false);
keypad2.addEventListener("click", handleClickKeypad, false);
keypad3.addEventListener("click", handleClickKeypad, false);
keypad4.addEventListener("click", handleClickKeypad, false);
keypad5.addEventListener("click", handleClickKeypad, false);
keypad6.addEventListener("click", handleClickKeypad, false);
keypad7.addEventListener("click", handleClickKeypad, false);
keypad8.addEventListener("click", handleClickKeypad, false);
keypad9.addEventListener("click", handleClickKeypad, false);
keypadneg.addEventListener("click", handleClickKeypad, false);
keypadenter.addEventListener("click", handleClickKeypad, false);

// Get lednums item
var lednum0 = document.getElementById("lednum2");
var lednum1 = document.getElementById("lednum1");
var lednum2 = document.getElementById("lednum0");
var lednumneg = document.getElementById("lednumneg");
var lednumActive = lednum0;
var negativeSign = false;

window.addEventListener("keydown", handleKeyDown, false);

/**************************************************************************************************
Initialisation des images utilisées dans le jeu
**************************************************************************************************/

// Igloos
var imgIglooIntact = new Image();
imgIglooIntact.src = "resources/igloos/intact.png";
var imgIglooHalf = new Image();
imgIglooHalf.src = "resources/igloos/half.png";
var imgIglooMelted = new Image();
imgIglooMelted.src = "resources/igloos/melted1.png";

// Comètes
var imgCometeZero = new Image();
imgCometeZero.src = "resources/comets/comet0.png";
var imgCometeOne = new Image();
imgCometeOne.src = "resources/comets/comet1.png";
var imgCometeTwo = new Image();
imgCometeTwo.src = "resources/comets/comet2.png";


/**************************************************************************************************
Step
**************************************************************************************************/

var step = function () {
	
	if ((oGame.pause == false) && (oGame.active == true)) {
		// Resetting the display
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		oGame.drawComete();
		//requestAnimationFrame(step);
	}
}
