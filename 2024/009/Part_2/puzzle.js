"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/009/Part_2/input.txt";
var Blank = /** @class */ (function () {
    function Blank(start, end) {
        this.locationRangeStart = start;
        this.locationRangeEnd = end;
    }
    Blank.prototype.changeLocation = function (start, end) {
        this.locationRangeStart = start;
        this.locationRangeEnd = end;
    };
    Blank.prototype.getStartLocation = function () {
        return this.locationRangeStart;
    };
    Blank.prototype.getEndLocation = function () {
        return this.locationRangeEnd;
    };
    Blank.prototype.length = function () {
        return this.locationRangeEnd - this.locationRangeStart + 1;
    };
    return Blank;
}());
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(start, end, id) {
        var _this = _super.call(this, start, end) || this;
        _this.id = id;
        return _this;
    }
    File.prototype.getId = function () {
        return this.id;
    };
    return File;
}(Blank));
var row = utilities_1.readFile(FILEPATH)[0].split("");
var files = [];
var blanks = [];
var location = 0;
for (var i = 0; i < row.length; i++) {
    if (i % 2 == 0) {
        files.push(new File(location, location + parseInt(row[i]) - 1, i / 2));
        location += parseInt(row[i]);
    }
    else {
        blanks.push(new Blank(location, location + parseInt(row[i]) - 1));
        location += parseInt(row[i]);
    }
}
for (var i = files.length - 1; i >= 0; i--) {
    for (var _i = 0, blanks_1 = blanks; _i < blanks_1.length; _i++) {
        var blank = blanks_1[_i];
        var toRemove = void 0;
        if (files[i].length() <= blank.length() && files[i].getStartLocation() > blank.getStartLocation()) {
            // console.log(files[i].getId() + ", length " + files[i].length() + ",  found space at " + blank.getStartLocation() + ", length " + blank.length())
            files[i].changeLocation(blank.getStartLocation(), blank.getStartLocation() + files[i].length() - 1);
            blank.changeLocation(blank.getStartLocation() + files[i].length(), blank.getEndLocation());
            // console.log(files[i].getId() + " now at " + files[i].getStartLocation() + ", " + files[i].getEndLocation() + " -- " + files[i].length())
            // console.log("Remaining blank: " + blank.getStartLocation() + ", " + blank.getEndLocation() + " -- " + blank.length())
            if (blank.length() == 0) {
                toRemove = blank;
            }
            break;
        }
        if (toRemove) {
            var index = blanks.indexOf(toRemove);
            if (index !== -1) {
                blanks.splice(index, 1);
            }
        }
    }
    // let blank = blanks.shift()
    // if(files[i].getLocation() < blank.getLocation()) {
    //     break
    // }
    // files[i].changeLocation(blank.getLocation())
}
var total = 0;
files.sort(function (a, b) { return a.getStartLocation() - b.getStartLocation(); });
for (var _a = 0, files_1 = files; _a < files_1.length; _a++) {
    var file = files_1[_a];
    for (var i = file.getStartLocation(); i <= file.getEndLocation(); i++) {
        total += file.getId() * i;
        // console.log(file.getId() + " found at location " + i)
    }
}
console.log(total);
