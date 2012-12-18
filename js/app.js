/* Initialisation requestAnimationFrame */
var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

/* Création du canvas */
var canvas = document.createElement("canvas");
canvas.id = "game";
canvas.width = 900;
canvas.height = 600;

/* Création du contexte */
var ctx = canvas.getContext("2d");

/* Ajout du canvas au document HTML */
document.body.appendChild(canvas);

var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

/* Tableau pour stocker les comètes */
var aListComete = [];

/* Tableau pour stocker les igloos */
var aListIgloo = [];

/* Définition des colonnes où apparaissent les comètes */
var colonneX1 = 150;
var colonneX2 = 350;
var colonneX3 = 550;
var colonneX4 = 750;

/* Tableau pour stocker la position des colonnes */
var aListColonneX = [colonneX1, colonneX2, colonneX3, colonneX4];

var GAME_SPEED = 0.5;
var GAME_ENDLINE_HEIGHT = 500;

for (var i=0;i<4;i++) {

	var oIglooImage = new Image();
	oIglooImage.src = "resources/igloos/intact.png";
	//oIglooImage.onload = function () {
		var oIgloo = new Igloo(oIglooImage, aListColonneX[i] - 60, 500);
		aListIgloo.push(oIgloo);
	//}
}

	
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
		
	/* 3000 = 3 secondes */
	if (elapsedTime >= 3000) {
		
		/* Création d'une nouvelle comète et ajout au tableau */
		var oComete = new Comete(aListColonneX[Math.floor(Math.random() * 4)], 50, "rgb(255,255,255)");
		aListComete.push(oComete);
		
		ctx.beginPath();
		ctx.fillStyle = oComete._rgb;
		ctx.arc(oComete._x, oComete._y, oComete._radius, oComete._startAngle, oComete._endAngle);
		ctx.fill();
		
		elapsedTime = 0;
	}
	
	for(var i=0;i<aListComete.length;i++) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.arc(aListComete[i]._x, aListComete[i]._y++, aListComete[i]._radius, aListComete[i]._startAngle, aListComete[i]._endAngle);
		ctx.fill();
		
		if (aListComete[i]._y == GAME_ENDLINE_HEIGHT) {
			aListComete.remove(i);
		}
	}
	
	
}
/* Fonction main */
var main = function () {
	step();
	requestAnimationFrame(main);
}

main();
//main(Date.now());
