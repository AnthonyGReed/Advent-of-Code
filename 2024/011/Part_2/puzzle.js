"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/011/Part_2/input.txt";
var ITERATIONS = 75;
var stones = {};
for (var _i = 0, _a = utilities_1.readFile(FILEPATH)[0].split(" "); _i < _a.length; _i++) {
    var stone = _a[_i];
    addStone(stones, stone);
}
var result = process(stones);
console.log(Object.values(result).reduce(function (total, value) { return total + value; }, 0));
function addStone(stoneMap, etching, value) {
    if (value === void 0) { value = 1; }
    if (!stoneMap[etching]) {
        stoneMap[etching] = 0;
    }
    stoneMap[etching] += value;
}
function process(stoneMap) {
    var stoneBox = __assign({}, stoneMap);
    var iterations = 0;
    while (iterations < ITERATIONS) {
        stoneBox = Object.entries(stoneBox).reduce(function (total, _a) {
            var key = _a[0], count = _a[1];
            if (key == "0") {
                addStone(total, "1", count);
            }
            else if (key.length % 2 == 0) {
                addStone(total, key.slice(0, key.length / 2), count);
                addStone(total, key.slice(key.length / 2), count);
            }
            else {
                addStone(total, (parseInt(key) * 2024).toString(), count);
            }
            return total;
        }, {});
        iterations++;
    }
    return stoneBox;
}
