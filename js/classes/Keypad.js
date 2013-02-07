function Keypad(src, x, y, number) {
	this.img = new Image();
	this.img.src = src;
	this.x = x;
	this.y = y;
	this.number = number;
	this.width = this.img.width	 * ((fRatioLargeur+fRatioHauteur)/2);
	this.height = this.img.height * ((fRatioLargeur+fRatioHauteur)/2);
}

Keypad.prototype.draw = function(i) {

	this.x = this.x + this.width * i;
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Keypad.prototype.click = function(x, y) {

	if ((x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height)) {
		
		var oLednum = new Lednum("resources/status/lednums/lednums"+this.number+".png", this.number);
		aListLednums.push(oLednum);
		aListLednums.remove(0,0);
	}
}