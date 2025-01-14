/* 
 * Fonction IA pour jeu Emplico
 * Emlico game IA functions 
 */  

// ---------------------------------------------------------------------------

/**
* Function isGameBlocked
* V�rifie si le jeu est bloqu�. Le jeu est suppos� bloqu�, 
* et il n'est pas bloqu� si il y a une case libre sur la ligne ou la colonne
* de la board.lastPlayedCase.  
*
* @return true si le jeu est bloqu�, sinon false
*/  
function isGameBlocked(){
  
  var DEBUG = false;
    
  var isBlocked=true;
  
  if ( board.lastPlayedCase == null ) return false; 
  
  //une case est elle encore jouable sur la ligne board.lastPlayedCase.row ?
  for (var col=0; col<board.colAmount; col++){
    tempCase = caseArray[col][board.lastPlayedCase.row];
    if ( tempCase.isPlayedByComputer || tempCase.isPlayedByHuman ){
      //d�ja jou�, ...
    } else {
      isBlocked = false;
      break;  
    }
  };//end for cols
  
  //si le jeu est d�ja reconnu non bloqu�, pas la peine de tester la colonne
  if ( isBlocked ){
    //une case est elle encore jouable sur la colonne board.lastPlayedCase.col ?    
    for (var row=0; row<board.rowAmount; row++){
    tempCase = caseArray[board.lastPlayedCase.col][row];
    if ( tempCase.isPlayedByComputer || tempCase.isPlayedByHuman ){
      //d�ja jou�, ...
    } else {
      isBlocked = false;
      break;  
      }
    };//end for rows
  } // end if
  if ( isBlocked ) 
    traceToConsole("isGameBlocked : BLOCKED en col,row=" + board.lastPlayedCase.col + "," + board.lastPlayedCase.row, DEBUG);
  else 
    traceToConsole("isGameBlocked : non bloqu� en col,row=" + board.lastPlayedCase.col + "," + board.lastPlayedCase.row, DEBUG); 
  
  return isBlocked;
  
} 

// ---------------------------------------------------------------------------

/**
* Function makeComputerPlaysAtLevel
* L'ordinateur joue en Level 1 
* Si il y a une case actuellement jou� par le joueur
*   L'IA choisit la case de score le plus �lev� (mm ligne, mm colonne)
* Sinon
*   L'IA choisit la case de score le plus �lev� 
* TODO :
*   L'algorithme scrupte d'abord les colonnes croissantes, 
*   puis les lignes croissantes, ce qui rend l'IA pr�visible
*
* @return rien
*/       
function makeComputerPlaysAtLevel(iDifficulty){
  
  //alert(iDifficulty);
  var DEBUG = false;
  traceToConsole("computerPlaysAtLevel : iDifficulty=" + iDifficulty, DEBUG);
  
  var bestCasesArray = [];
  var bestPointsToWin=0;
  var bestCaseToPlay = null;
  
  if ( board.lastPlayedCase == null ){
      // cas lastPlayedCase == null, c.a.d personne n'a encore jou�
      //on cherche les meilleure case du plateau
      bestCasesArray=getBestCaseArrayOnBoard();
  } else {
      // cas lastPlayedCase NON null, c.a.d en cours de partie
      //on cherche les meilleure case sur la mm ligne ou colonne
      bestCasesArray=getBestCaseArrayOnColOrRow();
  }

  //nombre de meilleures cases
  var arraySize = bestCasesArray.length;
  
  if ( arraySize == 1 ){
    //si une seule case jouable, on la prend
    bestCaseToPlay=bestCasesArray[0];
    bestPointsToWin=bestCaseToPlay.points;
  } else if ( iDifficulty == 1 ) {
    //sinon si plusieurs cases et difficulty 1, on choisit en al�atoire
    var random = getRandomValue(arraySize);
    bestCaseToPlay = bestCasesArray[random-1];
    bestPointsToWin=bestCaseToPlay.points;
    traceToConsole("computerPlaysAtLevel : best case (" + random + "/" + arraySize + ") with "  +  bestCaseToPlay.points + " points", DEBUG);
  } else if ( iDifficulty == 2 ) {
    //sinon si plusieurs cases et difficulty 2, on choisit la case donnant acc�s � la plus basse meilleure case au tour suivant
    var index = getCaseLimitingNextTurnPoints(bestCasesArray);
    bestCaseToPlay = bestCasesArray[index];
    bestPointsToWin=bestCaseToPlay.points;
  }   
  
  if ( bestPointsToWin==0 ) {
    // il n'y a plus de cases � jouer (cas impossible)
  } else {
    traceToConsole("computerPlaysEasyLevel : IA plays "  + bestCaseToPlay.points + " points on " + bestCaseToPlay.col + "," + bestCaseToPlay.row, DEBUG );
    bestCaseToPlay.isPlayedByComputer = true;
    board.computerScore += bestCaseToPlay.points;
    board.computerPlays = false;
    board.lastPlayedCase=bestCaseToPlay;
  }
  
}

