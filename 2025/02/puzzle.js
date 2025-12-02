"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var lines = input[0].split(',');
    var value = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = line.split('-').map(Number), start = _a[0], end = _a[1];
        for (var i = start; i <= end; i++) {
            var test = String(i).substring(0, String(i).length / 2);
            if (test === String(i).substring(String(i).length / 2)) {
                value += i;
            }
        }
    }
    return value;
}
function part2(input) {
    var lines = input[0].split(',');
    var value = 0;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        var _a = line.split('-').map(Number), start = _a[0], end = _a[1];
        for (var i = start; i <= end; i++) {
            var checked = false;
            for (var div = 2; div <= String(i).length; div++) {
                if (String(i).length % div === 0 && !checked) {
                    var test = String(i).substring(0, String(i).length / div);
                    var passed = true;
                    for (var check = 1; check < div; check++) {
                        if (test !== String(i).substring(check * (String(i).length / div), (check + 1) * (String(i).length / div))) {
                            passed = false;
                            break;
                        }
                    }
                    if (passed) {
                        // console.log(`Writing value ${i} from ${test} to value for total of ${value + i}`)
                        value += i;
                        checked = true;
                    }
                }
            }
        }
    }
    return value;
}
console.log(part1((0, utilities_1.readFile)('input.txt')));
console.log(part2((0, utilities_1.readFile)('input.txt')));
