const inputText = require('../getText')(__dirname, './input.txt');
const moves = inputText.split('\n');

let horizontalPosition = 0;
let depth = 0;

moves.forEach((move) => {
  const [direction, distanceStr] = move.split(' ');
  const distance = parseInt(distanceStr);

  switch (direction) {
    case 'forward': {
      horizontalPosition += distance;
      break;
    }
    case 'up': {
      depth -= distance;
      break;
    }
    case 'down': {
      depth += distance;
      break;
    }
  }
});

console.log(horizontalPosition * depth);
