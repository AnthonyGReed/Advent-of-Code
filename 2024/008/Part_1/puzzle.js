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
var FILEPATH = "2024/008/Part_1/input.txt";
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
var coordSet = new utilities_1.Set(function (coord) { return coord.toString(); });
for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var workingArray = hash.get(key);
    for (var i = 0; i < workingArray.length; i++) {
        for (var j = 0; j < workingArray.length; j++) {
            if (workingArray[i] !== workingArray[j]) {
                var sortedArray = sortArray(workingArray[i], workingArray[j]);
                var xDifference = sortedArray[1].row - sortedArray[0].row;
                var yDifference = sortedArray[1].col - sortedArray[0].col;
                if ((sortedArray[0].row - xDifference >= 0 && sortedArray[0].row - xDifference < rows.length) &&
                    (sortedArray[0].col - yDifference >= 0 && sortedArray[0].col - yDifference < rows[0].length)) {
                    // console.log("- " + new Coord(sortedArray[0].row - xDifference, sortedArray[0].col- yDifference).toString() + " - " + workingArray[i].toString() + " and " + workingArray[j].toString() + ", smaller: " + sortedArray[0].toString())
                    coordSet.add(new utilities_1.Coord(sortedArray[0].row - xDifference, sortedArray[0].col - yDifference));
                }
                if ((sortedArray[1].row + xDifference >= 0 && sortedArray[1].row + xDifference < rows.length) &&
                    (sortedArray[1].col + yDifference >= 0 && sortedArray[1].col + yDifference < rows[0].length)) {
                    // console.log("2x! " + new Coord(sortedArray[1].row + xDifference, sortedArray[1].col + yDifference).toString() + " - " + workingArray[i].toString() + " and " + workingArray[j].toString() + ", larger " + sortedArray[1])
                    coordSet.add(new utilities_1.Coord(sortedArray[1].row + xDifference, sortedArray[1].col + yDifference));
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
