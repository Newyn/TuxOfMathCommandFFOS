/**************************************************************************************************
Initialisation du canvas
**************************************************************************************************/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
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
Initialisation de l'objet requestAnimationFrame
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


/**************************************************************************************************
Initialisation du JavaScript Performance Monitor

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
Initialisation du menu
**************************************************************************************************/

var music = new Audio("resources/sounds/tuxi.ogg");
music.loop = true;
music.volume = 0.5;
music.load();
music.play();
	
var itemPlay = document.getElementById("play");
var itemHelp = document.getElementById("help");
var itemOptions = document.getElementById("options");
var itemExit = document.getElementById("exit");

itemPlay.addEventListener("click", function() {
document.getElementById("topLeftLogo").style.display = "none";
document.getElementById("bottomLeftLogo").style.display = "none";
document.getElementById("menu").style.display = "none";
document.getElementById("background").style.backgroundImage = 'url("resources/backgrounds/1.jpg")';
document.getElementById("background").style.backgroundSize = '100% 100%';

oGame.start();
	
setInterval( function () {

    stats.begin();
	
		step();
		
	stats.end();

}, 1000 / 60 );
	
	
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
	
	canvas.addEventListener('mousedown', mouseClickKeypad, false);
	window.addEventListener('keypress', handleKeyPressGame, true);
	
	// Réinitialisation de l'affichage 
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Fond du canvas
	//ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);

	aListKeypad = [];

	//oGame.drawConsole();
	oGame.drawIgloo();
	//oGame.drawComete();
	requestAnimationFrame(step);
}

//var then = Date.now();
//var now = then;
//var delta = 0;