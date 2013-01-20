function Comete(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.radius = 30;
	this.startAngle = 0;
	this.endAngle = 2 * Math.PI;
}

Comete.prototype.descendre = function(speed) {
	this.y = this.y + 1 * GAME_SPEED;
}
/*Object.defineProperty(MathCommand.prototype, "x",
	{
		get: function() {
			return this._x;
		},
		set: function(value) {
			return this._x = value;
		}
	}


var mc = new MathCommand(...);
mc.x = 50;
console.log(mc.x)*/