// part one
const getSafeCount = (input) => {
  // format into array of arrays of numbers
  const reports = input
    .split(", ")
    .map((str) => str.split(" ").map((el) => +el));
  // mark each array as safe or unsafe
  const markedReports = reports.map((report) => {
    let isSafe = true;
    let prevDiff = 1;
    report.forEach((el, i) => {
      if (i === 0) {
        return;
      }
      // if prevDiff is positive & diff between report[i - 1] and el is negative
      if (prevDiff > 0 && report[i - 1] - el < 0) {
        isSafe = false;
        return;
      }
      // if prevDiff is negative & diff between report[i - 1] and el is positive
      if (prevDiff < 0 && report[i - 1] - el > 0) {
        isSafe = false;
        return;
      }
      // if report[i - 1] and el have a diff of 0
      if (report[i - 1] - el === 0) {
        isSafe = false;
        return;
      }
      const currentDiff =
        report[i - 1] > el ? report[i - 1] - el : el - report[i - 1];
      // if report[i - 1] and el have a diff of more than 3
      if (currentDiff > 3) {
        isSafe = false;
        return;
      }
      prevDiff = report[i - 1] - el;
    });
    return isSafe;
  });
  // return length
  return markedReports.filter((isSafe) => isSafe).length;
};
// expected output: 2
getSafeCount(
  "7 6 4 2 1, 1 2 7 8 9, 9 7 6 2 1, 1 3 2 4 5, 8 6 4 4 1, 1 3 6 7 9, 5 4 3 2 1",
);
