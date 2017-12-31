
//definition of all variables needed in the game

var cardArray = ['A', 'A', 'B', 'B','C','C','D','D','E','E','F','F','G','G','H','H'];
var cardValues = [];
var cardIDs = [];
var cardReversed = 0;
var countingMoves = 0;
//var $scorePanel = $('#score-panel');
var rank3stars = 4;
var rank2stars = 8;
var rank1stars = 10;
//var $ratingStars = $('i');


Array.prototype.cardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//This function creates a new board everytime a game is finished or when the browser will be refreshed
function creatNewBoard(){
	cardReversed = 0;
	var output = '';
    cardArray.cardShuffle(); //shuffling all the cards and creates a new order on the board
	for(var i = 0; i < cardArray.length; i++){
		output += '<div id="card_'+i+'" onclick="reversingCards(this,\''+ cardArray[i]+'\')"></div>';
	}
	document.getElementById('gameBoard').innerHTML = output;
}

//This function is for the whole game
function reversingCards(card,value){
  	 if(card.innerHTML == "" && cardValues.length < 2){
  		card.style.background = '#FFF';
  		card.innerHTML = value;
  		if(cardValues.length == 0){
  			cardValues.push(value);
  			cardIDs.push(card.id);
  		} else if(cardValues.length == 1){
  			cardValues.push(value);
  			cardIDs.push(card.id);
  			if(cardValues[0] == cardValues[1]){ //here checking if opended cards math to each other or not
  				cardReversed += 2;
          countingMoves += 1;
          document.getElementById('count').innerHTML = countingMoves; //counting the right moves
  				// Clear both arrays
  				cardValues = [];
          cardIDs = [];
  				if(cardReversed == cardArray.length){ //checking if all cards where reversed and matched to each other
  					alert("Congratulations! You finally did it!");
  					document.getElementById('gameBoard').innerHTML = "";
  					creatNewBoard();
  				}
  			} else { //in case of a wrong match of two cards, the cards will be reversed back to their back
  				function reverseBackCard(){
  				    var card_1 = document.getElementById(cardIDs[0]);
  				    var card_2 = document.getElementById(cardIDs[1]);
  				    card_1.style.background = 'url(img/chinese.png) no-repeat';
              	    card_1.innerHTML = "";
  				    card_2.style.background = 'url(img/chinese.png) no-repeat';
              	    card_2.innerHTML = "";
  				    // Clear both arrays
  				    cardValues = [];
              cardIDs = [];

          }
  				setTimeout(reverseBackCard, 900); //time for reversing back the cards, in case of a wrong match
          countingMoves += 1;
          //this part is for counting the wrong moves and giving some statements in case of to much wrong moves
          document.getElementById('count').innerHTML = countingMoves;
          if (countingMoves > 3 && countingMoves < 8) {
            document.getElementById('moveTextDisplay').innerHTML = ("... the time has come to focus on the game.... get better!")
            $( "i").removeClass("star3");
          } else if (countingMoves > 7 && countingMoves < 12) {
              document.getElementById('moveTextDisplay').innerHTML = ("... even my grandmother can do better than you....")
              $( "i").removeClass("star2");
          } else if (countingMoves > 11 && countingMoves < 16) {
              document.getElementById('moveTextDisplay').innerHTML = ("... what's wrong with your memory? It's so simple.....")
          } else if (countingMoves == 16) {
              document.getElementById('moveTextDisplay').innerHTML = ("... still so bad... I'm so disappointed in you.....")
              $( "i").removeClass("star1");
          }
        }
}
}
}
