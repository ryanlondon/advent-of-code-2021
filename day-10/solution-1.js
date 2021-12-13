const inputText = require('../getText')(__dirname, './input.txt');
const syntaxLines = inputText.split('\n');

const scoreMatrix = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let totalScore = 0;

const isOpeningChar = (char) => Boolean(char.match(/[\[\(\{\<]/));

const isMatchingChar = (closingChar, lastOpeningChar) => {
  if (closingChar === ']' && lastOpeningChar === '[') return true;
  if (closingChar === ')' && lastOpeningChar === '(') return true;
  if (closingChar === '}' && lastOpeningChar === '{') return true;
  if (closingChar === '>' && lastOpeningChar === '<') return true;
  return false;
};

for (const line of syntaxLines) {
  const stack = [];
  for (const char of line) {
    if (isOpeningChar(char)) {
      stack.push(char);
    } else {
      const lastOpeningChar = stack.pop();
      isMatch = isMatchingChar(char, lastOpeningChar);
      if (!isMatch) {
        totalScore += scoreMatrix[char];
      }
    }
  }
}

console.log(totalScore);
