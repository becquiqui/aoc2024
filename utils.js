const fs = require("fs");

// reads file (test- or challenge-data) and feeds into callback (challenge solver) logging the output
function readAndExecute(filename, callback) {
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(callback(data));
  });
}

module.exports = { readAndExecute };
