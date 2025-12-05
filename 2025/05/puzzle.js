"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var total = 0;
    var splitIndex = input.findIndex(function (line) { return line === ''; });
    var rangeLines = input.slice(0, splitIndex);
    var idLines = input.slice(splitIndex + 1).map(function (line) { return parseInt(line); });
    var ranges = rangeLines.map(function (line) {
        var _a = line.split('-').map(function (numStr) { return parseInt(numStr); }), start = _a[0], end = _a[1];
        return [start, end];
    });
    for (var _i = 0, idLines_1 = idLines; _i < idLines_1.length; _i++) {
        var id = idLines_1[_i];
        var isFresh = false;
        for (var _a = 0, ranges_1 = ranges; _a < ranges_1.length; _a++) {
            var range = ranges_1[_a];
            if (id >= range[0] && id <= range[1]) {
                isFresh = true;
            }
        }
        if (isFresh) {
            total++;
        }
    }
    return total;
}
function part2(input) {
    var total = 0;
    var splitIndex = input.findIndex(function (line) { return line === ''; });
    var rangeLines = input.slice(0, splitIndex);
    var ranges = rangeLines.map(function (line) {
        var _a = line.split('-').map(function (numStr) { return parseInt(numStr); }), start = _a[0], end = _a[1];
        return [start, end];
    });
    ranges.sort(function (_a, _b) {
        var start = _a[0], end = _a[1];
        var compareStart = _b[0], compareEnd = _b[1];
        return start - compareStart;
    });
    for (var i = 0; i < ranges.length; i++) {
        var _a = ranges[i], start = _a[0], end = _a[1];
        if (i < ranges.length - 1) {
            var _b = ranges[i + 1], compareStart = _b[0], compareEnd = _b[1];
            if (end >= compareStart) {
                ranges[i + 1][0] = Math.min(start, compareStart);
                ranges[i + 1][1] = Math.max(end, compareEnd);
            }
            else {
                total += end - start + 1;
            }
        }
        else {
            total += end - start + 1;
        }
    }
    return total;
}
// console.log(part1(readFile('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
