/**************************************************************************************************
Remove an element from an array
**************************************************************************************************/
Array.prototype.remove = function(from, to) {

	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	
	return this.push.apply(this, rest);
}

/**************************************************************************************************
Extract the right part of a string
**************************************************************************************************/
function subStringRight(str, n){
    if (n <= 0) {
		return "";
	}
    else if (n > String(str).length) {
		return str;
	}
    else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
    }
}

/**************************************************************************************************
Get position of an element with an array (X, Y)
**************************************************************************************************/
function getPosition(element) {

	var left = 0;
	var top = 0;
	
	// Get element
	var e = document.getElementById(element);
	
	while (e.offsetParent != undefined && e.offsetParent != null) {
		left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
		top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
		e = e.offsetParent;
	}
	
	return new Array(left,top);
}