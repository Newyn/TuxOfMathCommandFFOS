/**************************************************************************************************
Liste des opérations :
= égalité
+ addition
- soustraction
* multiplication
/ division
**************************************************************************************************/

var ops= [];
ops[0] = '=';
ops[1] = '+';
ops[2] = '-';
ops[3] = '*';
ops[4] = '/';

/**************************************************************************************************
Statuts du jeu
[TOFIX] = difficulté, score, etc...
**************************************************************************************************/

//var state = {
//    level: 1,
//    equations: null,
//    score: 0
//};

/**************************************************************************************************
Constructeur d'une équation
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
Génération d'une équation
**************************************************************************************************/

Equation.prototype.generate = function (nbrArgs) {

	//Choix aléatoire des arguments et des opérations   	
  	for (var i = 0 ;i < nbrArgs; i++) {

  		//
  		var random = Math.floor((Math.random()*10)+1);

  		//cas particulier d'une division
  		//Si l'op précedente est une division on modifie l'argument précédent
  		if (this.ops[i-1] && this.ops[i-1] == ops[4])
  		{
  			this.args[i-1] = Math.floor((Math.random()*10)+1)*random;
  		}

  		this.args.push(random);

  		//ajouter une opération  		
  		if (i < nbrArgs-1)
	  	{
	  		var op = ops[Math.floor((Math.random()*4)+1)];
			// Si l'op précédente est une division on l'évite
			if (this.ops[i-1] && this.ops[i-1] == ops[4])
  			{
  				op = ops[Math.floor((Math.random()*3)+1)];
  			}
		  	this.ops.push(op);
  		}
  	}

  	// création de l'équation pour le calcul du résultat
  	for (var i = 0 ;i < nbrArgs; i++) {
  		this.exp += this.args[i];
  		if (i < nbrArgs-1){
  			this.exp += this.ops[i];
  		}  	  		
  	}

  	// calculer le résultat
  	this.args.push(eval(this.exp));
  	this.ops.push(ops[0]);
  	this.exp += ops[0] + eval(this.exp);

  	// Index de l'élément à cacher
  	var hiddenArgIndex = Math.floor((Math.random()*this.args.length)+1);
  	hiddenArgIndex -= 1;

  	// définition de la solution
  	this.solution = this.args[hiddenArgIndex];
  	
  	var toChange; // argument à cacher
  	var newText; // le ?

  	// si index 0 on remplce : arg+op par ?+op
  	if (hiddenArgIndex == 0){
  		toChange = this.args[hiddenArgIndex]+this.ops[hiddenArgIndex];
  		newText  = '?'+this.ops[hiddenArgIndex];
  	}
  	// si index est celui du résultat on remplce : =arg par =?
  	else if (hiddenArgIndex == this.ops.length){
  		toChange = this.ops[hiddenArgIndex-1]+this.args[hiddenArgIndex];
  		newText  = this.ops[hiddenArgIndex-1]+'?';
  	}
  	//sinon on remplace : op+arg+op par op+?+op
  	else{
  		toChange = this.ops[hiddenArgIndex-1]+this.args[hiddenArgIndex]+this.ops[hiddenArgIndex];
  		newText  = this.ops[hiddenArgIndex-1]+'?'+this.ops[hiddenArgIndex];
  	}
  	
	// LOGGER à décommenter pour le débug
  	//console.log('hiddenArgIndex :'+ hiddenArgIndex, toChange, newText);
  	//console.log(this.solution);
	
  	// on remplace dans la chaine 
  	this.exp = this.exp.replace(toChange,newText);
	
  	return this.exp;
}
