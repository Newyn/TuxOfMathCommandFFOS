function Keypad(src, x, y, number) {
	this.img = new Image();
	this.img.src = src;
	this.x = x;
	this.y = y;
	this.number = number;
}

Keypad.prototype.draw = function(i) {

	this.x = this.x + this.img.width * i;
	ctx.drawImage(this.img, this.x, this.y);
}

Keypad.prototype.click = function(x, y) {

	if ((x > this.x) && (x < this.x + this.img.width) && (y > this.y) && (y < this.y + this.img.height)) {
		
		if (LEDNUM_POSITION == 1) {
			var tmpWidth = oConsole.x + oConsole.img.width / 1.75;
			
			LEDNUM_POSITION = 2;
		}
		else if (LEDNUM_POSITION == 2) {
			var tmpWidth =  oConsole.x + oConsole.img.width / 2.4;
			LEDNUM_POSITION = 3;
		}
		else if (LEDNUM_POSITION == 3) {
			var tmpWidth = oConsole.x + oConsole.img.width / 3.8;
			LEDNUM_POSITION = 1;
		}
		var oLednum = new Lednum("resources/status/lednums/lednums"+this.number+".png", tmpWidth, oConsole.y + oConsole.img.height / 17, LEDNUM_POSITION);
		aListLednums.push(oLednum);
	}
}