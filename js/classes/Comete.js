function Comete(x, y, rgb) {
	this._x = x;
	this._y = y;
	this._radius = 30;
	this._rgb = rgb;
	this._startAngle = 0;
	this._endAngle = 2 * Math.PI;
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