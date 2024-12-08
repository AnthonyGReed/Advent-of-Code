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
var FILEPATH = "2024/007/Part_1/input.txt";
var Operations;
(function (Operations) {
    Operations[Operations["ADD"] = 0] = "ADD";
    Operations[Operations["MULT"] = 1] = "MULT";
})(Operations || (Operations = {}));
var rows = utilities_1.readFile(FILEPATH);
var solved = 0;
for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
    var row = rows_1[_i];
    var data = row.split(": ");
    var target = parseInt(data[0]);
    var equation = data[1].split(" ").map(function (datum) { return parseInt(datum); });
    var operationList = generatePermutations([Operations.ADD, Operations.MULT], equation.length - 1);
    for (var _a = 0, operationList_1 = operationList; _a < operationList_1.length; _a++) {
        var operationProgram = operationList_1[_a];
        var total = equation[0];
        for (var i = 0; i < operationProgram.length; i++) {
            if (operationProgram[i] == Operations.ADD) {
                total = addTerm(total, equation[i + 1]);
            }
            else if (operationProgram[i] == Operations.MULT) {
                total = multTerm(total, equation[i + 1]);
            }
        }
        if (total == target) {
            solved += target;
            break;
        }
    }
}
console.log(solved);
function addTerm(total, term) {
    return total + term;
}
function multTerm(total, term) {
    return total * term;
}
function generatePermutations(options, slots) {
    var result = [];
    function helper(current) {
        if (current.length === slots) {
            result.push(__spreadArrays(current)); // Push a copy of the current permutation
            return;
        }
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            current.push(option); // Add the option to the current permutation
            helper(current); // Recur with the updated permutation
            current.pop(); // Backtrack by removing the last option
        }
    }
    helper([]); // Start the recursive process
    return result;
}
