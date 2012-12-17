function Comete(x, y, rgb) {
	this.x = x;
	this.y = y;
	this.radius = 30;
	this.rgb = rgb;
	this.startAngle = 0;
	this.endAngle = 2 * Math.PI;
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