"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILENAME = "2024/004/Part_2/input.txt";
var data = utilities_1.readFile(FILENAME);
var puzzle = utilities_1.toMatrix(data);
var xmasCount = 0;
for (var row = 0; row < puzzle.length; row++) {
    for (var col = 0; col < puzzle[row].length; col++) {
        if (puzzle[row][col] == "A") {
            if (row >= 1 && row < puzzle.length - 1 && col >= 1 && col < puzzle[row].length) {
                if (((puzzle[row - 1][col - 1] == "M" && puzzle[row + 1][col + 1] == "S") ||
                    (puzzle[row - 1][col - 1] == "S" && puzzle[row + 1][col + 1] == "M")) &&
                    ((puzzle[row - 1][col + 1] == "M" && puzzle[row + 1][col - 1] == "S") ||
                        (puzzle[row - 1][col + 1] == "S" && puzzle[row + 1][col - 1] == "M"))) {
                    xmasCount++;
                }
            }
        }
    }
}
console.log(xmasCount);
