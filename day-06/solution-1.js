const inputText = require('../getText')(__dirname, './input.txt');
const initialFishSchool = inputText.split(',').map((n) => parseInt(n));

const totalDays = 80;
let currentFishSchool = initialFishSchool;

for (let day = 0; day < totalDays; day++) {
  const newFishSchool = [];
  for (const fish of currentFishSchool) {
    if (fish === 0) {
      newFishSchool.push(6, 8);
    } else {
      newFishSchool.push(fish - 1);
    }
  }
  currentFishSchool = newFishSchool;
}

console.log(currentFishSchool.length);
