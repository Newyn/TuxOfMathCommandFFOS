/**************************************************************************************************
Constructor the Comet class
**************************************************************************************************/
function Comet(img, x, y, wave) {
	this.img = img; // Image
	this.width = this.img.width	 * ((fRatioLargeur+fRatioHauteur)/2); // Image width
	this.height = this.img.height * ((fRatioLargeur+fRatioHauteur)/2); // Image height
	this.x = x; // X position
	this.y = y; // Y position
	this.eq = new Equation(0, 0); // Equation object
	this.eq2 = this.eq.generate(wave.operations ,wave.nbrArgs, wave.max); // Equation
}

/**************************************************************************************************
Sends down the comet
**************************************************************************************************/
Comet.prototype.down = function(speed) {
	this.y = this.y + 1.0 * speed;
}

/**************************************************************************************************
Sends right the comet
**************************************************************************************************/
Comet.prototype.right = function(speed) {
	this.x = this.x + 10.0 * speed;
}