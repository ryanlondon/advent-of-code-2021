const inputText = require('../getText')(__dirname, './input.txt');
const inputPaths = inputText.split('\n');

const nodes = {};
const paths = [];

inputPaths.forEach((path) => {
  const [node1, node2] = path.split('-');

  if (!nodes[node1]) {
    nodes[node1] = new Set();
  }

  if (!nodes[node2]) {
    nodes[node2] = new Set();
  }

  if (node1 === 'start' || node2 === 'end') {
    nodes[node1].add(node2);
  } else if (node2 === 'start' || node1 === 'end') {
    nodes[node2].add(node1);
  } else {
    nodes[node1].add(node2);
    nodes[node2].add(node1);
  }
});

function findPaths(startingNode = 'start', path = []) {
  if (startingNode === 'start') {
    path.push(startingNode);
  }

  if (startingNode === 'end') {
    paths.push(path);
    return;
  }

  const nextPossibleSteps = nodes[startingNode];

  const haveVisitedSmallCaveTwice = () => {
    const smallCavesVisited = path.filter((node) => node !== 'start' && node.toLowerCase() === node);
    return smallCavesVisited.length !== new Set(smallCavesVisited).size;
  };

  const nextValidSteps = Array.from(nextPossibleSteps).filter((nextPossibleStep) => {
    if (nextPossibleStep === nextPossibleStep.toUpperCase()) return true;
    if (!haveVisitedSmallCaveTwice()) return true;
    if (!path.includes(nextPossibleStep)) return true;
    return false;
  });

  for (const nextStep of nextValidSteps) {
    findPaths(nextStep, [...path, nextStep]);
  }
}

findPaths();
console.log(paths.length);
