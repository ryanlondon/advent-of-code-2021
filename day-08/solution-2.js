const inputText = require('../getText')(__dirname, './input.txt');

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function sortLetters(word) {
  return word.split('').sort().join('');
}

function createDigitMap(key) {
  const digitArr = key.split(' ');

  const oneDigit = digitArr.find((s) => s.length === 2);
  const sevenDigit = digitArr.find((s) => s.length === 3);
  const fourDigit = digitArr.find((s) => s.length === 4);
  const eightDigit = digitArr.find((s) => s.length === 7);

  const zeroSixAndNineDigitArr = digitArr.filter((s) => s.length === 6);
  const twoThreeAndFiveDigitArr = digitArr.filter((s) => s.length === 5);

  const nineDigit = zeroSixAndNineDigitArr.find((s) =>
    isSuperset(new Set(s.split('')), new Set(fourDigit.split('')))
  );

  const zeroDigit = zeroSixAndNineDigitArr.find(
    (s) => s !== nineDigit && isSuperset(new Set(s.split('')), new Set(oneDigit.split('')))
  );

  const sixDigit = zeroSixAndNineDigitArr.find((s) => s !== nineDigit && s !== zeroDigit);

  const threeDigit = twoThreeAndFiveDigitArr.find((s) =>
    isSuperset(new Set(s.split('')), new Set(oneDigit.split('')))
  );

  const fiveDigit = twoThreeAndFiveDigitArr.find((s) =>
    isSuperset(new Set(sixDigit.split('')), new Set(s.split('')))
  );

  const twoDigit = twoThreeAndFiveDigitArr.find((s) => s !== threeDigit && s !== fiveDigit);

  return {
    [sortLetters(zeroDigit)]: 0,
    [sortLetters(oneDigit)]: 1,
    [sortLetters(twoDigit)]: 2,
    [sortLetters(threeDigit)]: 3,
    [sortLetters(fourDigit)]: 4,
    [sortLetters(fiveDigit)]: 5,
    [sortLetters(sixDigit)]: 6,
    [sortLetters(sevenDigit)]: 7,
    [sortLetters(eightDigit)]: 8,
    [sortLetters(nineDigit)]: 9,
  };
}

const mappedValues = inputText
  .split('\n')
  .map((line) => line.split(' | '))
  .map(([key, scrambledValues]) => {
    const digitMap = createDigitMap(key);
    const mappedValue = scrambledValues
      .split(' ')
      .map((digit) => digitMap[sortLetters(digit)])
      .join('');

    return parseInt(mappedValue);
  });

console.log(mappedValues.reduce((a, b) => a + b));
