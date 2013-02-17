function Timer() {
	this.cSecondsElapsed = 0;
	this.secondsElapsed = 0;
	this.interval = null;
}

// Start
Timer.prototype.start = function() {
	this.interval = setInterval(function(){
							  oTimer.update();
						   },100);
};

// Pause
Timer.prototype.pause = function() {
	clearInterval(this.interval);
	this.interval = null;
};

// Reset
Timer.prototype.reset = function() {
	this.cSecondsElapsed = 0;
	this.secondsElapsed = 0;
};

// Update
Timer.prototype.update = function() {
	this.cSecondsElapsed++;
	
	if (this.cSecondsElapsed > 9) {
		this.cSecondsElapsed = 0;
		this.secondsElapsed++;
	}
	
	console.log(this.secondsElapsed+" "+this.cSecondsElapsed);
}