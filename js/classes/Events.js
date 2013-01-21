var resizeCanvas = function() {

	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	resizeMenu();
}

var resizeMenu = function() {

	
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

/*var screenResize = function () {

	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	COL_X1 = canvas.width / 10;
	COL_X2 = canvas.width / 3.26;
	COL_X3 = canvas.width / 1.94;
	COL_X4 = canvas.width / 1.38;
	
	aListColonneX = [COL_X1, COL_X2, COL_X3, COL_X4];
	
	for (var i=0;i<aListIgloo.length;i++) {
		aListIgloo[i]._x = aListColonneX[i] - 15;
		ctx.drawImage(aListIgloo[i]._img, aListIgloo[i]._x, aListIgloo[i]._y);
	}
}*/