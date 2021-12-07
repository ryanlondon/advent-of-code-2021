const inputText = require('../getText')(__dirname, './input.txt');
const positions = inputText.split(',').map((n) => parseInt(n));

const mean = Math.floor(positions.reduce((a, b) => a + b) / positions.length);

const totalFuel = positions.reduce((acc, position) => {
  const distance = Math.abs(position - mean);

  let fuel = 0;
  for (let i = 0; i <= distance; i++) {
    fuel += i;
  }

  acc += fuel;
  return acc;
}, 0);

console.log(totalFuel);
