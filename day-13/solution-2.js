const inputText = require('../getText')(__dirname, './input.txt');
const [dots, foldsText] = inputText.split('\n\n').map((chunk) => chunk.split('\n'));

let dotSet = new Set(dots);

const foldTuples = foldsText.map((text) => {
  const [directionText, positionText] = text.split('=');
  return [directionText.slice(-1), positionText];
});

function executeFold(foldX, foldY) {
  const newDotSet = new Set();
  for (const coords of dotSet) {
    const coordText = coords.split(',');
    let [x, y] = coordText.map((n) => parseInt(n));

    if (foldX !== 0 && x > foldX) {
      x = foldX * 2 - x;
    }

    if (foldY !== 0 && y > foldY) {
      y = foldY * 2 - y;
    }

    newDotSet.add(`${x},${y}`);
  }

  dotSet = newDotSet;
}

for ([direction, positionText] of foldTuples) {
  if (direction === 'x') {
    executeFold(parseInt(positionText), 0);
  } else if (direction === 'y') {
    executeFold(0, parseInt(positionText));
  }
}

let maxY = 0;
let maxX = 0;

for (const coords of dotSet) {
  const coordText = coords.split(',');
  const [x, y] = coordText.map((n) => parseInt(n));
  if (maxY < y) maxY = y;
  if (maxX < x) maxX = x;
}

const grid = [...Array(maxX + 1)].map((_) => Array(maxY + 1).fill('-'));

for (const coords of dotSet) {
  const coordText = coords.split(',');
  const [x, y] = coordText.map((n) => parseInt(n));
  grid[x][y] = '#';
}

console.table(grid);