// ---------------------------------------------------------------------------

/**
* Function getBestCaseArrayOnBoard
* D�termine les cases ayant le plus de points sur le plateau 
* @return un tableau de case
*/  
function getBestCaseArrayOnBoard(){

  var DEBUG = false;

  var bestCasesArray = [];
  var bestPointsToWin=0;
  
  for (var col=0; col<board.colAmount; col++){
    for (var row=0; row<board.rowAmount; row++){
      if ( caseArray[col][row].points > bestPointsToWin ){
        bestCasesArray.length = 0;
        bestCasesArray.push(caseArray[col][row]);
        bestPointsToWin = caseArray[col][row].points;
      } else if ( caseArray[col][row].points == bestPointsToWin ){    
        bestCasesArray.push(caseArray[col][row]);
      }// end if
    };//end for
  };//end for
  
  traceToConsole("getBestCasesOnBoard : " + bestCasesArray.length + " cases found with "  +  bestPointsToWin + " points", DEBUG);
  
  return bestCasesArray; 

}

// ---------------------------------------------------------------------------

/**
* Function getBestCaseArrayOnColOrRow
* D�termine les cases ayant le plus de points sur la m�me 
* colonne et ligne que board.lastPlayedCase.col, board.lastPlayedCase.row
* @return un tableau de case
*/  
function getBestCaseArrayOnColOrRow(){

  var DEBUG = false;

  var bestCasesArray = [];
  var bestPointsToWin=0;
  var tempCase = null;
              
  for (var col=0; col<board.colAmount; col++){
    tempCase = caseArray[col][ board.lastPlayedCase.row];
    if ( tempCase.isPlayedByComputer || tempCase.isPlayedByHuman ){
      //d�ja jou�, ...
    } else if ( tempCase.points > bestPointsToWin ){
        bestCasesArray.length = 0;
        bestCasesArray.push( caseArray[col][board.lastPlayedCase.row] );
        bestPointsToWin = tempCase.points;
        //traceToConsole("getBestCaseArrayOnColOrRow a : create array for " + bestPointsToWin + " points serie", DEBUG);
    } else if ( tempCase.points == bestPointsToWin ){    
        bestCasesArray.push( caseArray[col][board.lastPlayedCase.row] );
        //traceToConsole("getBestCaseArrayOnColOrRow a : push in array for " + bestPointsToWin + " points serie", DEBUG);
    }//end if
  };//end for cols

  for (var row=0; row<board.rowAmount; row++){
    tempCase = caseArray[board.lastPlayedCase.col][ row];
    if ( tempCase.isPlayedByComputer || tempCase.isPlayedByHuman ){
      //d�ja jou�, ...
    } else if ( tempCase.points > bestPointsToWin ){
      bestCasesArray.length = 0;
      bestCasesArray.push( caseArray[board.lastPlayedCase.col][row] );
      bestPointsToWin = tempCase.points;
      //traceToConsole("getBestCaseArrayOnColOrRow b : create array for " + bestPointsToWin + " points serie", DEBUG);
    } else if ( tempCase.points == bestPointsToWin ){    
      bestCasesArray.push( caseArray[board.lastPlayedCase.col][row] );
      //traceToConsole("getBestCaseArrayOnColOrRow b : push in array for " + bestPointsToWin + " points serie", DEBUG);
    }//end if
  };//end for rows
  
  traceToConsole("getBestCaseArrayOnColOrRow : " + bestCasesArray.length + " cases found with "  +  bestPointsToWin + " points", DEBUG);

  return bestCasesArray;
}

// ---------------------------------------------------------------------------

