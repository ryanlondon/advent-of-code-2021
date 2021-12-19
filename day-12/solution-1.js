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

  const nextSteps = nodes[startingNode];

  for (const nextStep of nextSteps) {
    if (nextStep.toLowerCase() === nextStep && path.includes(nextStep)) {
      continue;
    } else {
      findPaths(nextStep, [...path, nextStep]);
    }
  }
}

findPaths();
console.log(paths.length);
