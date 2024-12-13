"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var Region = /** @class */ (function () {
    function Region(coord, value) {
        this.nodes = new utilities_1.Set(function (coord) { return coord.toString(); });
        this.value = value;
        this.perimeter = checkNeighbor(this.nodes, coord, this.value);
        // console.log("Region " + value + " - Area: " + this.getArea() + ", Perimeter: " + this.getPerimeter() + " - " + this.nodes.values())
    }
    Region.prototype.getArea = function () {
        return this.nodes.values().length;
    };
    Region.prototype.getPerimeter = function () {
        return this.perimeter;
    };
    return Region;
}());
var FILEPATH = "2024/012/Part_1/input.txt";
var rows = utilities_1.readFile(FILEPATH);
var grid = utilities_1.toMatrix(rows);
var checkGrid = new utilities_1.Set(function (coord) { return coord.toString(); });
var records = [];
var id = 0;
for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
        var currentCoord = new utilities_1.Coord(row, col);
        if (!checkGrid.has(currentCoord)) {
            var region = new Region(currentCoord, grid[row][col]);
            checkGrid.addAll(__spreadArrays(region.nodes.values()));
            records.push(region);
            id++;
        }
    }
}
var total = 0;
records.forEach(function (region) {
    total += (region.getArea() * region.getPerimeter());
});
console.log(total);
function checkNeighbor(output, coord, value) {
    var total = 0;
    if (grid[coord.row][coord.col] === value) {
        if (!output.has(coord)) {
            output.add(coord);
            if (coord.row - 1 >= 0) {
                total += checkNeighbor(output, new utilities_1.Coord(coord.row - 1, coord.col), value);
            }
            else {
                total += 1;
            }
            if (coord.row + 1 < grid.length) {
                total += checkNeighbor(output, new utilities_1.Coord(coord.row + 1, coord.col), value);
            }
            else {
                total += 1;
            }
            if (coord.col - 1 >= 0) {
                total += checkNeighbor(output, new utilities_1.Coord(coord.row, coord.col - 1), value);
            }
            else {
                total += 1;
            }
            if (coord.col + 1 < grid[coord.row].length) {
                total += checkNeighbor(output, new utilities_1.Coord(coord.row, coord.col + 1), value);
            }
            else {
                total += 1;
            }
        }
    }
    else {
        total += 1;
    }
    return total;
}
