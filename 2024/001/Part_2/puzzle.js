"use strict";
var _a, _b;
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var Frequency = /** @class */ (function () {
    function Frequency(value) {
        this.value = value;
        this.count = 1;
    }
    Frequency.prototype.getValue = function () {
        return this.value;
    };
    Frequency.prototype.addOne = function () {
        this.count++;
    };
    return Frequency;
}());
var input = utilities_1.readFile("2024/001/Part_2/input.txt");
var leftSide = [];
var rightSide = [];
var rightSideFrequency = [];
for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var row = input_1[_i];
    var tempInput = row.split("   ");
    leftSide.push(parseInt(tempInput[0]));
    rightSide.push(parseInt(tempInput[1]));
}
var output = 0;
var _loop_1 = function (entry) {
    console.log(entry);
    if (rightSideFrequency.some(function (freq) { return freq.getValue() === entry; })) {
        console.log("Found");
        (_a = rightSideFrequency.find(function (freq) { return freq.getValue() === entry; })) === null || _a === void 0 ? void 0 : _a.addOne();
    }
    else {
        console.log("Not found in " + rightSideFrequency + ". adding");
        rightSideFrequency.push(new Frequency(entry));
    }
};
// leftSide.sort()
for (var _c = 0, rightSide_1 = rightSide; _c < rightSide_1.length; _c++) {
    var entry = rightSide_1[_c];
    _loop_1(entry);
}
var _loop_2 = function (i) {
    var left = leftSide[i];
    var right = (_b = rightSideFrequency.find(function (freq) { return freq.getValue() === left; })) === null || _b === void 0 ? void 0 : _b.count;
    if (right) {
        console.log(left + " found " + right + " times");
        output += left * right;
    }
    else {
        console.log("left not found");
        output += 0;
    }
};
for (var i = 0; i < leftSide.length; i++) {
    _loop_2(i);
}
console.log(output);
