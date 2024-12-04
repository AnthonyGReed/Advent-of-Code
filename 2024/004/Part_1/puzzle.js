"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILENAME = "2024/004/Part_1/input.txt";
var data = utilities_1.readFile(FILENAME);
var puzzle = utilities_1.toMatrix(data);
var xmasCount = 0;
for (var row = 0; row < puzzle.length; row++) {
    for (var col = 0; col < puzzle[row].length; col++) {
        if (puzzle[row][col] == "X") {
            if (row >= 3) {
                if (checkUp(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (row < puzzle.length - 3) {
                if (checkDown(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (col >= 3) {
                if (checkLeft(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (col < puzzle[row].length - 3) {
                if (checkRight(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (row >= 3 && col >= 3) {
                if (checkUpLeft(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (row >= 3 && col < puzzle[row].length - 3) {
                if (checkUpRight(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (row < puzzle.length - 3 && col >= 3) {
                if (checkDownLeft(puzzle, row, col)) {
                    xmasCount++;
                }
            }
            if (row < puzzle.length - 3 && col < puzzle[row].length - 3) {
                if (checkDownRight(puzzle, row, col)) {
                    xmasCount++;
                }
            }
        }
    }
}
console.log(xmasCount);
function checkUp(puzzle, row, col) {
    return (puzzle[row - 1][col] == "M" && puzzle[row - 2][col] == "A" && puzzle[row - 3][col] == "S");
}
function checkDown(puzzle, row, col) {
    return (puzzle[row + 1][col] == "M" && puzzle[row + 2][col] == "A" && puzzle[row + 3][col] == "S");
}
function checkLeft(puzzle, row, col) {
    return (puzzle[row][col - 1] == "M" && puzzle[row][col - 2] == "A" && puzzle[row][col - 3] == "S");
}
function checkRight(puzzle, row, col) {
    return (puzzle[row][col + 1] == "M" && puzzle[row][col + 2] == "A" && puzzle[row][col + 3] == "S");
}
function checkUpLeft(puzzle, row, col) {
    return (puzzle[row - 1][col - 1] == "M" && puzzle[row - 2][col - 2] == "A" && puzzle[row - 3][col - 3] == "S");
}
function checkUpRight(puzzle, row, col) {
    return (puzzle[row - 1][col + 1] == "M" && puzzle[row - 2][col + 2] == "A" && puzzle[row - 3][col + 3] == "S");
}
function checkDownLeft(puzzle, row, col) {
    return (puzzle[row + 1][col - 1] == "M" && puzzle[row + 2][col - 2] == "A" && puzzle[row + 3][col - 3] == "S");
}
function checkDownRight(puzzle, row, col) {
    console.log(row + ", " + col);
    return (puzzle[row + 1][col + 1] == "M" && puzzle[row + 2][col + 2] == "A" && puzzle[row + 3][col + 3] == "S");
}
