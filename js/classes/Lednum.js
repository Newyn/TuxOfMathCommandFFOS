function Lednum(src, val) {
	this.img = new Image();
	this.img.src = src;
	this.val = val;
	this.width = this.img.width	 * ((fRatioLargeur+fRatioHauteur)/2);
	this.height = this.img.height * ((fRatioLargeur+fRatioHauteur)/2);
}