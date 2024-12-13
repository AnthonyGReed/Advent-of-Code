"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/013/Part_1/input.txt";
var Coord = /** @class */ (function () {
    function Coord(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Coord.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Coord.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Coord.prototype.toString = function () {
        return "(" + this._x + ", " + this._y + ")";
    };
    Coord.prototype.equals = function (coord) {
        return coord.x === this.x && coord.y === this.y;
    };
    return Coord;
}());
var Machine = /** @class */ (function () {
    function Machine(a, b, prize) {
        this.a = a;
        this.b = b;
        this.prize = prize;
    }
    return Machine;
}());
var rows = utilities_1.readFile(FILEPATH);
var machines = [];
for (var i = 0; i < rows.length; i += 4) {
    var buttonAInstructions = rows[i].split(":")[1].split(",");
    var buttonBInstructions = rows[i + 1].split(":")[1].split(",");
    var prizeLocations = rows[i + 2].split(":")[1].split(",");
    var buttonA = new Coord(parseInt(buttonAInstructions[0].split("+")[1]), parseInt(buttonAInstructions[1].split("+")[1]));
    var buttonB = new Coord(parseInt(buttonBInstructions[0].split("+")[1]), parseInt(buttonBInstructions[1].split("+")[1]));
    var prize = new Coord(parseInt(prizeLocations[0].split("=")[1]), parseInt(prizeLocations[1].split("=")[1]));
    var machine = new Machine(buttonA, buttonB, prize);
    machines.push(machine);
}
var total = 0;
for (var _i = 0, machines_1 = machines; _i < machines_1.length; _i++) {
    var machine = machines_1[_i];
    var aCount = ((machine.prize.x * machine.b.y) + (machine.prize.y * (-1 * machine.b.x))) / ((machine.a.x * machine.b.y) + (machine.a.y * (-1 * machine.b.x)));
    var bCount = ((machine.prize.x - (machine.a.x * aCount)) / machine.b.x);
    if ((machine.a.y * aCount) + (machine.b.y * bCount) == machine.prize.y && Number.isInteger(aCount)) {
        total += (aCount * 3) + bCount;
    }
}
console.log(total);
