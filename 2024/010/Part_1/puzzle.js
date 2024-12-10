"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/010/Part_1/input.txt";
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
    var values = checkNextStep(0, trailhead);
    total += values.values().length;
}
console.log(total);
function checkNextStep(elevation, location) {
    var completedRoutes = new utilities_1.Set(function (coord) { return coord.toString(); });
    if (parseInt(matrix[location.row][location.col]) == elevation) {
        if (parseInt(matrix[location.row][location.col]) == 9) {
            completedRoutes.add(new utilities_1.Coord(location.row, location.col));
        }
        else {
            if (location.row - 1 >= 0) {
                var north = checkNextStep(elevation + 1, new utilities_1.Coord(location.row - 1, location.col));
                for (var _i = 0, _a = north.values(); _i < _a.length; _i++) {
                    var value = _a[_i];
                    completedRoutes.add(value);
                }
            }
            if (location.row + 1 <= matrix.length - 1) {
                var south = checkNextStep(elevation + 1, new utilities_1.Coord(location.row + 1, location.col));
                for (var _b = 0, _c = south.values(); _b < _c.length; _b++) {
                    var value = _c[_b];
                    completedRoutes.add(value);
                }
            }
            if (location.col + 1 <= matrix[location.row].length - 1) {
                var east = checkNextStep(elevation + 1, new utilities_1.Coord(location.row, location.col + 1));
                for (var _d = 0, _e = east.values(); _d < _e.length; _d++) {
                    var value = _e[_d];
                    completedRoutes.add(value);
                }
            }
            if (location.col - 1 >= 0) {
                var west = checkNextStep(elevation + 1, new utilities_1.Coord(location.row, location.col - 1));
                for (var _f = 0, _g = west.values(); _f < _g.length; _f++) {
                    var value = _g[_f];
                    completedRoutes.add(value);
                }
            }
        }
    }
    return completedRoutes;
}
