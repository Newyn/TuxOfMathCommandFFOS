function Console() {
	this.img = new Image();
	this.img.src = "resources/tux/console_led.png";
	this.x = canvas.width / 2.34;
	this.y = canvas.height / 1.35;
}

Console.prototype.draw = function () {
	ctx.drawImage(this.img, this.x, this.y);
	this.drawKeypad();
	
	if (aListLednums.length < 3) {
		this.drawLednum();
	}
}

Console.prototype.drawKeypad = function() {
	
	for (var i=0; i<10; i++) {
		
		var oKeypad = new Keypad("resources/status/keypad/keypads"+i+".png", canvas.width / 2.90, canvas.height / 1.08, i);
		oKeypad.draw(i);
		aListKeypad.push(oKeypad);
	}
	
	if (aListLednums.length >= 3) {
	
		for (var i=aListLednums.length - 3; i<aListLednums.length; i++) {
			ctx.drawImage(aListLednums[i].img, aListLednums[i].x, aListLednums[i].y);
		}
	}
}

Console.prototype.drawLednum = function() {
	var oFirstLednum = new Lednum("resources/status/lednums/lednums0.png", oConsole.x + oConsole.img.width / 1.75, oConsole.y + oConsole.img.height / 17, 1);
	aListLednums.push(oFirstLednum);
	
	var oSecondLednum = new Lednum("resources/status/lednums/lednums0.png", oConsole.x + oConsole.img.width / 2.4, oConsole.y + oConsole.img.height / 17, 2);
	aListLednums.push(oSecondLednum);
	
	var oThirdLednum = new Lednum("resources/status/lednums/lednums0.png", oConsole.x + oConsole.img.width / 3.8, oConsole.y + oConsole.img.height / 17, 3);
	aListLednums.push(oThirdLednum);
}


