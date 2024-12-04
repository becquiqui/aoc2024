const { readAndExecute } = require("../utils");

// util
const toNumArrays = (input) => {
  // make list out of string and format result into numbers
  const arr = input
    .split(" ")
    .flatMap((el) => el.split("\n"))
    .filter(Boolean);
  // return sorted lists
  return [
    arr.filter((_, i) => i % 2 !== 0).sort((a, b) => a - b),
    arr.filter((_, i) => i % 2 === 0).sort((a, b) => a - b),
  ];
};

// part one
const differenceBetweenLists = (input) => {
  const [sortedArr1, sortedArr2] = toNumArrays(input);
  // put difference between each element into new array, reduce, & return
  return sortedArr1
    .map((el, i) =>
      el > sortedArr2[i] ? el - sortedArr2[i] : sortedArr2[i] - el,
    )
    .reduce((a, b) => a + b);
};
// expected output: 11
readAndExecute("./test-data.txt", differenceBetweenLists);
// answer: 2164381
readAndExecute("./challenge-data.txt", differenceBetweenLists);

// part two
const similaritiesBetweenLists = (input) => {
  const [sortedArr1, sortedArr2] = toNumArrays(input);
  // for each number in sortedArr1, get total occurrences in sortedArr2,
  // multiply keys with values, add values together, & return
  return sortedArr1
    .map((value) => ({
      location: value,
      count: sortedArr2.filter((val) => val === value).length,
    }))
    .map(({ location, count }) => location * count)
    .reduce((a, b) => a + b);
};
// expected output: 31
readAndExecute("./test-data.txt", similaritiesBetweenLists);
// answer: 20719933
readAndExecute("./challenge-data.txt", similaritiesBetweenLists);
