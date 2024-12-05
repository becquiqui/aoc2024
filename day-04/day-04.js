const { readAndExecute } = require("../utils");

// utils
const getGrid = (input) =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const checkForward = (arr) => {
  const xmasMatches = arr.join("").match(/XMAS/g);
  return xmasMatches ? xmasMatches.length : 0;
};

const checkBackward = (arr) => {
  const xmasMatches = arr.join("").match(/SAMX/g);
  return xmasMatches ? xmasMatches.length : 0;
};
// ---------------------------------------------------------------------------------

// part one
const getXmasCount = (input) => {
  let xmasCount = 0;
  const grid = getGrid(input);

  grid.forEach((line, lineIndex) => {
    // check horizontals
    xmasCount += checkForward(line);
    xmasCount += checkBackward(line);

    line.forEach((letter, letterIndex) => {
      // check verticals
      if (lineIndex === 0) {
        const column = [];
        for (let i = 0; i < grid.length; i++) {
          column.push(grid[i][letterIndex]);
        }
        xmasCount += checkForward(column);
        xmasCount += checkBackward(column);
      }
      // check diagonals
      if (letter === "X") {
        // top left -> bottom right
        const maybeXmasNegSlopeForward = [];
        for (let i = 0; i < "XMAS".length; i++) {
          if (grid[lineIndex + i] && grid[lineIndex + i][letterIndex + i]) {
            maybeXmasNegSlopeForward.push(grid[lineIndex + i][letterIndex + i]);
          }
        }
        xmasCount += checkForward(maybeXmasNegSlopeForward);

        // top right -> bottom left
        const maybeXmasPosSlopeBackward = [];
        for (let i = 0; i < "XMAS".length; i++) {
          if (grid[lineIndex + i] && grid[lineIndex + i][letterIndex - i]) {
            maybeXmasPosSlopeBackward.push(
              grid[lineIndex + i][letterIndex - i],
            );
          }
        }
        xmasCount += checkForward(maybeXmasPosSlopeBackward);

        // bottom left -> top right
        const maybeXmasPosSlopeForward = [];
        for (let i = 0; i < "XMAS".length; i++) {
          if (grid[lineIndex - i] && grid[lineIndex - i][letterIndex + i]) {
            maybeXmasPosSlopeForward.push(grid[lineIndex - i][letterIndex + i]);
          }
        }
        xmasCount += checkForward(maybeXmasPosSlopeForward);

        // bottom right -> top left
        const maybeXmasNegSlopeBackward = [];
        for (let i = 0; i < "XMAS".length; i++) {
          if (grid[lineIndex - i] && grid[lineIndex - i][letterIndex - i]) {
            maybeXmasNegSlopeBackward.push(
              grid[lineIndex - i][letterIndex - i],
            );
          }
        }
        xmasCount += checkForward(maybeXmasNegSlopeBackward);
      }
    });
  });
  return xmasCount;
};
// expected output: 18
readAndExecute("./test-data.txt", getXmasCount);
// answer: 2591
readAndExecute("./challenge-data.txt", getXmasCount);
