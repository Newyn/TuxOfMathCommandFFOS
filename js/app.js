/* Initialisation requestAnimationFrame */
var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

/* Création du canvas */
var canvas = document.createElement("canvas");
canvas.id = "game";
canvas.width = 1000;
canvas.height = 600;

/* Création du contexte */
var ctx = canvas.getContext("2d");
//ctx.fillRect(0, 0, canvas.width, canvas.height);
//ctx.fillStyle = "rgb(0,0,0)";

/* Ajout du canvas au document HTML */
document.body.appendChild(canvas);

var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

var arrayComete = [];

/* Fonction Step */
var step = function () {
	addComete();
}

/* Fonction addComete */
var addComete = function() {

	/* Réinitialisation de l'affichage */
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	/* Remplissage du canvas */
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
		
	/* Mise à jour de l'intervalle d'apparition des comètes */
	previousTimestamp = currentTimestamp;
	currentTimestamp = Date.now();
	elapsedTime += currentTimestamp - previousTimestamp;
		
	/* 3000 = 3 secondes */
	if (elapsedTime >= 3000) {
		
		/* Création d'une nouvelle comète et ajout au tableau */
		var oComete = new Comete(Math.random() * 1000, 50, "rgb(20,20,20)");
		arrayComete.push(oComete);
		
		ctx.beginPath();
		ctx.fillStyle = oComete.rgb;
		ctx.arc(oComete.x, oComete.y, oComete.radius, oComete.startAngle, oComete.endAngle);
		ctx.fill();
		
		elapsedTime = 0;
	}
	
	for(var i=0;i<arrayComete.length;i++) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.arc(arrayComete[i].x, arrayComete[i].y++, arrayComete[i].radius, arrayComete[i].startAngle, arrayComete[i].endAngle);
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
