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
var FILEPATH = "2024/008/Part_2/input.txt";
var hashMap = /** @class */ (function () {
    function hashMap() {
        this.data = new Map();
    }
    hashMap.prototype.add = function (key, coord) {
        if (this.data.has(key)) {
            this.data.set(key, __spreadArrays(this.data.get(key), [coord]));
        }
        else {
            this.data.set(key, [coord]);
        }
    };
    hashMap.prototype.get = function (key) {
        return this.data.get(key);
    };
    hashMap.prototype.getAllKeys = function () {
        var output = [];
        this.data.forEach(function (value, key) {
            output.push(key);
        });
        return output;
    };
    return hashMap;
}());
var rows = utilities_1.readFile(FILEPATH);
var hash = new hashMap();
for (var i = 0; i < rows.length; i++) {
    var data = rows[i].split("");
    for (var j = 0; j < rows[i].length; j++) {
        if (data[j] != ".") {
            hash.add(data[j], new utilities_1.Coord(i, j));
        }
    }
}
var keys = hash.getAllKeys();
for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    // console.log(key + " -> " + hash.get(key))
}
var coordSet = new utilities_1.Set(function (coord) { return coord.toString(); });
for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
    var key = keys_2[_a];
    var workingArray = hash.get(key);
    for (var i = 0; i < workingArray.length; i++) {
        for (var j = 0; j < workingArray.length; j++) {
            if (workingArray[i] !== workingArray[j]) {
                var sortedArray = sortArray(workingArray[i], workingArray[j]);
                var smallestCoord = new utilities_1.Coord(sortedArray[0].row, sortedArray[0].col);
                var largestCoord = new utilities_1.Coord(sortedArray[1].row, sortedArray[1].col);
                // console.log(smallestCoord.toString() + " - " + largestCoord.toString())
                var xDifference = largestCoord.row - smallestCoord.row;
                var yDifference = largestCoord.col - smallestCoord.col;
                while (smallestCoord.row < rows.length && smallestCoord.row >= 0 && smallestCoord.col >= 0 && smallestCoord.col < rows[0].length) {
                    coordSet.add(new utilities_1.Coord(smallestCoord.row, smallestCoord.col));
                    // console.log(smallestCoord.toString() + " added, subtracting " + xDifference + " from row and " + yDifference + " from col" )
                    smallestCoord.row -= xDifference;
                    smallestCoord.col -= yDifference;
                }
                while (largestCoord.row < rows.length && largestCoord.row >= 0 && largestCoord.col >= 0 && largestCoord.col < rows[0].length) {
                    coordSet.add(new utilities_1.Coord(largestCoord.row, largestCoord.col));
                    // console.log(largestCoord.toString() + " added, adding " + xDifference + " to row and " + yDifference + " to col")
                    largestCoord.row += xDifference;
                    largestCoord.col += yDifference;
                }
            }
        }
    }
}
// console.log(coordSet.values().sort((a, b) => a.row - b.row))
console.log(coordSet.values().length);
function sortArray(coord1, coord2) {
    if (coord1.row < coord2.row) {
        return [coord1, coord2];
    }
    else {
        return [coord2, coord1];
    }
}
