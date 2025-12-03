"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var total = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var line = input_1[_i];
        var largestCharacter = void 0;
        var largetstIndex = void 0;
        for (var i = 0; i < line.length - 1; i++) {
            if (!largestCharacter || line[i] > largestCharacter) {
                largestCharacter = line[i];
                largetstIndex = i;
            }
        }
        var secondCharacter = void 0;
        var secondIndex = void 0;
        for (var i = largetstIndex + 1; i < line.length; i++) {
            if (!secondCharacter || line[i] > secondCharacter) {
                secondCharacter = line[i];
                secondIndex = i;
            }
        }
        total += parseInt(largestCharacter + secondCharacter);
    }
    return total;
}
function part2(input) {
    var total = 0;
    var lineSize = 12;
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var line = input_2[_i];
        var currentOffset = lineSize;
        var currentIndex = 0;
        var fullString = "";
        while (currentOffset > 0) {
            currentOffset--;
            var character = void 0;
            var index = void 0;
            for (var i = currentIndex; i < line.length - currentOffset; i++) {
                if (!character || line[i] > character) {
                    character = line[i];
                    index = i;
                }
            }
            fullString += character;
            currentIndex = index + 1;
        }
        total += parseInt(fullString);
    }
    return total;
}
console.log(part1((0, utilities_1.readFile)('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
