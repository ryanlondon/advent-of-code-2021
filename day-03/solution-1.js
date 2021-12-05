const inputText = require('../getText')(__dirname, './input.txt');
const binaryNumbers = inputText.split('\n');

const bitCount = {};
let gammaRate = '';
let epsilonRate = '';

binaryNumbers.forEach((number) => {
  for (let bit = 0; bit < number.length; bit++) {
    if (bitCount[bit] === undefined) {
      bitCount[bit] = 0;
    }

    if (number[bit] === '1') {
      bitCount[bit]++;
    }
  }
});

Object.values(bitCount).forEach((bitTotal) => {
  if (bitTotal > binaryNumbers.length / 2) {
    gammaRate += '1';
    epsilonRate += '0';
  } else {
    gammaRate += '0';
    epsilonRate += '1';
  }
});

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
