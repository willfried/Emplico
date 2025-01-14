# Emplico
Emplico is a html game where you have to EMPty LInes and COLumns on a grid.<br>

I wanted to check if I am able to find a original game concept, one of my own reflection,<br>
not a clone of another game, and develop a good prototype.<br>
It had to be visual, then I decided to develop it in html5 with canvas usage.

A grid from 2 x 2 to 12 x 12 is displayed, each cell contains a value from 1 to 9.<br>
The program chooses who is playing first.<br>
The given player has to chose a cell, collecting the points on the choosen cell.<br>
Then it is up for the second player to choose a cell on the same line or columns as the last choosen cell.<br>
The player who is collecting more than the half of available (computed by the program) wins.<br>
The players are emptying the available cells, then a draw might occur, when the available cells are out of reach.<br>

The program has two level of difficulty :<br>
* 1st level : the program is choosing the cell offering the highest amount of points<br>
* 2nd level : the program is choosing the cell offering the highest amout of points, and not allowing the human player to collect more points at the next turn<br>

I did the game as a kind of challenge, I think I reached my objective, and there is a lot to do to turn it in a addictive game :
* add visual effects while a cell is selected
* add clever sound to impress the player
* add random bonus appearing on cells
* unlock the game with new cells when the game is blocked

You can try it <a href="http://www.fridou.com/perso/emplico/emplico.html">there</a>

I don't think html5 is the right language for all these improvements.
A migration on Android or iOS?
