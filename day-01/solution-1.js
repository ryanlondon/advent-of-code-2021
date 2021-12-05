const inputText = require('../getText')(__dirname, './input.txt');
const inputNums = inputText.split('\n').map((n) => parseInt(n));

const tallyObject = inputNums.reduce(
  (acc, value) => {
    if (value > acc.prevValue) {
      acc.count++;
    }
    acc.prevValue = value;
    return acc;
  },
  { prevValue: Infinity, count: 0 }
);

console.log(tallyObject.count);
