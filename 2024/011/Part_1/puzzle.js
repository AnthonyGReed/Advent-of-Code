"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/011/Part_1/input.txt";
var ITERATIONS = 75;
var total = [];
var stonesToBeAdded = [];
var Stone = /** @class */ (function () {
    function Stone(value) {
        this.value = value;
    }
    Stone.prototype.process = function () {
        if (this.value == 0) {
            // console.log("0 detected, converting to 1")
            this.value = 1;
        }
        else if (this.value.toString().length % 2 == 0) {
            // console.log(this.value + " has a length of " + this.value.toString().length + " and will be split in two to " + this.value.toString().substring(0, this.value.toString().length/2) + " and " + this.value.toString().substring(this.value.toString().length/2))
            var valueString = this.value.toString();
            this.value = parseInt(valueString.substring(0, valueString.length / 2));
            var newValue = parseInt(valueString.substring(valueString.length / 2));
            stonesToBeAdded.push(new Stone(newValue));
        }
        else {
            // console.log(this.value + " did not meet other rules so it will be multiplied by 2024")
            this.value *= 2024;
        }
    };
    return Stone;
}());
var rows = utilities_1.readFile(FILEPATH);
var inputString = rows[0].split(" ");
for (var _i = 0, inputString_1 = inputString; _i < inputString_1.length; _i++) {
    var input = inputString_1[_i];
    total.push(new Stone(parseInt(input)));
}
for (var i = 0; i < ITERATIONS; i++) {
    // console.log("ITERATION " + i)
    for (var _a = 0, total_1 = total; _a < total_1.length; _a++) {
        var stone = total_1[_a];
        stone.process();
    }
    total.push.apply(total, stonesToBeAdded);
    stonesToBeAdded = [];
}
console.log(total.length);
// console.log(total)
