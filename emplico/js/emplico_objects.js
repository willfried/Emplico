/* Objet pour jeu Mistigrid. */
// -----------------------------------------------------------------------------
// --- objet plateau de jeu carr�
// -----------------------------------------------------------------------------
function Board(iSize, iWidth, iHeight) {
  this.size= iSize;
  this.rowAmount= iSize;
  this.colAmount = iSize;
  this.width = iWidth;
  this.height = iHeight;
  this.rowHeight=iHeight/iSize;
  this.colWidth=iWidth/iSize;
  
  
  //largeur et hauteur d'un plot = colonne / 7 
  //(permet de dessiner 3 plot 4 4 espaces dans une case))
  var plotDelta=this.colWidth/7;
  //rayon d'un plot
  this.plotRadius=this.rowHeight/14;
  //positions d'une case
  this.caseInnerPosition1 =1 * plotDelta + this.plotRadius;
  this.caseInnerPosition2 =2 * plotDelta + this.plotRadius;
  this.caseInnerPosition3 =3 * plotDelta + this.plotRadius;
  this.caseInnerPosition4 =4 * plotDelta + this.plotRadius;
  this.caseInnerPosition5 =5 * plotDelta + this.plotRadius;
  this.caseInnerPosition6 =6 * plotDelta + this.plotRadius;
  
  //couleur des points jou�s par le joueur, bleu clair
  this.humanColor='#69c';
  //derni�re couleur jou�e par l'humain : bleu fonc�
  this.humanLastPlayedColor='#00f';
  //couleur des points jou�s par l'ordi, rouge clair
  this.computerColor='#c99';
  //derni�re couleur jou�e par l'ordi : rouge fonc�
  this.computerLastPlayedColor='#f00';
  //couleur des points par d�faut : noir
  this.defaultDrawColor = '#000';
  //couleur de fond par d�faut
  this.defaultBackColor= '#fff';
  //couleur de fond des cases jouables : nuance de jaune 
  this.caseToPlayBackColor= '#fc3';
  //couleur de fond des cases non jouables : blanc
  this.caseNotPlayableBackColor= '#fff';
  
  //flag pour savoir qui joue computer ou human
  this.computerPlays = true;
  //flag pour savoir si le jeu est commenc�
  this.isGameStarted = false;
  // score de l'IA
  this.computerScore=0;
  //score du joueur
  this.humanScore=0;
  //nombre de points sur le tableau
  this.pointsOnBoard=0;
  //score a atteindre
  this.scoreToReachToWin=0;
  //derni�re case jou�e
  this.lastPlayedCase=null;
  
  this.state=states.PLAYING;
  
  //this.tracer = function(sMessage, dDebug) {
  //      alert(sMessage + " " + dDebug);
  //  };
 
};

// -----------------------------------------------------------------------------
// --- objet case : une case en (iCol, iRow) vaut iPoints points et est non jou�
// -----------------------------------------------------------------------------
function Case(iPoints, iCol, iRow) {
  //id de la case 
  this.uniqueId= "id_" + iCol +  iRow;
  //nombre de points asoci�s 
  this.points = iPoints;
  //true si la case a �t� jou� par Human
  this.isPlayedByHuman=false;
  //true si la case a �t� jou�e par l'ordinateur
  this.isPlayedByComputer=false;
  //colonne de la case
  this.col=iCol;
  //ligne de la case
  this.row=iRow;
};
