function Keypad(src, x, y, msg) {
	this.img = new Image();
	this.img.src = src;
	this.x = x;
	this.y = y;
	this.msg = msg;
}

Keypad.prototype.draw = function(i) {

	this.x = this.x + this.img.width * i;
	ctx.drawImage(this.img, this.x, this.y);
}

Keypad.prototype.click = function(x, y) {

	//alert("X ="+x+"- THIS.X="+this.x);
	if ((x > this.x) && (x < this.x + this.img.width) && (y > this.y) && (y < this.y + this.img.height)) {
		alert(this.msg);
	}
}