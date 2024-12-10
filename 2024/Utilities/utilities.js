"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
/**
 * Reads a file and returns its content as an array of strings, where each line is an element in the array.
 * @param fileName - The relative path to the file.
 * @returns A string array where each element is a line from the file.
 */
function readFile(fileName) {
    try {
        // Resolve the file path relative to the current working directory
        var filePath = path.resolve(process.cwd(), fileName);
        // Read the file synchronously and split it into lines
        var content = fs.readFileSync(filePath, 'utf-8');
        return content.split('\n').map(function (line) { return line.trim(); });
    }
    catch (error) {
        console.error("Error reading file at " + fileName + ":", error);
        return [];
    }
}
exports.readFile = readFile;
/**
 * Converts an array of strings into a 2D array of characters.
 * @param input - An array of strings.
 * @returns A 2D string array where each character of the input strings is an element in a sub-array.
 */
function toMatrix(input) {
    return input.map(function (line) { return line.split(''); });
}
exports.toMatrix = toMatrix;
var Coord = /** @class */ (function () {
    function Coord(row, col) {
        this._row = row;
        this._col = col;
    }
    Object.defineProperty(Coord.prototype, "col", {
        get: function () {
            return this._col;
        },
        set: function (value) {
            this._col = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Coord.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (value) {
            this._row = value;
        },
        enumerable: true,
        configurable: true
    });
    Coord.prototype.toString = function () {
        return "(" + this._row + ", " + this._col + ")";
    };
    Coord.prototype.equals = function (coord) {
        return coord.row === this.row && coord.col === this.col;
    };
    return Coord;
}());
exports.Coord = Coord;
var CoordList = /** @class */ (function () {
    function CoordList() {
        this.coords = [];
    }
    /**
     * Adds a Coord to the list.
     * @param coord - The Coord object to add.
     */
    CoordList.prototype.add = function (coord) {
        this.coords.push(coord);
    };
    /**
     * Sorts the list by column values in ascending order.
     */
    CoordList.prototype.sortByCol = function () {
        this.coords.sort(function (a, b) { return a.col - b.col; });
    };
    /**
     * Sorts the list by row values in ascending order.
     */
    CoordList.prototype.sortByRow = function () {
        this.coords.sort(function (a, b) { return a.row - b.row; });
    };
    /**
     * Returns an iterator for the list.
     */
    CoordList.prototype[Symbol.iterator] = function () {
        return this.coords.values();
    };
    /**
     * Converts the list to a string representation.
     * @returns A string in the format [(x, y), (a, b)].
     */
    CoordList.prototype.toString = function () {
        return "[" + this.coords.map(function (coord) { return coord.toString(); }).join(', ') + "]";
    };
    return CoordList;
}());
exports.CoordList = CoordList;
var Set = /** @class */ (function () {
    function Set(getKey) {
        this.items = [];
        this.getKey = getKey;
    }
    Set.prototype.add = function (item) {
        var _this = this;
        var key = this.getKey(item);
        if (!this.items.some(function (existing) { return _this.getKey(existing) === key; })) {
            this.items.push(item);
        }
    };
    Set.prototype.addAll = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.add(item);
        }
    };
    Set.prototype.has = function (item) {
        var _this = this;
        return this.items.some(function (existing) { return _this.getKey(existing) === _this.getKey(item); });
    };
    Set.prototype.values = function () {
        return __spreadArrays(this.items);
    };
    return Set;
}());
exports.Set = Set;
