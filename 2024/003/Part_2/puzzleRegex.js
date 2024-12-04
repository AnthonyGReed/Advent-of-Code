"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILENAME = "2024/003/Part_2/input.txt";
var REGEX = /(mul\()\d{1,3},\d{1,3}\)|don\'t\(\)|do\(\)/g;
var data = utilities_1.readFile(FILENAME);
var finalValue = 0;
var enabled = true;
var results = [];
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    var tempResults = Array.from(row.matchAll(REGEX));
    for (var _a = 0, tempResults_1 = tempResults; _a < tempResults_1.length; _a++) {
        var result = tempResults_1[_a];
        results.push(result[0]);
    }
}
for (var _b = 0, results_1 = results; _b < results_1.length; _b++) {
    var result = results_1[_b];
    if (result == "do()") {
        enabled = true;
    }
    else if (result == "don't()") {
        enabled = false;
    }
    else if (enabled) {
        var values = result.substring(4, result.length - 1).split(",");
        console.log(values);
        finalValue += Number(values[0]) * Number(values[1]);
    }
}
console.log(finalValue);
