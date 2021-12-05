const inputText = require('../getText')(__dirname, './input.txt');
const inputNums = inputText.split('\n').map((n) => parseInt(n));

let count = 0;
let prevSum = Infinity;

for (let i = 0; i < inputNums.length; i++) {
  const value = inputNums[i];
  const prev1 = inputNums[i - 1];
  const prev2 = inputNums[i - 2];

  if (prev1 === undefined || prev2 === undefined) continue;

  const sum = value + prev1 + prev2;

  if (sum > prevSum) {
    count++;
  }

  prevSum = sum;
}

console.log(count);
