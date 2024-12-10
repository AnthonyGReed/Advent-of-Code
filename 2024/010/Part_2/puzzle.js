"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/010/Part_2/input.txt";
var rows = utilities_1.readFile(FILEPATH);
var matrix = utilities_1.toMatrix(rows);
var trailheads = [];
for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
        if (parseInt(matrix[i][j]) == 0) {
            trailheads.push(new utilities_1.Coord(i, j));
        }
    }
}
var total = 0;
for (var _i = 0, trailheads_1 = trailheads; _i < trailheads_1.length; _i++) {
    var trailhead = trailheads_1[_i];
    total += checkNextStep(0, trailhead);
}
console.log(total);
function checkNextStep(elevation, location) {
    var total = 0;
    if (parseInt(matrix[location.row][location.col]) == elevation) {
        if (parseInt(matrix[location.row][location.col]) == 9) {
            total += 1;
        }
        else {
            if (location.row - 1 >= 0) {
                total += checkNextStep(elevation + 1, new utilities_1.Coord(location.row - 1, location.col));
            }
            if (location.row + 1 <= matrix.length - 1) {
                total += checkNextStep(elevation + 1, new utilities_1.Coord(location.row + 1, location.col));
            }
            if (location.col + 1 <= matrix[location.row].length - 1) {
                total += checkNextStep(elevation + 1, new utilities_1.Coord(location.row, location.col + 1));
            }
            if (location.col - 1 >= 0) {
                total += checkNextStep(elevation + 1, new utilities_1.Coord(location.row, location.col - 1));
            }
        }
    }
    return total;
}
