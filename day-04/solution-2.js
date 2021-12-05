const inputText = require('../getText')(__dirname, './input.txt');
const [callText, ...unparsedCards] = inputText.split('\n\n');
const calls = callText.split(',');

class BingoCard {
  squares; // 2d array of squares
  squaresByValue = {}; // pointers to "squares" array indexed by value
  isWinner = false;
  lastCall = null;

  constructor(cardText) {
    const rows = cardText.trim().split('\n');
    this.squares = new Array(rows.length);

    for (let row = 0; row < rows.length; row++) {
      const columns = rows[row].trim().split(/\s+/);
      this.squares[row] = new Array(columns.length);
      for (let column = 0; column < columns.length; column++) {
        const value = columns[column];
        this.squares[row][column] = { marked: false };
        this.squaresByValue[value] = this.squares[row][column];
      }
    }
  }

  markSquareByValue(value) {
    if (this.squaresByValue[value] && !this.isWinner) {
      this.lastCall = value;
      this.squaresByValue[value].marked = true;
    }
  }

  checkForWin() {
    if (this.isWinner) return false;
    const rowLength = this.squares.length;
    const columnLength = this.squares[0].length;

    // check rows
    for (let row = 0; row < rowLength; row++) {
      if (this.squares[row].every((square) => square.marked)) {
        this.isWinner = true;
        return true;
      }
    }

    // check columns
    for (let column = 0; column < columnLength; column++) {
      let isColumnMarked = true;
      for (let row = 0; row < rowLength; row++) {
        if (this.squares[row][column].marked) {
          continue;
        } else {
          isColumnMarked = false;
          break;
        }
      }
      if (isColumnMarked) {
        this.isWinner = true;
        return true;
      }
    }

    return false;
  }

  getSumOfUnmarkedSquares() {
    let total = 0;
    Object.entries(this.squaresByValue).forEach(([value, square]) => {
      if (!square.marked) {
        total += parseInt(value);
      }
    });
    return total;
  }
}

const bingoCards = unparsedCards.map((unparsedCard) => new BingoCard(unparsedCard));
const orderedWinningCards = [];

for (const call of calls) {
  for (const card of bingoCards) {
    card.markSquareByValue(call);
    if (card.checkForWin()) {
      orderedWinningCards.push(card);
    }
  }
}

const lastWinningCard = orderedWinningCards[orderedWinningCards.length - 1];
console.log(lastWinningCard.getSumOfUnmarkedSquares() * lastWinningCard.lastCall);
