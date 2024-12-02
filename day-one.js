// part one
const differenceBetweenLists = (input) => {
  const { sortedArr1, sortedArr2 } = stringToNumArrays(input);
  // put difference between each element into new array, reduce, & return
  return sortedArr1
    .map((el, i) =>
      el > sortedArr2[i] ? el - sortedArr2[i] : sortedArr2[i] - el,
    )
    .reduce((a, b) => a + b);
};
// expected output: 11
differenceBetweenLists("3   4 4   3 2   5 1   3 3   9 3   3");

// part two
const similaritiesBetweenLists = (input) => {
  const { sortedArr1, sortedArr2 } = stringToNumArrays(input);
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
similaritiesBetweenLists("3   4 4   3 2   5 1   3 3   9 3   3");

// util
const stringToNumArrays = (str) => {
  // make list out of string
  const arr = str
    .split(" ")
    .filter((el) => +el !== 0)
    .map((el) => +el);
  // return string as sorted lists
  return {
    sortedArr1: arr.filter((_, i) => i % 2 !== 0).sort((a, b) => a - b),
    sortedArr2: arr.filter((_, i) => i % 2 === 0).sort((a, b) => a - b),
  };
};
