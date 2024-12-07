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
var FILEPATH = "2024/006/Part_1/input.txt";
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));
var Guard = /** @class */ (function () {
    function Guard(startingCoord) {
        this.direction = Direction.UP;
        this.location = startingCoord;
    }
    Guard.prototype.turnRight = function () {
        if (this.direction < 3) {
            this.direction++;
        }
        else {
            this.direction = Direction.UP;
        }
    };
    Guard.prototype.getCurrentLocation = function () {
        return this.location;
    };
    Guard.prototype.getNextLocation = function () {
        if (this.direction == Direction.UP) {
            return new utilities_1.Coord((this.location.row - 1), this.location.col);
        }
        else if (this.direction == Direction.DOWN) {
            return new utilities_1.Coord((this.location.row + 1), this.location.col);
        }
        else if (this.direction == Direction.RIGHT) {
            return new utilities_1.Coord(this.location.row, (this.location.col + 1));
        }
        else {
            return new utilities_1.Coord(this.location.row, (this.location.col - 1));
        }
    };
    Guard.prototype.move = function () {
        if (this.direction === Direction.UP) {
            this.location.row--;
        }
        else if (this.direction === Direction.DOWN) {
            this.location.row++;
        }
        else if (this.direction === Direction.RIGHT) {
            this.location.col++;
        }
        else if (this.direction === Direction.LEFT) {
            this.location.col--;
        }
    };
    Guard.prototype.getDirection = function () {
        return this.direction;
    };
    return Guard;
}());
var Node = /** @class */ (function () {
    function Node(location) {
        this.location = location;
    }
    Node.prototype.getCurrentLocation = function () {
        return this.location;
    };
    return Node;
}());
var NodeSet = /** @class */ (function () {
    function NodeSet(getKey) {
        this.items = [];
        this.getKey = getKey;
    }
    NodeSet.prototype.add = function (item) {
        var _this = this;
        var key = this.getKey(item);
        if (!this.items.some(function (existing) { return _this.getKey(existing) === key; })) {
            this.items.push(item);
        }
    };
    NodeSet.prototype.has = function (item) {
        var _this = this;
        return this.items.some(function (existing) { return _this.getKey(existing) === _this.getKey(item); });
    };
    NodeSet.prototype.values = function () {
        return __spreadArrays(this.items);
    };
    return NodeSet;
}());
var objectNodes = [];
var guard;
var input = utilities_1.readFile(FILEPATH);
for (var rowIndex = 0; rowIndex < input.length; rowIndex++) {
    var rowData = input[rowIndex].split("");
    for (var colIndex = 0; colIndex < rowData.length; colIndex++) {
        if (rowData[colIndex] == "#") {
            objectNodes.push(new Node(new utilities_1.Coord(rowIndex, colIndex)));
        }
        if (rowData[colIndex] == "^") {
            guard = new Guard(new utilities_1.Coord(rowIndex, colIndex));
        }
    }
}
var reachedEnd = false;
var stepSet = new NodeSet(function (node) { return node.getCurrentLocation().toString(); });
while (!reachedEnd) {
    var pathClear = (checkGuardPath(guard, objectNodes));
    if (pathClear) {
        stepSet.add(new Node(new utilities_1.Coord(guard.getCurrentLocation().row, guard.getCurrentLocation().col)));
        guard.move();
        if (guard.getCurrentLocation().row >= input.length || guard.getCurrentLocation().row < 0 || guard.getCurrentLocation().col >= input[0].length || guard.getCurrentLocation().col < 0) {
            reachedEnd = true;
        }
    }
    else {
        guard.turnRight();
    }
}
console.log(stepSet.values().length);
function checkGuardPath(guard, objectNodes) {
    if (objectNodes.find(function (node) { return node.getCurrentLocation().equals(guard.getNextLocation()); })) {
        return false;
    }
    return true;
}
