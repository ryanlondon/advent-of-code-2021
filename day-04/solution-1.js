const { BingoCard } = require('./helpers');
const inputText = require('../getText')(__dirname, './input.txt');
const [callText, ...unparsedCards] = inputText.split('\n\n');
const calls = callText.split(',');

const bingoCards = unparsedCards.map((unparsedCard) => new BingoCard(unparsedCard));

for (const call of calls) {
  const winningCard = bingoCards.find((card) => {
    card.markSquareByValue(call);
    return card.checkForWin();
  });

  if (winningCard) {
    const sumOfUnmarkedSquares = winningCard.getSumOfUnmarkedSquares();
    console.log(sumOfUnmarkedSquares * parseInt(call));
    break;
  }
}
