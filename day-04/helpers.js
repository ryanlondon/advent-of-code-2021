class BingoCard {
  squares;
  squaresByValue = {};
  lastCalled = null;

  constructor(textBlock) {
    const rows = textBlock.trim().split('\n');
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
    this.lastCalled = value;
    if (this.squaresByValue[value]) {
      this.squaresByValue[value].marked = true;
    }
  }

  checkForWin() {
    const rowLength = this.squares.length;
    const columnLength = this.squares[0].length;

    // check rows
    for (let row = 0; row < rowLength; row++) {
      if (this.squares[row].every((square) => square.marked)) {
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

module.exports = {
  BingoCard,
};
