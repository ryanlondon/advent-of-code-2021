const inputText = require('../getText')(__dirname, './input.txt');
const positions = inputText.split(',').map((n) => parseInt(n));
positions.sort((a, b) => a - b);

const median = positions[Math.floor(positions.length / 2)];

const totalFuel = positions.reduce((fuel, position) => {
  fuel += Math.abs(position - median);
  return fuel;
}, 0);

console.log(totalFuel);
