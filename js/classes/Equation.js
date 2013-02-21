/**************************************************************************************************
Constructor of the Equation class
**************************************************************************************************/
function Equation(x, y) {
    this._x = x || 0;
    this._y = y || 0;
    this.args = [];
    this.ops = [];
    this.exp = "";
    this.solution = "";
};

/**************************************************************************************************
Generates an equation according to :
    - operators allowed "waveOps", 
	- number of arguments "nbrArgs",
	- maximum value that can reach the numbers "max",
**************************************************************************************************/
Equation.prototype.generate = function (waveOps, nbrArgs, max)  {

    for (var i = 0 ;i < nbrArgs; i++) {

		// Random selection of arguments and operations
		var random = Math.floor((Math.random()*max)+1);

		// Specific case of a division
		// If the previous operation is a division we modify the previous argument
		if (this.ops[i-1] && this.ops[i-1] == '/') {
			this.args[i-1] = Math.floor((Math.random()*max)+1)*random;
		}

		this.args.push(random);

		// Add an operation 
		if (i < nbrArgs-1) {
		
			var op = waveOps[Math.floor((Math.random()*waveOps.length)+1)-1];
			
			// If the previous operation is a division, it is avoided
			if (this.ops[i-1] && this.ops[i-1] == '/') {
				op = waveOps[Math.floor((Math.random()*waveOps.length-1)+1)-1];
			}
			
			this.ops.push(op);
		}
    }

    // Creation of the equation for the calculation of the result
    for (var i = 0 ;i < nbrArgs; i++) {
	
		this.exp += this.args[i];
		
		if (i < nbrArgs-1) {
			this.exp += this.ops[i];
		}
    }

    // Calculate the result
    this.args.push(eval(this.exp));
    this.ops.push('=');
    this.exp += '=' + eval(this.exp);

    // Index of the item to hide
    var hiddenArgIndex = Math.floor((Math.random()*this.args.length)+1);
    hiddenArgIndex -= 1;

    // Definition of the solution
    this.solution = this.args[hiddenArgIndex];
    
    var toChange; // argument to hide
    var newText; // the '?'

    // If index == 0, "arg+op" is replaced by "?+op"
    if (hiddenArgIndex == 0) {
		toChange = this.args[hiddenArgIndex]+this.ops[hiddenArgIndex];
		newText  = '?'+this.ops[hiddenArgIndex];
    }
	
    // If index is those of the result, "=arg" is replaced by "=?"
    else if (hiddenArgIndex == this.ops.length){
		toChange = this.ops[hiddenArgIndex-1]+this.args[hiddenArgIndex];
		newText  = this.ops[hiddenArgIndex-1]+'?';
    }
	
    // Else "op+arg+op" is replaced by "op+?+op"
    else {
      toChange = this.ops[hiddenArgIndex-1]+this.args[hiddenArgIndex]+this.ops[hiddenArgIndex];
      newText  = this.ops[hiddenArgIndex-1]+'?'+this.ops[hiddenArgIndex];
    }
    
	// LOGGER à décommenter pour le débug
    // console.log('hiddenArgIndex :'+ hiddenArgIndex, toChange, newText);
    // console.log(this.solution);
  
    // Replaces in the chain
    this.exp = this.exp.replace(toChange,newText);
  
    return this.exp;
}
