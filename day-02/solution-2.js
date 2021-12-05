const inputText = require('../getText')(__dirname, './input.txt');
const moves = inputText.split('\n');

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

moves.forEach((move) => {
  const [direction, distanceStr] = move.split(' ');
  const distance = parseInt(distanceStr);

  switch (direction) {
    case 'forward': {
      horizontalPosition += distance;
      depth = depth + distance * aim;
      break;
    }
    case 'up': {
      aim -= distance;
      break;
    }
    case 'down': {
      aim += distance;
      break;
    }
  }
});

console.log(horizontalPosition * depth);
