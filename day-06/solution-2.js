const inputText = require('../getText')(__dirname, './input.txt');
const initialFishSchool = inputText.split(',').map((n) => parseInt(n));

const totalDays = 256;
const fishBuckets = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

for (let fish of initialFishSchool) {
  fishBuckets[fish]++;
}

for (let day = 0; day < totalDays; day++) {
  const currentZeros = fishBuckets[0];

  const newZeros = fishBuckets[1];
  const newOnes = fishBuckets[2];
  const newTwos = fishBuckets[3];
  const newThrees = fishBuckets[4];
  const newFours = fishBuckets[5];
  const newFives = fishBuckets[6];
  const newSixes = currentZeros + fishBuckets[7];
  const newSevens = fishBuckets[8];
  const newEights = currentZeros;

  fishBuckets[0] = newZeros;
  fishBuckets[1] = newOnes;
  fishBuckets[2] = newTwos;
  fishBuckets[3] = newThrees;
  fishBuckets[4] = newFours;
  fishBuckets[5] = newFives;
  fishBuckets[6] = newSixes;
  fishBuckets[7] = newSevens;
  fishBuckets[8] = newEights;
}

console.log(Object.values(fishBuckets).reduce((a, b) => a + b));
