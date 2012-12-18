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
/* Position des colonnes où apparaissent les comètes */
var aListColonneX = [150, 350, 550, 750];

/* Tableau pour stocker les igloos */
var aListIgloo = [];

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
	if (elapsedTime >= 2000) {
		
		/* Création d'une nouvelle comète et ajout au tableau */
		var oComete = new Comete(aListColonneX[Math.floor(Math.random() * 4)], 50, "rgb(255,255,255)");
		aListComete.push(oComete);
		
		ctx.beginPath();
		ctx.fillStyle = oComete.rgb;
		ctx.arc(oComete.x, oComete.y, oComete.radius, oComete.startAngle, oComete.endAngle);
		ctx.fill();
		
		elapsedTime = 0;
	}
	
	for(var i=0;i<aListComete.length;i++) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.arc(aListComete[i].x, aListComete[i].y++*0.5, aListComete[i].radius, aListComete[i].startAngle, aListComete[i].endAngle);
		ctx.fill();
	}
	
	
}
/* Fonction main */
var main = function () {
	step();
	requestAnimationFrame(main);
}

main();
//main(Date.now());
