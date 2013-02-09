var mouseClickKeypad = function(e) {

	if(e.offsetX || e.offsetY) {
        x = e.offsetX;
		y = e.offsetY;
    }
    else if(e.layerX || e.layerY){
        x = e.layerX;
		y = e.layerY;
    } 
	
	for (var i=0; i<aListKeypad.length; i++) {
		aListKeypad[i].click(x, y);
	}
}

var handleKeyPressGame = function(e) {

	// Firefox => charCode
	// IE => keyCode
	e = e.charCode || e.keyCode;
	
	// Touche "Entrée"
	if (e == 13) {
		oConsole.setValLednum();
		oGame.calculComete();
		oConsole.resetLednum();
	}
}