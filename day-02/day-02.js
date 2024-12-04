const { readAndExecute } = require("../utils");

// utils
const formatInput = (input) =>
  input
    .trim()
    .split("\n")
    .map((levels) => levels.split(" "));

const isSafe = (levels) =>
  levels
    // ignore first level; nothing to compare against
    .slice(1)
    // calculate diff
    .map((level, i) => levels[i] - level)
    .every(
      (diff, _, arr) =>
        // no diffs of 0
        diff !== 0 &&
        // or greater than 3 (converted to positive)
        Math.abs(diff) <= 3 &&
        // and check that the report is a constant increase (negative diff) or a constant decrease (positive diff)
        Math.sign(diff) === Math.sign(arr[0]),
    );

// --------------------------------------------------------------------

// part one
const getSafeCount = (input) =>
  formatInput(input).filter((levels) => isSafe(levels)).length;
// expected output: 2
readAndExecute("./test-data.txt", getSafeCount);
// // // answer: 202
readAndExecute("./challenge-data.txt", getSafeCount);

// part two
const getProblemDampenerCount = (input) => {
  let dubiouslySafeCount = 0;
  formatInput(input).forEach((report) => {
    let looksGoodToMeBaws = false;
    report.forEach((level, i) => {
      const minusOneProblemChild = [
        ...report.slice(0, i),
        ...report.slice(i + 1),
      ];
      if (isSafe(minusOneProblemChild)) {
        looksGoodToMeBaws = true;
        return;
      }
    });
    if (isSafe(report) || looksGoodToMeBaws) dubiouslySafeCount++;
  });
  return dubiouslySafeCount;
};
// expected output: 4
readAndExecute("./test-data.txt", getProblemDampenerCount);
// answer: 271
readAndExecute("./challenge-data.txt", getProblemDampenerCount);
