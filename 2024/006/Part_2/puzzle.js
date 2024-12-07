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
var FILEPATH = "2024/006/Part_2/input.txt";
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
        this.turnedFromDown = false;
        this.turnedFromUp = false;
        this.turnedFromRight = false;
        this.turnedFromLeft = false;
    }
    Node.prototype.getCurrentLocation = function () {
        return this.location;
    };
    Node.prototype.turn = function (direction) {
        switch (direction) {
            case Direction.UP: {
                this.turnedFromUp = true;
                break;
            }
            case Direction.RIGHT: {
                this.turnedFromRight = true;
                break;
            }
            case Direction.DOWN: {
                this.turnedFromDown = true;
                break;
            }
            case Direction.LEFT: {
                this.turnedFromLeft = true;
            }
        }
    };
    Node.prototype.directionCheck = function (direction) {
        switch (direction) {
            case Direction.UP: {
                return this.turnedFromUp;
            }
            case Direction.RIGHT: {
                return this.turnedFromRight;
            }
            case Direction.DOWN: {
                return this.turnedFromDown;
            }
            default: {
                return this.turnedFromLeft;
            }
        }
    };
    return Node;
}());
var objectNodes = [];
var guard;
var guardStartingPosition;
var input = utilities_1.readFile(FILEPATH);
for (var rowIndex = 0; rowIndex < input.length; rowIndex++) {
    var rowData = input[rowIndex].split("");
    for (var colIndex = 0; colIndex < rowData.length; colIndex++) {
        if (rowData[colIndex] == "#") {
            objectNodes.push(new Node(new utilities_1.Coord(rowIndex, colIndex)));
        }
        if (rowData[colIndex] == "^") {
            guard = new Guard(new utilities_1.Coord(rowIndex, colIndex));
            guardStartingPosition = new utilities_1.Coord(rowIndex, colIndex);
        }
    }
}
var successfulLoops = 0;
var _loop_1 = function (row) {
    var _loop_2 = function (col) {
        guard = new Guard(new utilities_1.Coord(guardStartingPosition.row, guardStartingPosition.col));
        // console.log("Starting with guard in position " + guardStartingPosition!)
        var reachedEnd = false;
        var addedObjectNodes = __spreadArrays(objectNodes);
        if (objectNodes.some(function (node) { return node.getCurrentLocation().equals(new utilities_1.Coord(row, col)); }) || guardStartingPosition.equals(new utilities_1.Coord(row, col))) {
            return "continue";
        }
        else {
            addedObjectNodes.push(new Node(new utilities_1.Coord(row, col)));
        }
        var previousTurns = [];
        while (!reachedEnd) {
            var pathClear = (checkGuardPath(guard, addedObjectNodes));
            if (pathClear) {
                guard.move();
                if (guard.getCurrentLocation().row >= input.length || guard.getCurrentLocation().row < 0 || guard.getCurrentLocation().col >= input[0].length || guard.getCurrentLocation().col < 0) {
                    reachedEnd = true;
                }
            }
            else {
                // console.log("Obsturction found at " + guard!.getNextLocation().toString())
                // console.log("Turning to the right form " + guard!.getDirection())
                if (previousTurns.some(function (node) { return node.directionCheck(guard.getDirection()) && node.getCurrentLocation().equals(new utilities_1.Coord(guard.getCurrentLocation().row, guard.getCurrentLocation().col)); })) {
                    successfulLoops++;
                    // console.log("Loop found!")
                    // console.log(guard!.getCurrentLocation())
                    reachedEnd = true;
                }
                else {
                    var node = new Node(new utilities_1.Coord(guard.getCurrentLocation().row, guard.getCurrentLocation().col));
                    // console.log("adding location to previousTurns")
                    node.turn(guard.getDirection());
                    previousTurns.push(node);
                    // console.log(previousTurns)
                    guard.turnRight();
                }
            }
        }
    };
    for (var col = 0; col < input[row].length; col++) {
        _loop_2(col);
    }
};
for (var row = 0; row < input.length; row++) {
    _loop_1(row);
}
console.log(successfulLoops);
function checkGuardPath(guard, objectNodes) {
    if (objectNodes.find(function (node) { return node.getCurrentLocation().equals(guard.getNextLocation()); })) {
        return false;
    }
    return true;
}
