/**************************************************************************************************
***************************************************************************************************
Constructeur Menu
/**************************************************************************************************
**************************************************************************************************/
function Menu() {
	
	this.music = new Audio("resources/sounds/tuxi.ogg");
	this.music.loop = true;
    this.music.volume = 0.5;
	this.music.load();
	this.music.play();
}

/**************************************************************************************************
***************************************************************************************************
Evenèment onClick sur le menu
/**************************************************************************************************
***************************************************************************************************/
Menu.prototype.click = function(x, y) {
	
	if ((x > this.firstMenuItem.x) && (x < this.firstMenuItem.x + this.firstMenuItem.width) && (y > this.firstMenuItem.y) && (y < this.firstMenuItem.y + this.firstMenuItem.height)) {
		this.music.pause();
		oGame.start();
	}
	else if ((x > this.secondMenuItem.x) && (x < this.secondMenuItem.x + this.secondMenuItem.width) && (y > this.secondMenuItem.y) && (y < this.secondMenuItem.y + this.secondMenuItem.height)) {
		alert("Play With Friends");
	}
	else if ((x > this.thirdMenuItem.x) && (x < this.thirdMenuItem.x + this.thirdMenuItem.width) && (y > this.thirdMenuItem.y) && (y < this.thirdMenuItem.y + this.thirdMenuItem.height)) {
		alert("Aide");
	}
	else if ((x > this.fourthMenuItem.x) && (x < this.fourthMenuItem.x + this.fourthMenuItem.width) && (y > this.fourthMenuItem.y) && (y < this.fourthMenuItem.y + this.fourthMenuItem.height)) {
		alert("Plus d'options");
	}
	else if ((x > this.fifthMenuItem.x) && (x < this.fifthMenuItem.x + this.fifthMenuItem.width) && (y > this.fifthMenuItem.y) && (y < this.fifthMenuItem.y + this.fifthMenuItem.height)) {
		alert("Quitter");
	}
}