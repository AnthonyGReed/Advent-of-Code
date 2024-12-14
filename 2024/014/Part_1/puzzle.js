"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILEPATH = "2024/014/Part_1/input.txt";
var MAX_ROWS = 103;
var MAX_COLS = 101;
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
var quad1 = 0;
var quad2 = 0;
var quad3 = 0;
var quad4 = 0;
var total = 0;
var _loop_1 = function (row) {
    var data = row.split(" ");
    var pData = data[0].split("=")[1].split(",");
    var vData = data[1].split("=")[1].split(",");
    var figures = [];
    pData.forEach(function (datum) { return figures.push(parseInt(datum)); });
    vData.forEach(function (datum) { return figures.push(parseInt(datum)); });
    // console.log(figures)
    robots.push(new Robot(new utilities_1.Coord((figures[1]), (figures[0])), new utilities_1.Coord((figures[3]), (figures[2]))));
};
for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
    var row = rows_1[_i];
    _loop_1(row);
}
for (var _a = 0, robots_1 = robots; _a < robots_1.length; _a++) {
    var robot = robots_1[_a];
    for (var i = 0; i < 100; i++) {
        robot.move();
    }
    console.log(robot.getPosition());
    console.log("Going in Quadrant " + robot.getQuadrant());
    var quadrant = robot.getQuadrant();
    if (quadrant == 1) {
        quad1++;
    }
    if (quadrant == 2) {
        quad2++;
    }
    if (quadrant == 3) {
        quad3++;
    }
    if (quadrant == 4) {
        quad4++;
    }
}
total = quad1 * quad2 * quad3 * quad4;
console.log(total);
