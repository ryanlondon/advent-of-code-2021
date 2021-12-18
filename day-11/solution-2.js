const inputText = require('../getText')(__dirname, './input.txt');
const octopusArray = inputText.split('\n').map((line) => line.split('').map((n) => parseInt(n)));

let steps = 0;

function checkAreOctopiSynchronized() {
  for (let row = 0; row < octopusArray.length; row++) {
    for (let column = 0; column < octopusArray[row].length; column++) {
      if (octopusArray[row][column] !== 'flashed') {
        return false;
      }
    }
  }
  return true;
}

function resetFlashedOctopi() {
  for (let row = 0; row < octopusArray.length; row++) {
    for (let column = 0; column < octopusArray[row].length; column++) {
      if (octopusArray[row][column] === 'flashed') {
        octopusArray[row][column] = 0;
      }
    }
  }
}

function incrementNeighbors(row, column) {
  const directions = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  directions.forEach(({ x, y }) => incrementOctopus(row + x, column + y));
}

function incrementOctopus(row, column) {
  if (octopusArray[row] === undefined) return;
  if (octopusArray[row][column] === undefined) return;
  if (octopusArray[row][column] === 'flashed') return;

  if (octopusArray[row][column] === 9) {
    octopusArray[row][column] = 'flashed';
    incrementNeighbors(row, column);
  } else {
    octopusArray[row][column]++;
  }
}

while (true) {
  for (let row = 0; row < octopusArray.length; row++) {
    for (let column = 0; column < octopusArray[row].length; column++) {
      incrementOctopus(row, column);
    }
  }

  steps++;

  if (checkAreOctopiSynchronized()) {
    break;
  }

  resetFlashedOctopi();
}

console.log(steps);
