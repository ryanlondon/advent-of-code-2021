const inputText = require('../getText')(__dirname, './input.txt');
const [startingPolymer, mapText] = inputText.split('\n\n');
const map = mapText.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('->');
  acc[key.trim()] = value.trim();
  return acc;
}, {});

const steps = 10;

let currentPolymer = startingPolymer;

for (let step = 0; step < steps; step++) {
  let newPolymer = '';
  for (let position = 0; position < currentPolymer.length - 1; position++) {
    const elementPair = currentPolymer.slice(position, position + 2);
    const newElement = map[elementPair];
    const newSequence = (position === 0 ? elementPair[0] : '') + newElement + elementPair[1];

    newPolymer += newSequence;
  }
  currentPolymer = newPolymer;
}

const elementMap = {};

for (const element of currentPolymer) {
  if (!elementMap[element]) elementMap[element] = 0;
  elementMap[element]++;
}

const minMaxCount = Object.values(elementMap).reduce(
  (acc, elementCount) => {
    if (elementCount > acc.max) acc.max = elementCount;
    if (elementCount < acc.min) acc.min = elementCount;
    return acc;
  },
  {
    max: -Infinity,
    min: Infinity,
  }
);

console.log(elementMap, minMaxCount.max - minMaxCount.min);
