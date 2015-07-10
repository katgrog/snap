// js with steer

// this should always store the current card on show
var oldCard;
var newCard;
var timerID;
var availableCards = generateDeck();
var playedCards = [];
var playingNewHand;
var pointsAvailible = 0;
var players = {
	one : {
		name: prompt('Player 1 name'),
		score: 0
	},
	two : {
		name : prompt('Player 2 name'),
		score: 0
	}
}

console.log('Cards: ', availableCards);

function generateDeck(){
	// generates a new deck of 52 cards 
	//  e.g [{ suit : 'spade', face : 1 },
	//  	{ suit : 'heart', face : 12 }... ]

	var deck = _.flatten( _.map( ['spade', 'club', 'heart', 'diamond'], function(suitValue, suitIndex, suits ){

		var cards = _.map( _.range(1, 14), function(value, index, list){
			return {
				suit: suitValue, 
				face: value
			}
		});
		return cards;
	}));
	return deck;
}

function playNewHand() {
	// so the loop knows not to move this old card
	playingNewHand = true;

	// Get a new card 
	oldCard = dealCard();

	// kick things off
	timerID = loopOverDeck();

	//increment the points
	pointsAvailible++
}
 
function dealCard() {
	// - new card to display < a function 
	var cardIndex = Math.ceil( Math.random() * ( availableCards.length - 1 ) );
	var card = availableCards[cardIndex];
	// remove card from deck
	availableCards.splice(cardIndex, 1);
	// add new card to the list of played cards
	playedCards.push(card);

 	return card;
}

function checkCards(oldCard, newCard, player){
	console.log('old: ', oldCard,'new: ', newCard)

	// - if the card is the same:
	if ( oldCard.face === newCard.face ) {

		console.log("Woohoo!")

		// stop timer
		clearInterval(timerID);

		// give points to the winner
		players[player].score += pointsAvailible;

		// set the pot back to zero
		pointsAvailible = 0;

		// Who scored
		console.log(players[player].name + ' scored!')

		// start timer/loop again 	
		playNewHand();
	} else {
		console.log('not the same :(');
		// do nothing 
	}
}

function loopOverDeck(){

	// returns the id of the interval so it can be stoped with clearInterval()
	return setInterval( function(){

		// start of the 1000ms
		// update cards on show
		if(playingNewHand){
			console.log('first');
			playingNewHand = false;
			//  dont switch the cards out as their is only an old card at this point
		} else {
			oldCard = newCard;
			// newCard = '';	
		}
		
		setTimeout( function(){
			// end of the 1000ms

			// if not last card 
			if(playedCards.length < 52 ){
				// get the next card from the top of the deck.
				newCard = dealCard();

				//increment the points
				pointsAvailible++

				// visually show the new card
				updateCardsOnScreen();
			} else {
				endGame();
			}
		}, 1000);

	}, 1500);

}

function updateCardsOnScreen(){
	$('.old__card__content').text(oldCard.suit + ' | ' + oldCard.face);
	$('.new__card__content').text(newCard.suit + ' | ' + newCard.face);
}

function endGame(){
	console.log('Game Over!');
	
	// 
	var winner = _.max( players, function(players){
		return players.score;
	});

	console.log(winner.name +  ' WON!');
	console.log('scores: ', players);


	// STOP
	clearInterval(timerID);
}


// - click on deck to start game?
playNewHand();

// On audio -
// checks the current cards in play
$('body').on('keyup', function(){

	var player;
	switch(event.which) {
		case 13 :
			player = 'one';
			checkCards(oldCard, newCard, player);
		break;
		case 32 :
			player = 'two';
			checkCards(oldCard, newCard, player);
		break;
	}

});


console.log( 'INDEX:', _.findWhere( availableCards, {suit: "spade", face: 13}) );
	
