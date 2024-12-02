"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var reports = utilities_1.readFile("2024/002/Part_1/input.txt");
var safeCounter = 0;
for (var _i = 0, reports_1 = reports; _i < reports_1.length; _i++) {
    var report = reports_1[_i];
    var levels = report.split(" ");
    var levelNumbers = levels.map(function (record) { return parseInt(record); });
    var safe = true;
    safe = checkIncreasingOrDecreasing(levelNumbers);
    if (safe) {
        safe = checkDegrees(levelNumbers);
    }
    if (safe) {
        safeCounter++;
    }
}
console.log(safeCounter);
function checkIncreasingOrDecreasing(levels) {
    var isIncreasing;
    if (levels[0] < levels[1]) {
        isIncreasing = true;
    }
    else if (levels[0] > levels[1]) {
        isIncreasing = false;
    }
    else {
        //console.log(levels)
        //console.log("REJECTED - Not Increasing or Decreasing in first position")
        return false;
    }
    for (var i = 1; i < levels.length - 1; i++) {
        if (levels[i] < levels[i + 1]) {
            if (!isIncreasing) {
                //console.log(levels)
                //console.log("REJECTED - Increasing at positon " + i)
                return false;
            }
        }
        else if (levels[i] > levels[i + 1]) {
            if (isIncreasing) {
                //console.log(levels)
                //console.log("REJECTED - Decreasing at positon " + i)
                return false;
            }
        }
        else {
            //console.log(levels)
            //console.log("REJECTED - Not Increasing or Decreasing in position " + i)
            return false;
        }
    }
    return true;
}
function checkDegrees(levels) {
    for (var i = 0; i < levels.length - 1; i++) {
        if (Math.abs(levels[i] - levels[i + 1]) > 3) {
            //console.log(levels)
            //console.log("REJECTED - Value too large between " + levels[i] + " and " + levels[i+1])
            return false;
        }
    }
    return true;
}
