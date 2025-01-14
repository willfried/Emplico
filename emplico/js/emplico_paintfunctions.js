/* 
 * Fonction pour jeu Emlico. 
 * Paint functions for the Emlico game 
 * */

// ---------------------------------------------------------------------------


/**
* Function paintBoard
* Dessine du plateau de jeu
* 
* @return rien
*/ 
function paintBoard(){
  
  var DEBUG = false;
  
  context.clearRect(0, 0, board.width, board.height);

    //peinture des cases
  for (var col=0; col<board.colAmount; col++){
    for (var row=0; row<board.rowAmount; row++){
      paintCase(caseArray[col][row]);
    }; 
  };

  context.beginPath();
  
}

// ---------------------------------------------------------------------------

/**
* Function paintCase
* Dessine d'une case du plateau de jeu
* Une case � une valeur de 1 � 9
*
* @param cCase, la case � dessiner 
* @return rien
*/ 
function paintCase(cCase){
  
  var DEBUG = false;
   
  var X = cCase.col * board.colWidth;
  var Y = cCase.row * board.rowHeight;
  var points = cCase.points;
  
  // --- determination des couleurs de fond et de dessin ---
  
  var drawColor=board.defaultDrawColor;
  var backColor=board.caseNotPlayableBackColor;
  
  if (cCase.isPlayedByHuman) {
    //si la case est jou�e par joueur
    if ( cCase.uniqueId == board.lastPlayedCase.uniqueId ){
      //si la case est la derni�re case jou�e
      drawColor=board.humanLastPlayedColor;
      traceToConsole("paintCase : drawColor=board.humanLastPlayedColor", DEBUG);
    } else {
      //sinon la case a �t� jou�e aux tours pr�c�dents
      drawColor=board.humanColor;
      traceToConsole("paintCase : drawColor=board.humanColor", DEBUG);
    }
  } else if(cCase.isPlayedByComputer) {
      //autrement si la case est jou�e par IA
      if ( cCase.uniqueId == board.lastPlayedCase.uniqueId ){
        //si la case est la derni�re case jou�e par IA
        drawColor=board.computerLastPlayedColor;
        traceToConsole("paintCase : drawColor=board.computerLastPlayedColor", DEBUG);
    } else { 
      //sinon la case a �t� jou�e aux tours pr�c�dents par IA
      drawColor=board.computerColor;
      traceToConsole("paintCase : drawColor=board.computerColor", DEBUG);
    }        
  }
  else if (board.isGameStarted && board.lastPlayedCase != null ) {
    //sinon la case n'est pas encore jou�e
    if ( cCase.row == board.lastPlayedCase.row || cCase.col == board.lastPlayedCase.col ){
      //couleur de fond = nuance de jeane
      backColor=board.caseToPlayBackColor;  
    }
  } 
  
  // --- peinture du fond et tour de case ---
  context.fillStyle = backColor;
  paintRoundedSquare(X, Y, board.colWidth, board.rowHeight, backColor, drawColor );
  
  // --- peinture des points ---
  paintPoints(X, Y, points, drawColor)
  
}

// --------------------------------------------------------------------------

/**
* Function paintRoundedSquare
* Dessine d'un carr� au bord arrondi. Rayon du rond = c�t� /10.
*
* @param x, abscisse x de d�part 
* @param y, ordonn�e y de d�part
* @param width, largeur du carr�
* @param height, hauteur du carr�
* @param fStyle, couleur de fond
* @param sStyle, couleur de bordure
* @return rien
*/ 
function paintRoundedSquare(x, y, width, height, fStyle, sStyle) {

    x=x+1;
    y=y+1;
    width=width-2;
    height=height-2;
    context.strokeStyle = sStyle;
    context.fillStyle = fStyle;
    radius = width/10;
    
    context.beginPath();
    
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.stroke();
    context.fill();
};

// ---------------------------------------------------------------------------

/**
* Function paintPoints
* Dessine les points (1 � 9)
*
* @param x, abscisse x de d�part 
* @param y, ordonn�e y de d�part
* @param points, ordonn�e y de d�part
* @param fStyle, couleur de fond
* @return rien
*/ 
function paintPoints(x, y, points, fStyle) {

  context.fillStyle = fStyle;
  
  if ( points== 1 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 2 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition2, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition4, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 3 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 4 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition2, y + board.caseInnerPosition2, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition2, y + board.caseInnerPosition4, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition4, y + board.caseInnerPosition2, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition4, y + board.caseInnerPosition4, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 5 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 6 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition2, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition2, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition2, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition4, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition4, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition4, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 7 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 8 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition2, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition4, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
  } else if ( points== 9 ){
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition1, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition3, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill(); 
    context.beginPath(); 
    context.arc(x + board.caseInnerPosition1, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition3, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.arc(x + board.caseInnerPosition5, y + board.caseInnerPosition5, board.plotRadius, 0, Math.PI*2, false); // Draw a circle
    context.closePath(); 
    context.fill();
    
  };
}

