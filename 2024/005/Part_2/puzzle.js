"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/005/Part_1/input.txt";
var Node = /** @class */ (function () {
    function Node(id) {
        this.before = [];
        this.after = [];
        this.id = id;
        this.priority = 0;
    }
    Node.prototype.addBefore = function (node) {
        this.before.push(node);
    };
    Node.prototype.addAfter = function (node) {
        this.after.push(node);
    };
    Node.prototype.getAllBefore = function () {
        return this.before;
    };
    Node.prototype.getAllAfter = function () {
        return this.after;
    };
    return Node;
}());
var NodeLibrary = /** @class */ (function () {
    function NodeLibrary() {
        this.library = [];
    }
    NodeLibrary.prototype.get = function (node) {
        var output = this.library.find(function (info) { return info.id === node; });
        if (output) {
            return output;
        }
        else {
            var newNode = new Node(node);
            this.library.push(newNode);
            return newNode;
        }
    };
    return NodeLibrary;
}());
var nodeLibrary = new NodeLibrary();
var puzzle = utilities_1.readFile(FILEPATH);
var totalValue = 0;
var rules = true;
for (var _i = 0, puzzle_1 = puzzle; _i < puzzle_1.length; _i++) {
    var row = puzzle_1[_i];
    if (row.length == 0) {
        rules = false;
        continue;
    }
    if (rules == true) {
        var instructions = row.split("|");
        var before = nodeLibrary.get(parseInt(instructions[0]));
        var after = nodeLibrary.get(parseInt(instructions[1]));
        before.addAfter(after);
        after.addBefore(before);
    }
    if (rules == false) {
        totalValue += checkNumbers(row);
    }
}
console.log(totalValue);
function checkNumbers(row) {
    var data = row.split(",");
    var countRow = true;
    var numbers = data.map(function (datum) { return parseInt(datum); });
    for (var i = 0; i < numbers.length; i++) {
        var numberNode = nodeLibrary.get(numbers[i]);
        var beforeNodes = numberNode.getAllBefore();
        var afterNodes = numberNode.getAllAfter();
        var _loop_1 = function (j) {
            var result = afterNodes.find(function (node) { return numbers[j] === node.id; });
            if (result) {
                countRow = false;
                return "break";
            }
        };
        for (var j = 0; j < i; j++) {
            var state_1 = _loop_1(j);
            if (state_1 === "break")
                break;
        }
        if (countRow) {
            var _loop_2 = function (j) {
                var result = beforeNodes.find(function (node) { return numbers[j] === node.id; });
                if (result) {
                    countRow = false;
                    return "break";
                }
            };
            for (var j = numbers.length - 1; j > i; j--) {
                var state_2 = _loop_2(j);
                if (state_2 === "break")
                    break;
            }
        }
    }
    if (countRow) {
        return 0;
    }
    else {
        return repairResults(numbers);
    }
}
function repairResults(numbers) {
    var output = [];
    var working = numbers.map(function (id) { return nodeLibrary.get(id); });
    //First pass idea of priority did not work. Need to come up with a new solution to sort the row correctly
    for (var i = 0; i < working.length; i++) {
        var _loop_3 = function (j) {
            if (working[i].getAllBefore().find(function (node) { return node.id == working[j].id; })) {
                var tempNode = working[i];
                working[i] = working[j];
                working[j] = tempNode;
                i = j;
            }
        };
        for (var j = 0; j < i; j++) {
            _loop_3(j);
        }
    }
    output = working.map(function (node) { return node.id; });
    return output[Math.floor(output.length / 2)];
}
