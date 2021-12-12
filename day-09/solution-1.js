const inputText = require('../getText')(__dirname, './input.txt');
const grid = inputText.split('\n').map((line) => line.split(''));

const lowPoints = [];

for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[0].length; column++) {
    const up = grid[row - 1]?.[column];
    const down = grid[row + 1]?.[column];
    const left = grid[row]?.[column - 1];
    const right = grid[row]?.[column + 1];

    const validNeighbors = [up, down, left, right].filter((value) => value !== undefined);

    if (validNeighbors.every((neighbor) => neighbor > grid[row][column])) {
      lowPoints.push(grid[row][column]);
    }
  }
}

console.log(
  lowPoints
    .map((n) => parseInt(n))
    .reduce((a, b) => {
      return a + b + 1;
    }, 0)
);
