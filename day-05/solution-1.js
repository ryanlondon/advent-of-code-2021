const inputText = require('../getText')(__dirname, './input.txt');
const coordinatePairs = inputText.split('\n').map((line) => line.split(' -> '));

const map = new Map();

const addToMap = (coords) => {
  if (!map.has(coords)) {
    map.set(coords, 0);
  }
  map.set(coords, map.get(coords) + 1);
};

const followHorizontalOrVerticalLine = (startingCoords, endingCoords) => {
  const [startX, startY] = startingCoords.split(',').map((n) => parseInt(n));
  const [endX, endY] = endingCoords.split(',').map((n) => parseInt(n));

  if (startX === endX) {
    const lowerY = Math.min(startY, endY);
    const higherY = Math.max(startY, endY);

    for (let y = lowerY; y <= higherY; y++) {
      addToMap(`${startX},${y}`);
    }
  }

  if (startY === endY) {
    const lowerX = Math.min(startX, endX);
    const higherX = Math.max(startX, endX);

    for (let x = lowerX; x <= higherX; x++) {
      addToMap(`${x},${startY}`);
    }
  }
};

coordinatePairs.forEach((coordinatePair) => {
  followHorizontalOrVerticalLine(...coordinatePair);
});

let dangerSpots = 0;

for ([coords, hits] of map) {
  if (hits > 1) {
    dangerSpots++;
  }
}

console.log(dangerSpots);
