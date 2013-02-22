/**************************************************************************************************
Constructor the Timer class
**************************************************************************************************/
function Timer() {
	this.cSecondsElapsed = 0; // Tenths of seconds elapsed since the timer starts
	this.secondsElapsed = 0; // Seconds elapsed since the timer starts
	this.interval = null; // Interval
}

/**************************************************************************************************
Starts the timer
**************************************************************************************************/
Timer.prototype.start = function() {
	this.interval = setInterval(function(){
							  oTimer.update();
							  oTimerBonusYellowComets.update();
							  oTimerBonusRedComets.update();
						   },100);
}

/**************************************************************************************************
Pauses the timer
**************************************************************************************************/
Timer.prototype.pause = function() {

	// Stop the execution of the interval
	clearInterval(this.interval);
	this.interval = null;
}

/**************************************************************************************************
Resets the timer
**************************************************************************************************/
Timer.prototype.reset = function() {
	this.cSecondsElapsed = 0;
	this.secondsElapsed = 0;
}

/**************************************************************************************************
Updates the timer
**************************************************************************************************/
Timer.prototype.update = function() {

	this.cSecondsElapsed++;
	
	//console.log(this.secondsElapsed+"-"+this.cSecondsElapsed);
	if (this.cSecondsElapsed > 9) {
		this.cSecondsElapsed = 0;
		this.secondsElapsed++;
	}
}