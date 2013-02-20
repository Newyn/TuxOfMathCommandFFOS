function Comete(img, x, y, wave) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.radius = 30;
	this.startAngle = 0;
	this.endAngle = 2 * Math.PI;
	this.eq = new Equation(0, 0);
	this.eq2 = this.eq.generate(wave.operations ,wave.nbrArgs, wave.max);
	this.width = this.img.width	 * ((fRatioLargeur+fRatioHauteur)/2);
	this.height = this.img.height * ((fRatioLargeur+fRatioHauteur)/2);
}

Comete.prototype.descendre = function(speed) {
	this.y = this.y + 1.0 * GAME_SPEED;
}

Comete.prototype.goRight = function(speed) {
	this.x = this.x + 5.0 * GAME_SPEED;
}