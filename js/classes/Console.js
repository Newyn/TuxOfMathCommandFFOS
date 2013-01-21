function Console() {
	this.img = new Image();
	this.img.src = "resources/tux/console_led.png";
	this.x = canvas.width / 2.34;
	this.y = canvas.height / 1.35;
}

Console.prototype.draw = function () {
	ctx.drawImage(this.img, this.x, this.y);
	this.drawKeypad();
}

Console.prototype.drawKeypad = function() {
	
	for (var i=0; i<10; i++) {
		
		var oKeypad = new Keypad("resources/status/keypad/keypads"+i+".png", canvas.width / 2.90, canvas.height / 1.08, i);
		oKeypad.draw(i);
		aListKeypad.push(oKeypad);
	}
}


