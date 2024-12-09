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
var FILEPATH = "2024/009/Part_1/input.txt";
var Blank = /** @class */ (function () {
    function Blank(location) {
        this.location = location;
    }
    Blank.prototype.changeLocation = function (location) {
        this.location = location;
    };
    Blank.prototype.getLocation = function () {
        return this.location;
    };
    return Blank;
}());
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(location, id) {
        var _this = _super.call(this, location) || this;
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
        for (var j = 0; j < parseInt(row[i]); j++) {
            console.log("adding " + i / 2 + " to location " + location + " in files");
            files.push(new File(location, i / 2));
            location++;
        }
    }
    else {
        for (var j = 0; j < parseInt(row[i]); j++) {
            console.log("adding blank to location " + location + " in blanks");
            blanks.push(new Blank(location));
            location++;
        }
    }
}
for (var i = files.length - 1; blanks.length > 0; i--) {
    var blank = blanks.shift();
    if (files[i].getLocation() < blank.getLocation()) {
        break;
    }
    console.log('moving ' + files[i].getLocation() + " to " + blank.getLocation());
    files[i].changeLocation(blank.getLocation());
}
var total = 0;
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    total += file.getId() * file.getLocation();
}
console.log(total);