/**
* Function getCaseLimitingNextTurnPoints
* D�termine la case qui donne acc�s au tour T
* � la plus mauvaise case au tour T + 1
*
* Pour chacune des cases du tableau en entr�e, on cherche 
* la case accessible (mm ligne, mm colonne, pas d�ja jou�e) donnant le max de points
* La meilleure case (� jouer par ordi) 
* est celle ayant la difference de points minimum maximale 
*
* Exemple : le tableau a 2 cases caseToCheck valant 6 points
*           Il faut �valuer laquelle des deux cases est la meilleure
*           la case nextTurnCase N1 donne acc�s 
*             au mieux � un 3 sur sa ligne et 5 sur sa colonne
*             le joueur choisira le 5, minDiff = 1
*           la case nextTurnCase b done acc�s 
*             au mieux � un 6 sur la mm ligne et 4 sur la mm colonne
*             le joueur choisira le 6, minDiff = 0
*  La meilleure case est la a, elle a la plus grande diff�rence minimale
*  et le joueur marquera un minimum de points au tour suivant  
* 
* @param casesArray le tableau de case � �tudier
* @return l'index de la case 
*/ 
function getCaseLimitingNextTurnPoints( casesArray ){
  
  var DEBUG = false;
  
  var caseToCheck;
  var nextTurnCase;
  var nextTurnDifference;
  //
  var minDifference=8;
  //la meilleure case est la premiere du tableau par d�faut
  var bestCaseIndex;
  //la difference min est -8 (jouer '1' pour donner acc�s � un '9')
  var bestMinDifference=-8;
  
  traceToConsole("getCaseLimitingNextTurnPoints : " + casesArray.length + " cases to test", DEBUG);
  
  var differenceArray = [casesArray.length];
  
  for ( var i in casesArray ) {
    //pour toutes les cases � �valuer
    caseToCheck = casesArray[i];
    minDifference=6;
    
    traceToConsole("getCaseLimitingNextTurnPoints : testing caseToCheck("+i+") in (" + caseToCheck.col +"," + caseToCheck.row + ")", DEBUG);
        
    for (var col=0; col<board.colAmount; col++){
      //recherche pour les cases de la m�me ligne que la case � �valuer
      nextTurnCase=caseArray[col][caseToCheck.row];
      if (nextTurnCase.isPlayedByComputer || nextTurnCase.isPlayedByHuman){
        // d�ja jou�
      } else if ( caseToCheck.col != nextTurnCase.col){
        //si la case du tour suivant est diff�rente de la case � tester
        nextTurnDifference=caseToCheck.points-nextTurnCase.points;
        if ( nextTurnDifference < minDifference ){
          traceToConsole("getCaseLimitingNextTurnPoints a : nextTurnCase(" + nextTurnCase.col +"," + nextTurnCase.row + ") has " + nextTurnCase.points + " points", DEBUG);
          minDifference=nextTurnDifference;
        }; //end if
      };//end if
    };//end for col
    
    for (var row=0; row<board.rowAmount; row++){
      //recherche pour les cases de la m�me ligne que la case � �valuer
      nextTurnCase=caseArray[caseToCheck.col][row];
      if (nextTurnCase.isPlayedByComputer || nextTurnCase.isPlayedByHuman){
        // d�ja jou�
      } else if ( caseToCheck.row != nextTurnCase.row){
        //si la case du tour suivant est diff�rente de la case � tester
        nextTurnDifference=caseToCheck.points-nextTurnCase.points;
        if ( nextTurnDifference < minDifference ){
          traceToConsole("getCaseLimitingNextTurnPoints b : nextTurnCase(" + nextTurnCase.col +"," + nextTurnCase.row + ") has " + nextTurnCase.points + " points", DEBUG);
          minDifference=nextTurnDifference;
        }; //end if
      };//end if
    };//end for col
    
    traceToConsole("getCaseLimitingNextTurnPoints : caseTocheck("+i+") in (" + caseToCheck.col +"," + caseToCheck.row + ") has a diff of " + minDifference + " points", DEBUG);
    
    //on a la difference pour la 1ere case
    if ( minDifference >= bestMinDifference) {
      bestCaseIndex = i;
      bestMinDifference = minDifference;
    }
    
  } // end for
  
  traceToConsole("getCaseLimitingNextTurnPoints : bestCaseIndex=" + bestCaseIndex, DEBUG);  
  return bestCaseIndex;  
}
