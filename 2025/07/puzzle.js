"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
var BeamHousing = /** @class */ (function () {
    function BeamHousing(key) {
        this.value = 0;
        this.key = key;
    }
    BeamHousing.prototype.add = function (key, amount) {
        this.value += amount;
    };
    BeamHousing.prototype.clear = function (key) {
        this.value = 0;
    };
    return BeamHousing;
}());
function part1(input) {
    var activeBeams = new Set();
    var total = 0;
    var matrix = (0, utilities_1.toMatrix)(input);
    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
        var line = matrix_1[_i];
        for (var i = 0; i < line.length; i++) {
            if (line[i] === "S") {
                activeBeams.add(i);
            }
            if (line[i] === "^") {
                if (activeBeams.has(i)) {
                    activeBeams.add(i - 1);
                    activeBeams.add(i + 1);
                    activeBeams.delete(i);
                    total += 1;
                }
            }
        }
    }
    return total;
}
function part2(input) {
    var matrix = (0, utilities_1.toMatrix)(input);
    var active = {};
    for (var i = 0; i < matrix[0].length; i++) {
        active[i] = 0;
    }
    for (var _i = 0, matrix_2 = matrix; _i < matrix_2.length; _i++) {
        var line = matrix_2[_i];
        for (var i = 0; i < line.length; i++) {
            if (line[i] === "S") {
                active[i] = 1;
            }
            if (line[i] === "^") {
                active[i - 1] += active[i];
                active[i + 1] += active[i];
                active[i] = 0;
            }
        }
    }
    var total = 0;
    Object.values(active).forEach(function (value) {
        total += value;
    });
    return total;
}
// console.log(part1(readFile('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
