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

var aListMenuItem = [];

var oGame = new Game();
var oConsole = new Console();

var background = new Image();
background.src = "resources/backgrounds/1.jpg";
	
// Vitesse du jeu
var GAME_SPEED = 0.7 * ((fRatioLargeur+fRatioHauteur)/2);

// Position X des colonnes
var aListColonneX = [];

// Position Y des colonnes
var COL_Y = canvas.height / 1.25;

var GAME_ENDLINE_HEIGHT = (canvas.height / 1.25 - (140 * ((fRatioLargeur+fRatioHauteur)/2)) * ((fRatioLargeur+fRatioHauteur)/2));

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

// Launch of the game
itemPlay.addEventListener("click", function() {

	// Hide menu
	document.getElementById("topLeftLogo").style.display = "none";
	document.getElementById("bottomLeftLogo").style.display = "none";
	document.getElementById("menu").style.display = "none";
	
	// Setup the game
	document.getElementById("background").style.backgroundImage = 'url("resources/backgrounds/1.jpg")';
	document.getElementById("background").style.backgroundSize = '100% 100%';
	document.getElementById("keypad").style.display = "block";
	document.getElementById("igloo").style.display = "block";

	// X position of the columns where comets fall
	aListColonneX[0] = document.getElementById("igloo0").x;
	aListColonneX[1] = document.getElementById("igloo1").x;
	aListColonneX[2] = document.getElementById("igloo2").x;
	aListColonneX[3] = document.getElementById("igloo3").x;

	setInterval( function () {

		stats.begin();
		
			// Step
			step();
			
		stats.end();

	}, 1000 / 60 );	
});

// Launch of the help
itemHelp.addEventListener("click", function() {
    alert("Help");
});

// Launch of the options
itemOptions.addEventListener("click", function() {
	alert("Options");
});

// Exit the game
itemExit.addEventListener("click", function() {
    alert("Exit");
});

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
	
	//canvas.addEventListener('mousedown', mouseClickKeypad, false);
	//window.addEventListener('keypress', handleKeyPressGame, true);
	
	// Resetting the display
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	aListKeypad = [];

	oGame.drawComete();
	//requestAnimationFrame(step);
}
