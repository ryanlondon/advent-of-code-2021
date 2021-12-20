const inputText = require('../getText')(__dirname, './input.txt');
const [startingPolymer, mapText] = inputText.split('\n\n');
const newElementMap = mapText.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('->');
  acc[key.trim()] = value.trim();
  return acc;
}, {});

const elementPairCount = Object.keys(newElementMap).reduce((acc, key) => {
  acc[key] = 0;
  return acc;
}, {});

// seed element pair count
for (let position = 0; position < startingPolymer.length - 1; position++) {
  const elementPair = startingPolymer.slice(position, position + 2);
  elementPairCount[elementPair]++;
}

const elementCount = {};

// seed element count
for (let position = 0; position < startingPolymer.length; position++) {
  const element = startingPolymer[position];
  if (!elementCount[element]) elementCount[element] = 0;
  elementCount[element]++;
}

const steps = 40;
let currentStep = 0;

while (currentStep < steps) {
  for ([pair, count] of Object.entries(elementPairCount)) {
    if (count !== 0) {
      const newElement = newElementMap[pair];

      if (!elementCount[newElement]) elementCount[newElement] = 0;
      elementCount[newElement] += count;

      const newPairLeft = `${pair[0]}${newElement}`;
      const newPairRight = `${newElement}${pair[1]}`;

      elementPairCount[pair] -= count;
      elementPairCount[newPairLeft] += count;
      elementPairCount[newPairRight] += count;
    }
  }

  currentStep++;
}

const minMaxCount = Object.values(elementCount).reduce(
  (acc, elementTotal) => {
    if (elementTotal > acc.max) acc.max = elementTotal;
    if (elementTotal < acc.min) acc.min = elementTotal;
    return acc;
  },
  {
    max: -Infinity,
    min: Infinity,
  }
);

console.log(minMaxCount.max - minMaxCount.min);
