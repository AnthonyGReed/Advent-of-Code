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
        var _this = this;
        this.nodes = new utilities_1.Set(function (coord) { return coord.toString(); });
        getRegionNodes(this.nodes, coord, value);
        this.value = value;
        var sum = 0;
        this.nodes.values().forEach(function (node) { return sum += checkForCorner(_this.nodes, node); });
        this.sides = sum;
        console.log("Region " + value + " - Area: " + this.getArea() + ", Sides: " + this.getSides() + " - " + this.nodes.values());
    }
    Region.prototype.getArea = function () {
        return this.nodes.values().length;
    };
    Region.prototype.getSides = function () {
        return this.sides;
    };
    return Region;
}());
var FILEPATH = "2024/012/Part_2/input.txt";
var rows = utilities_1.readFile(FILEPATH);
var grid = utilities_1.toMatrix(rows);
var checkGrid = new utilities_1.Set(function (coord) { return coord.toString(); });
var cornerChecked = new utilities_1.Set(function (coord) { return coord.toString(); });
var records = [];
var id = 0;
for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
        var currentCoord = new utilities_1.Coord(row, col);
        if (!checkGrid.has(currentCoord)) {
            cornerChecked = new utilities_1.Set(function (coord) { return coord.toString(); });
            var region = new Region(currentCoord, grid[row][col]);
            checkGrid.addAll(__spreadArrays(region.nodes.values()));
            records.push(region);
            id++;
        }
    }
}
var total = 0;
records.forEach(function (region) {
    total += (region.getArea() * region.getSides());
});
console.log(total);
function getRegionNodes(region, coord, value) {
    if (grid[coord.row][coord.col] === value) {
        if (!region.has(coord)) {
            region.add(coord);
            if (coord.row - 1 >= 0) {
                getRegionNodes(region, new utilities_1.Coord(coord.row - 1, coord.col), value);
            }
            if (coord.row + 1 < grid.length) {
                getRegionNodes(region, new utilities_1.Coord(coord.row + 1, coord.col), value);
            }
            if (coord.col - 1 >= 0) {
                getRegionNodes(region, new utilities_1.Coord(coord.row, coord.col - 1), value);
            }
            if (coord.col + 1 < grid[coord.row].length) {
                getRegionNodes(region, new utilities_1.Coord(coord.row, coord.col + 1), value);
            }
        }
    }
}
// function checkNeighbor(region:Set<Coord>, output: Set<Coord>, coord: Coord, value: string): number {
//     let total: number = 0
//     if(region.has(coord)) {
//         if(!output.has(coord)) {
//             output.add(coord)
//             if(coord.row - 1 >= 0) {
//                 total += checkNeighbor(region, output, new Coord(coord.row - 1, coord.col), value)
//             }
//             if(coord.row + 1 < grid.length) {
//                 total += checkNeighbor(region, output, new Coord(coord.row + 1, coord.col), value)
//             }
//             if(coord.col - 1 >= 0) {
//                 total += checkNeighbor(region, output, new Coord(coord.row, coord.col - 1), value)
//             }
//             if(coord.col + 1 < grid[coord.row].length) {
//                 total += checkNeighbor(region, output, new Coord(coord.row, coord.col + 1), value)
//             }
//             total += checkForCorner(region, coord)
//         }
//     }
//     return total
// }
function checkForCorner(region, coord) {
    var output = 0;
    if (!cornerChecked.has(coord)) {
        cornerChecked.add(coord);
        var up = false;
        var down = false;
        var left = false;
        var right = false;
        var upRight = false;
        var downRight = false;
        var upLeft = false;
        var downLeft = false;
        if (coord.row - 1 >= 0) {
            up = region.has(new utilities_1.Coord(coord.row - 1, coord.col));
        }
        if (coord.row + 1 < grid.length) {
            down = region.has(new utilities_1.Coord(coord.row + 1, coord.col));
        }
        if (coord.col - 1 >= 0) {
            left = region.has(new utilities_1.Coord(coord.row, coord.col - 1));
        }
        if (coord.col + 1 < grid[coord.row].length) {
            right = region.has(new utilities_1.Coord(coord.row, coord.col + 1));
        }
        if (coord.row - 1 >= 0 && coord.col + 1 < grid[coord.row].length) {
            upRight = region.has(new utilities_1.Coord(coord.row - 1, coord.col + 1));
        }
        if (coord.row - 1 >= 0 && coord.col - 1 >= 0) {
            upLeft = region.has(new utilities_1.Coord(coord.row - 1, coord.col - 1));
        }
        if (coord.row + 1 < grid.length && coord.col + 1 < grid[coord.row].length) {
            downRight = region.has(new utilities_1.Coord(coord.row + 1, coord.col + 1));
        }
        if (coord.row + 1 < grid.length && coord.col - 1 >= 0) {
            downLeft = region.has(new utilities_1.Coord(coord.row + 1, coord.col - 1));
        }
        if (!right && !down) {
            output += 1;
        }
        if (!left && !down) {
            output += 1;
        }
        if (!up && !left) {
            output += 1;
        }
        if (!up && !right) {
            output += 1;
        }
        if (right && down && !downRight) {
            output += 1;
        }
        if (left && down && !downLeft) {
            output += 1;
        }
        if (up && right && !upRight) {
            output += 1;
        }
        if (up && left && !upLeft) {
            output += 1;
        }
    }
    return output;
}
