/* Fonction g�n�riques */

/**
* Function traceToConsole
* Tracer le message sMessage : si bDebur est true et si la console est non null
* Permet le debogage sous Firefox 
* 
* @param sMessage le message � tracer
* @param bDebug vrai si il faut tracer 
* @return rien
*/ 
function traceToConsole(sMessage, bDebug){
  if ( window.console && bDebug ){
  console.log(sMessage);
  }
}


/**
* Function create2DArray
* Cr�ation de tableau iSize * iSize
*
* @param iSize la longueur du tableau 
* @return un tableau iSize * iSize
*/ 
function create2DArray(iSize) {
  var arr = [];
  for (var i=0;i<iSize;i++) {
    arr[i] = [];
  }
  return arr;
}



/**
* Function getRandomValue
* @param n la valeur max
* @return une valeur al�atoire 1 � n
*/  
function getRandomValue(n){
  var result = 1 + Math.floor( Math.random() * n );
  return result;
}

/**
* Function randomValueOneToNine
* @return les valeurs 1, 3, 5, 7 ou 9 e mani�re al�atoire
*/   
function randomValueOneToNine(){
  // de 0 � 1
  var random = getRandomValue(9);
  // on ne garde que les valeurs impaires pour meilleure lecture du jeu
  if ( random == 2 || random == 4 || random == 6 || random == 8 ) random--;
  return random;
}
