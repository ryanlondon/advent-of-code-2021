const inputText = require('../getText')(__dirname, './input.txt');
const coordinatePairs = inputText.split('\n').map((line) => line.split(' -> '));

const map = new Map();

const addToMap = (coords) => {
  if (!map.has(coords)) {
    map.set(coords, 0);
  }
  map.set(coords, map.get(coords) + 1);
};

const followLine = (startingCoords, endingCoords) => {
  const [startX, startY] = startingCoords.split(',').map((n) => parseInt(n));
  const [endX, endY] = endingCoords.split(',').map((n) => parseInt(n));

  let currentX = startX;
  let currentY = startY;
  addToMap(`${currentX},${currentY}`);

  while (currentX !== endX || currentY !== endY) {
    if (currentX > endX) currentX--;
    else if (currentX < endX) currentX++;

    if (currentY > endY) currentY--;
    else if (currentY < endY) currentY++;

    addToMap(`${currentX},${currentY}`);
  }
};

coordinatePairs.forEach((coordinatePair) => {
  followLine(...coordinatePair);
});

let dangerSpots = 0;

for ([coords, hits] of map) {
  if (hits > 1) {
    dangerSpots++;
  }
}

console.log(dangerSpots);
