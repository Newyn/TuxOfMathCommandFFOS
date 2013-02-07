var resizeMenu = function() {

	/*console.log("RESIZE");
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	var fNewRatioLargeur = canvas.width / fLargeurDeBase;
	var fNewRatioHauteur = canvas.height / fHauteurDeBase;
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
	
	if(fNewRatioLargeur < fNewRatioHauteur) {		
		fNewRatioHauteur = fNewRatioLargeur;
	}
	else {
		fNewRatioLargeur = fNewRatioHauteur;
	}
	
	for (var i=0; i<aListMenuItem.length; i++) {
		console.log("a");
		aListMenuItem[i].x = aListMenuItem[i].x * (canvas.width / fLargeurDeBase);
		aListMenuItem[i].y = aListMenuItem[i].y * (canvas.height / fHauteurDeBase);
		//aListMenuItem[i].img.width = aListMenuItem[i].img.width	 * ((fRatioLargeur+fRatioHauteur)/2);
		aListMenuItem[i].img.width = (aListMenuItem[i].img.width / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		//aListMenuItem[i].img.height = aListMenuItem[i].img.height	 * ((fRatioLargeur+fRatioHauteur)/2);
		aListMenuItem[i].img.height = (aListMenuItem[i].img.height / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	}
	
	//alert("stop");*/
}


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

var mouseClickMenu = function(e) {

	if(e.offsetX || e.offsetY) {
        x = e.offsetX;
		y = e.offsetY;
    }
    else if(e.layerX || e.layerY){
        x = e.layerX;
		y = e.layerY;
    } 
	
	oMenu.click(x, y);
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