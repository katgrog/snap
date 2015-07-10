// js with steer

// this should always store the current card on show
var currentCard;
var timerID;
var availableCards = generateDeck();
var playedCards = [];
console.log('Cards: ', availableCards);

function generateDeck(){
	// generates a new deck of 52 cards 
	//  e.g [{ suit : 'spade', face : 1 },
	//  	{ suit : 'heart', face : 1 }... ]

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



function playGame() {

	var player = {
		name: 'Katgrog'
	}

	// - 2 cards
	// - 1 player 
	console.log( availableCards[1] );
	// - What are the cards? 
	console.log( Math.ceil( Math.random()* 51 )); // gets a random number between 1 - 13 
	// - Get a new card (random)
	currentCard = newCard();
	console.log('new rando card: Boom ->', newCard());

	// run through the whole deck of cards
	// turn over the next card one by one
	// stop the looping if cards are the same
	timerID = loopOverDeck();
}
 
function newCard() {
	// - new card to display < a function 
	var cardIndex = Math.ceil( Math.random() * ( availableCards.length - 1 ) );
	var card = availableCards[cardIndex];
	console.log('CARD:', card);

	// remove card from deck
	availableCards.splice(cardIndex, 1);
	// add new card to the list of played cards
	playedCards.push(card);

 	return card;
}

function checkCards(oldCard, newCard){
	// === checks the value and the type are the same

	console.log('old card: ', oldCard);
	console.log('new card: ', newCard);
	// - is the second card the same or different? 
	// - if the card is the same:
	// - how do I know what card is what?
	// - new card < stored above 
	// - last card < the one before you put down the new card
	if ( oldCard.face === newCard.face ) {

		console.log("Woohoo!")

		// steps if card are the same

		// get rid of deck
		// stop timer
		// give points to the winner

		// start timer/loop again 	
	} else {
		console.log('not the same :(');
		// do nothing 
	}
	// store new card as current card
}

function loopOverDeck(){

	// returns the id of the interval so it can be stoped with clearInterval()
	return setInterval( function(){
			
		// if not last card 
		if(playedCards.length < 52 ){
			// get the next card from the top of the deck.
			var nextCard = newCard();

			// checks the current cards in play
			checkCards(currentCard, nextCard);
		} else {
			console.log('Game Over!');
		}


	}, 1000);

}

// - click on deck to start game
playGame();



console.log( 'INDEX:', _.findWhere( availableCards, {suit: "spade", face: 13}) );
	
