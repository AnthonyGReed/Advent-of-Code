"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../Utilities/utilities");
function part1(input) {
    var matrix = [];
    var total = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var row = input_1[_i];
        matrix.push(row.split(" "));
    }
    matrix = matrix.map(function (row) { return row.filter(function (cell) { return cell !== ""; }); });
    for (var i = 0; i < matrix[0].length; i++) {
        if (matrix[4][i] === "*") {
            total += (parseInt(matrix[0][i]) * parseInt(matrix[1][i]) * parseInt(matrix[2][i]) * parseInt(matrix[3][i]));
        }
        if (matrix[4][i] === "+") {
            total += (parseInt(matrix[0][i]) + parseInt(matrix[1][i]) + parseInt(matrix[2][i]) + parseInt(matrix[3][i]));
        }
    }
    // implentation for part 1
    return total;
}
function part2(input) {
    var total = 0;
    var problems = [];
    var matrix = (0, utilities_1.toMatrix)(input);
    var newProblem = true;
    var counter = 0;
    for (var i = 0; i < matrix[0].length; i++) {
        var allSpaces = true;
        var value = "";
        for (var j = 0; j < matrix.length - 1; j++) {
            if (matrix[j][i] != " ") {
                allSpaces = false;
                var val = matrix[j][i];
                if (val !== '' && val !== '\r\r\r' && val !== '\n') {
                    value += val;
                }
            }
        }
        if (newProblem) {
            newProblem = false;
            problems.push([matrix[matrix.length - 1][i]]);
        }
        if (allSpaces) {
            counter += 1;
            newProblem = true;
        }
        else {
            problems[counter].push(value);
        }
    }
    for (var _i = 0, problems_1 = problems; _i < problems_1.length; _i++) {
        var problem = problems_1[_i];
        if (problem[0] == '+') {
            var value = 0;
            for (var i = 1; i < problem.length; i++) {
                value += parseInt(problem[i]);
            }
            console.log("Problem set ".concat(problem, " is equal to ").concat(value));
            total += value;
        }
        else if (problem[0] == '*') {
            var value = 0;
            for (var i = 1; i < problem.length; i++) {
                if (value === 0) {
                    value = parseInt(problem[i]);
                }
                else {
                    value *= parseInt(problem[i]);
                }
            }
            console.log("Problem set ".concat(problem, " is equal to ").concat(value));
            total += value;
        }
    }
    return total;
}
console.log(part1((0, utilities_1.readFile)('input.txt')));
//readFile trims the lines and that breaks this puzzle so I won't be able to do do that on this one.
console.log(part2((0, utilities_1.readFileRaw)('input.txt')));
