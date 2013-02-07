function Console() {
	this.img = new Image();
	this.img.src = "resources/tux/console_led.png";
	this.x = canvas.width / 2.34;
	this.y = canvas.height / 1.35;
	this.width = this.img.width	 * ((fRatioLargeur+fRatioHauteur)/2);
	this.height = this.img.height * ((fRatioLargeur+fRatioHauteur)/2);
}

Console.prototype.draw = function () {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	this.drawKeypad();
	
	if (aListLednums.length < 3) {
		this.initLednum();
	}
}

Console.prototype.initLednum = function() {
	var oFirstLednum = new Lednum("resources/status/lednums/lednums0.png", 0);
	aListLednums.push(oFirstLednum);
	
	var oSecondLednum = new Lednum("resources/status/lednums/lednums0.png", 0);
	aListLednums.push(oSecondLednum);
	
	var oThirdLednum = new Lednum("resources/status/lednums/lednums0.png", 0);
	aListLednums.push(oThirdLednum);
}

Console.prototype.drawLednum = function () {
	ctx.drawImage(aListLednums[0].img, oConsole.x + oConsole.width / 3.8, oConsole.y + oConsole.height / 17, aListLednums[0].width, aListLednums[0].height);
	ctx.drawImage(aListLednums[1].img, oConsole.x + oConsole.width / 2.4, oConsole.y + oConsole.height / 17, aListLednums[1].width, aListLednums[1].height);
	ctx.drawImage(aListLednums[2].img, oConsole.x + oConsole.width / 1.75, oConsole.y + oConsole.height / 17, aListLednums[2].width, aListLednums[2].height);
	
}

Console.prototype.setValLednum = function () {
	valLednum = "";
	valLednum = aListLednums[0].val+""+aListLednums[1].val+""+aListLednums[2].val;
}

Console.prototype.drawKeypad = function() {
	
	for (var i=0; i<10; i++) {
		
		var oKeypad = new Keypad("resources/status/keypad/keypads"+i+".png", canvas.width / 2.90, canvas.height / 1.08, i);
		oKeypad.draw(i);
		aListKeypad.push(oKeypad);
	}
	
	if (aListLednums.length >= 3) {
		this.drawLednum();
	}
}



Console.prototype.resetLednum = function() {

	this.initLednum();
	
	aListLednums.remove(0,2);
	
	this.drawLednum();
}

