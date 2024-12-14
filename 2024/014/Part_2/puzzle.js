"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/014/Part_2/input.txt";
var MAX_ROWS = 103;
var MAX_COLS = 101;
var ITERATIONS = MAX_ROWS * MAX_COLS;
var Robot = /** @class */ (function () {
    function Robot(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    Robot.prototype.getPosition = function () {
        return this.position;
    };
    Robot.prototype.getVelocity = function () {
        return this.velocity;
    };
    Robot.prototype.move = function () {
        var coord = new utilities_1.Coord(this.position.row + this.velocity.row, this.position.col + this.velocity.col);
        if (coord.row < 0) {
            coord.row = coord.row + MAX_ROWS;
        }
        if (coord.row >= MAX_ROWS) {
            coord.row = coord.row - MAX_ROWS;
        }
        if (coord.col < 0) {
            coord.col = coord.col + MAX_COLS;
        }
        if (coord.col >= MAX_COLS) {
            coord.col = coord.col - MAX_COLS;
        }
        this.position = coord;
    };
    Robot.prototype.getQuadrant = function () {
        if (this.position.row < Math.floor(MAX_ROWS / 2) && this.position.col < Math.floor(MAX_COLS / 2)) {
            return 1;
        }
        if (this.position.row < Math.floor(MAX_ROWS / 2) && this.position.col > Math.floor(MAX_COLS / 2)) {
            return 2;
        }
        if (this.position.row > Math.floor(MAX_ROWS / 2) && this.position.col < Math.floor(MAX_COLS / 2)) {
            return 3;
        }
        if (this.position.row > Math.floor(MAX_ROWS / 2) && this.position.col > Math.floor(MAX_COLS / 2)) {
            return 4;
        }
        return 0;
    };
    return Robot;
}());
var rows = utilities_1.readFile(FILEPATH);
var robots = [];
var _loop_1 = function (row) {
    var data = row.split(" ");
    var pData = data[0].split("=")[1].split(",");
    var vData = data[1].split("=")[1].split(",");
    var figures = [];
    pData.forEach(function (datum) { return figures.push(parseInt(datum)); });
    vData.forEach(function (datum) { return figures.push(parseInt(datum)); });
    robots.push(new Robot(new utilities_1.Coord((figures[1]), (figures[0])), new utilities_1.Coord((figures[3]), (figures[2]))));
};
for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
    var row = rows_1[_i];
    _loop_1(row);
}
var totalSafety = 0;
for (var i = 0; i < ITERATIONS; i++) {
    for (var _a = 0, robots_1 = robots; _a < robots_1.length; _a++) {
        var robot = robots_1[_a];
        robot.move();
    }
    var safety = calculateSafety(robots);
    totalSafety += safety;
    if (safety <= (totalSafety / (4 * (i + 1)))) {
        printScreen(i, robots);
    }
}
function printScreen(iteration, robots) {
    console.log("Iteraion: " + (iteration + 1));
    var _loop_2 = function (row) {
        var rowOutput = "";
        var _loop_3 = function (col) {
            if (robots.some(function (robot) { return robot.getPosition().row == row && robot.getPosition().col == col; })) {
                rowOutput += "X";
            }
            else {
                rowOutput += " ";
            }
        };
        for (var col = 0; col < MAX_COLS; col++) {
            _loop_3(col);
        }
        console.log(rowOutput);
    };
    for (var row = 0; row < MAX_ROWS; row++) {
        _loop_2(row);
    }
}
function calculateSafety(robots) {
    var quad1 = 0;
    var quad2 = 0;
    var quad3 = 0;
    var quad4 = 0;
    for (var _i = 0, robots_2 = robots; _i < robots_2.length; _i++) {
        var robot = robots_2[_i];
        if (robot.getQuadrant() == 1) {
            quad1++;
        }
        if (robot.getQuadrant() == 2) {
            quad2++;
        }
        if (robot.getQuadrant() == 3) {
            quad3++;
        }
        if (robot.getQuadrant() == 4) {
            quad4++;
        }
    }
    return quad1 * quad2 * quad3 * quad4;
}
