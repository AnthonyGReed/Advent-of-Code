"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var input = utilities_1.readFile("2024/001/Part_1/input.txt");
var leftSide = [];
var rightSide = [];
for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var row = input_1[_i];
    var tempInput = row.split("   ");
    leftSide.push(parseInt(tempInput[0]));
    rightSide.push(parseInt(tempInput[1]));
}
var output = 0;
leftSide.sort();
rightSide.sort();
for (var i = 0; i < leftSide.length; i++) {
    var left = leftSide[i];
    var right = rightSide[i];
    console.log(left + " - " + right + " = " + Math.abs(left - right));
    output += Math.abs(left - right);
}
console.log(output);
