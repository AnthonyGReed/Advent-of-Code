"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var total = 0;
    var position = 50;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var line = input_1[_i];
        var direction = line[0];
        var value = parseInt(line.slice(1), 10);
        switch (direction) {
            case 'R':
                position += value;
                break;
            case 'L':
                position -= value;
                break;
        }
        position %= 100;
        if (position == 0) {
            total++;
        }
    }
    return total;
}
function part2(input) {
    var total = 0;
    var position = 50;
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var line = input_2[_i];
        var direction = line[0];
        var value = parseInt(line.slice(1), 10);
        total += Math.trunc(value / 100);
        switch (direction) {
            case 'R':
                if (position + ((0, utilities_1.mod)(value, 100)) > 100) {
                    total++;
                }
                position += value;
                break;
            case 'L':
                if (position != 0 && position - ((0, utilities_1.mod)(value, 100)) < 0) {
                    total++;
                }
                position -= value;
                break;
        }
        position = (0, utilities_1.mod)(position, 100);
        if (position == 0) {
            total++;
        }
    }
    return total;
}
console.log(part1((0, utilities_1.readFile)('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
