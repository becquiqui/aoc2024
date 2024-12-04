const { readAndExecute } = require("../utils");

// regexes
const DO_DONT_MUL = /do\(\)|don\'t\(\)|mul\(\d{1,3},\d{1,3}\)/g;
const MUL = /mul\(\d{1,3},\d{1,3}\)/g;

// util
const mul = (a, b) => a * b;
// ----------------------------------------------------------------------

// part one
const sumOfProducts = (input) =>
  input
    .match(MUL)
    .map((func) => new Function("mul", `return ${func}`)(mul))
    .reduce((a, b) => a + b);
// expected output: 161
readAndExecute("./test-data-part1.txt", sumOfProducts);
// answer: 182780583
readAndExecute("./challenge-data.txt", sumOfProducts);

// part two
const temp = (input) => {
  let doMul = true;
  return input
    .match(DO_DONT_MUL)
    .map((command) => {
      if (command === "do()") {
        doMul = true;
      } else if (command === "don't()") {
        doMul = false;
      }
      if (doMul && !!command.match(MUL)) {
        return new Function("mul", `return ${command}`)(mul);
      }
    })
    .filter(Boolean)
    .reduce((a, b) => a + b);
};
// expected output: 48
readAndExecute("./test-data-part2.txt", temp);
// answer: 90772405
readAndExecute("./challenge-data.txt", temp);
