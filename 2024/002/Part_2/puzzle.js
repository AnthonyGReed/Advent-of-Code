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
var FILENAME = "2024/002/Part_2/input.txt";
var Record = /** @class */ (function () {
    function Record(data) {
        this.data = data;
        this.safe = true;
        this.checkDegree();
        if (this.safe) {
            this.checkIncreasingOrDecreasing();
        }
    }
    Record.prototype.checkIncreasingOrDecreasing = function () {
        if (this.data[0] < this.data[1]) {
            this.increasing = true;
        }
        else {
            this.increasing = false;
        }
        for (var i = 1; i < this.data.length - 1; i++) {
            if (this.data[i] > this.data[i + 1]) {
                if (this.increasing) {
                    this.safe = false;
                }
            }
            else {
                if (!this.increasing) {
                    this.safe = false;
                }
            }
        }
    };
    Record.prototype.checkDegree = function () {
        for (var i = 0; i < this.data.length; i++) {
            var value = Math.abs(this.data[i] - this.data[i + 1]);
            if (value < 1 || value > 3) {
                this.safe = false;
            }
        }
    };
    return Record;
}());
var reports = utilities_1.readFile(FILENAME);
var safeCounter = 0;
for (var _i = 0, reports_1 = reports; _i < reports_1.length; _i++) {
    var report = reports_1[_i];
    var levels = report.split(" ");
    var levelNumbers = levels.map(function (record) { return parseInt(record); });
    var record = new Record(levelNumbers);
    if (record.safe) {
        safeCounter++;
    }
    else {
        for (var i = 0; i < record.data.length; i++) {
            var data = __spreadArrays(record.data);
            data.splice(i, 1);
            var newRecord = new Record(data);
            if (newRecord.safe) {
                safeCounter++;
                break;
            }
        }
    }
}
console.log(safeCounter);
