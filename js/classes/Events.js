var resizeCanvas = function() {

	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	resizeMenu();
}

var resizeMenu = function() {

	
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