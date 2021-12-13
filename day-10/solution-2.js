const inputText = require('../getText')(__dirname, './input.txt');
const syntaxLines = inputText.split('\n');

const scoreMatrix = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const isOpeningChar = (char) => Boolean(char.match(/[\[\(\{\<]/));

const isMatchingChar = (closingChar, lastOpeningChar) => {
  if (closingChar === ']' && lastOpeningChar === '[') return true;
  if (closingChar === ')' && lastOpeningChar === '(') return true;
  if (closingChar === '}' && lastOpeningChar === '{') return true;
  if (closingChar === '>' && lastOpeningChar === '<') return true;
  return false;
};

const lineScores = [];

for (const line of syntaxLines) {
  let stack = [];
  let lineScore = 0;

  for (const char of line) {
    if (isOpeningChar(char)) {
      stack.push(char);
    } else {
      const lastOpeningChar = stack.pop();
      isMatch = isMatchingChar(char, lastOpeningChar);
      if (!isMatch) {
        stack = [];
        break;
      }
    }
  }
  if (stack.length) {
    lineScore = stack.reduceRight((acc, char) => {
      return acc * 5 + scoreMatrix[char];
    }, lineScore);
    lineScores.push(lineScore);
  }
}

lineScores.sort((a, b) => a - b);

console.log(lineScores[Math.floor(lineScores.length / 2)]);
