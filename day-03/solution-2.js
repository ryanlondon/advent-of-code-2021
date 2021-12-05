const inputText = require('../getText')(__dirname, './input.txt');
const binaryNumbers = inputText.split('\n');
const wordLength = binaryNumbers[0].length;

const countBitsAtPosition = (numbers, bitPosition) => {
  const count = {
    onBits: 0,
    offBits: 0,
  };

  numbers.forEach((number) => {
    if (number[bitPosition] === '1') {
      count.onBits++;
    } else {
      count.offBits++;
    }
  });

  return count;
};

const findOxygenRating = () => {
  let candidates = [...binaryNumbers];

  while (candidates.length > 1) {
    for (let bit = 0; bit < wordLength; bit++) {
      if (candidates.length === 1) break;

      const { onBits, offBits } = countBitsAtPosition(candidates, bit);

      if (offBits > onBits) {
        candidates = candidates.filter((candidate) => candidate[bit] === '0');
      } else {
        candidates = candidates.filter((candidate) => candidate[bit] === '1');
      }
    }
  }

  return parseInt(candidates[0], 2);
};

const findCo2Rating = () => {
  let candidates = [...binaryNumbers];

  while (candidates.length > 1) {
    for (let bit = 0; bit < wordLength; bit++) {
      if (candidates.length === 1) break;

      const { onBits, offBits } = countBitsAtPosition(candidates, bit);

      if (offBits <= onBits) {
        candidates = candidates.filter((candidate) => candidate[bit] === '0');
      } else {
        candidates = candidates.filter((candidate) => candidate[bit] === '1');
      }
    }
  }

  return parseInt(candidates[0], 2);
};

const oxygenRating = findOxygenRating();
const co2Rating = findCo2Rating();

console.log(oxygenRating * co2Rating);
