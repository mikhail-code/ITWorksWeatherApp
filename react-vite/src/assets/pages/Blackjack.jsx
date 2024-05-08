import React, { useState, useEffect } from "react";

function buildDeck() {
  const fullSuites = ["♠", "♥", "♦", "♣"];
  const deck = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      deck.push({ type: fullSuites[i], value: j });
    }
  }
  return shuffleDeck([...deck]); // Create a copy of the deck
}

function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

function Blackjack() {
  const [deck, setDeck] = useState(buildDeck());
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [houseScore, setHouseScore] = useState(0);
  const [result, setResult] = useState('');

  // useEffect(() => {
    
  // }, []);

  useEffect(() => { //  Had to move checkGameState out of deal functions for it to check properly
    checkGameState();
  }, [playerScore, houseScore]);

  const dealCardToPlayer = () => {
    if (deck.length === 0) {
      console.log("Deck is empty!");
      return;
    }
    if (playerScore >= 21) {
      console.log("Player has 21 or more.");
      return;
    }
    // Draw a card for the player
    const drawnCard = deck.pop();
    setPlayerScore(playerScore + drawnCard.value);
    setPlayerCards([...playerCards, drawnCard]);
  };

  const dealCardToHouse = () => {
    if (deck.length === 0) {
      console.log("Deck is empty!");
      return;
    }
    if (houseScore >= 21) {
      console.log("House has 21 or more.");
      return;
    }
    // Draw a card for the house
    const drawnCard = deck.pop(); // remove direct state manipulation
    setHouseScore(houseScore + drawnCard.value);
    setHouseCards([...houseCards, drawnCard]);
  };

  function checkGameState() {
    if (playerScore > 21) {
      setResult('Player has more than 21, player LOST!');
    } else {
      if (houseScore > 21 && playerScore <= 21) {
        setResult('Player WON!');
      } else if (houseScore === 21 && playerScore === 21) {
        setResult('DRAW!');
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <button onClick={dealCardToPlayer}>Deal to the Player</button>
      <button onClick={dealCardToHouse}>Deal to the House</button>
      <div>
        <h2>Player Cards:</h2>
        {playerCards.map((card, index) => (
          <span key={index}>
            {card.type}
            {card.value}{" "}
          </span>
        ))}
        <h2>Total score: {playerScore}</h2>
      </div>
      <div>
        <h2>House Cards:</h2>
        {houseCards.map((card, index) => (
          <span key={index}>
            {card.type}
            {card.value}{" "}
          </span>
        ))}
        <h2>Total score: {houseScore}</h2>
      </div>
      <h1>{result}</h1>
    </div>
  );
}

export default Blackjack;
