const inputText = require('../getText')(__dirname, './input.txt');
const grid = inputText.split('\n').map((line) => line.split(''));

class GridLocation {
  row;
  column;
  value;
  isVisited = false;

  constructor(row, column, value) {
    this.row = row;
    this.column = column;
    this.value = value;
  }
}

const gridLocations = {};
const basinSizes = [];

const getBasin = (startingLocation) => {
  const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];
  startingLocation.isVisited = true;
  let basin = [startingLocation];

  directions.forEach(({ x, y }) => {
    const key = `${startingLocation.row + x},${startingLocation.column + y}`;
    if (gridLocations[key] && !gridLocations[key].isVisited && gridLocations[key].value !== '9') {
      gridLocations[key].isVisited = true;
      basin = basin.concat(getBasin(gridLocations[key]));
    }
  });

  return basin;
};

// make grid locations
for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[0].length; column++) {
    gridLocations[`${row},${column}`] = new GridLocation(row, column, grid[row][column]);
  }
}

// find basins
for (const locationKey in gridLocations) {
  const gridLocation = gridLocations[locationKey];

  if (gridLocation.isVisited || gridLocation.value === '9') continue;
  const basin = getBasin(gridLocation);
  basinSizes.push(basin.length);
}

basinSizes.sort((a, b) => b - a);

console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);
