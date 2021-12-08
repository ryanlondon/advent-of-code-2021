const inputText = require('../getText')(__dirname, './input.txt');
const count = inputText
  .split('\n')
  .map((line) => line.split(' | '))
  .map(([_, display]) => display)
  .reduce((acc, line) => {
    const digits = line.split(' ');
    const uniqueNums = digits.filter(
      (digit) => digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7
    );
    return acc + uniqueNums.length;
  }, 0);

console.log(count);
