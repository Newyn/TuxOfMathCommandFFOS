/**************************************************************************************************
***************************************************************************************************
Constructeur Menu
/**************************************************************************************************
**************************************************************************************************/
function Menu() {

	// Fond
	this.backgroundImage = new Image();
	this.backgroundImage.src = "resources/title/menu_bkg.jpg";
	
	// Title
	this.titleImage = new Image();
	this.titleImage.src = "resources/title/title1.png";
	
	// BigTux
	this.bigTuxImage = new Image();
	this.bigTuxImage.src = "resources/tux/bigtux0.png";
	
	this.firstMenuItem = new MenuItem("resources/menu/play-alone.png", canvas.width / 2.3, canvas.height / 3, canvas.width / 5, canvas.height / 15);
	this.secondMenuItem = new MenuItem("resources/menu/play-with-friends.png", canvas.width / 2.3, canvas.height / 2.4, canvas.width / 5, canvas.height / 15);
	this.thirdMenuItem = new MenuItem("resources/menu/aide.png", canvas.width / 2.3, canvas.height / 2.0, canvas.width / 5, canvas.height / 15);
	this.fourthMenuItem = new MenuItem("resources/menu/plus-options.png", canvas.width / 2.3, canvas.height / 1.71, canvas.width / 5, canvas.height / 15);
	this.fifthMenuItem = new MenuItem("resources/menu/quitter.png", canvas.width / 2.3, canvas.height / 1.49, canvas.width / 5, canvas.height / 15);

	aListMenuItem.push(this.firstMenuItem);
	aListMenuItem.push(this.secondMenuItem);
	aListMenuItem.push(this.thirdMenuItem);
	aListMenuItem.push(this.fourthMenuItem);
	aListMenuItem.push(this.fifthMenuItem);
	
	this.music = new Audio("resources/sounds/tuxi.ogg");
	this.music.loop = true;
    this.music.volume = 0.5;
	this.music.load();
	this.music.play();
}

/**************************************************************************************************
***************************************************************************************************
Lancement du menu
/**************************************************************************************************
**************************************************************************************************/
Menu.prototype.start = function() {

	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.shadowColor = "rgb(0, 0, 0)";
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 10;
	ctx.shadowBlur = 10;
	
	// Fond
	ctx.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height, 0, 0, canvas.width, canvas.height);

	
	// Title
	ctx.drawImage(this.titleImage, 0, 0, this.titleImage.width, this.titleImage.height, canvas.width / 40 , canvas.height / 40, canvas.width / 7, canvas.height / 6);
	
	// BigTux
	ctx.drawImage(this.bigTuxImage, 0, 0, this.bigTuxImage.width, this.bigTuxImage.height, canvas.width / 40, canvas.height / 1.5, canvas.width / 7, canvas.height / 3);
	
	ctx.drawImage(this.firstMenuItem.img, 0, 0, this.firstMenuItem.img.width, this.firstMenuItem.img.height, this.firstMenuItem.x, this.firstMenuItem.y, this.firstMenuItem.width, this.firstMenuItem.height);
	ctx.drawImage(this.secondMenuItem.img, 0, 0, this.secondMenuItem.img.width, this.secondMenuItem.img.height, this.secondMenuItem.x, this.secondMenuItem.y, this.secondMenuItem.width, this.secondMenuItem.height);
	ctx.drawImage(this.thirdMenuItem.img, 0, 0, this.thirdMenuItem.img.width, this.thirdMenuItem.img.height, this.thirdMenuItem.x, this.thirdMenuItem.y, this.thirdMenuItem.width, this.thirdMenuItem.height);
	ctx.drawImage(this.fourthMenuItem.img, 0, 0, this.fourthMenuItem.img.width, this.fourthMenuItem.img.height, this.fourthMenuItem.x, this.fourthMenuItem.y, this.fourthMenuItem.width, this.fourthMenuItem.height);
	ctx.drawImage(this.fifthMenuItem.img, 0, 0, this.fifthMenuItem.img.width, this.fifthMenuItem.img.height, this.fifthMenuItem.x, this.fifthMenuItem.y, this.fifthMenuItem.width, this.fifthMenuItem.height);
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