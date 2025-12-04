"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var matrix = (0, utilities_1.toMatrix)(input);
    var total = 0;
    for (var row in matrix) {
        for (var col in matrix[row]) {
            if (matrix[row][col] === '@') {
                var blockers = 0;
                blockers = checkAllAround(parseInt(row), parseInt(col), matrix);
                if (blockers < 4) {
                    total++;
                }
            }
        }
    }
    return total;
}
function part2(input) {
    var matrix = (0, utilities_1.toMatrix)(input);
    var total = 0;
    var noneRemoved = false;
    while (!noneRemoved) {
        var numberRemoved = 0;
        for (var row in matrix) {
            for (var col in matrix[row]) {
                if (matrix[row][col] === '@') {
                    var blockers = 0;
                    blockers = checkAllAround(parseInt(row), parseInt(col), matrix);
                    if (blockers < 4) {
                        total++;
                        matrix[row][col] = '.';
                        numberRemoved++;
                    }
                }
            }
        }
        if (numberRemoved === 0) {
            noneRemoved = true;
        }
    }
    return total;
}
function checkAllAround(row, col, matrix) {
    var output = 0;
    var directions = [];
    if (row > 0) {
        if (col > 0)
            directions.push([row - 1, col - 1]);
        if (col < matrix[row].length - 1)
            directions.push([row - 1, col + 1]);
        directions.push([row - 1, col]);
    }
    if (row < matrix.length - 1) {
        if (col > 0)
            directions.push([row + 1, col - 1]);
        if (col < matrix[row].length - 1)
            directions.push([row + 1, col + 1]);
        directions.push([row + 1, col]);
    }
    if (col > 0)
        directions.push([row, col - 1]);
    if (col < matrix[row].length - 1)
        directions.push([row, col + 1]);
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var direction = directions_1[_i];
        if (matrix[direction[0]][direction[1]] === '@') {
            output++;
        }
    }
    return output;
}
console.log(part1((0, utilities_1.readFile)('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
