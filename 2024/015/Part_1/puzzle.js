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
var FILEPATH = "2024/015/Part_1/input.txt";
var GRIDFILEPATH = "2024/015/Part_1/grid.txt";
var rowCount = 0;
var colCount = 0;
var Direction;
(function (Direction) {
    Direction["UP"] = "^";
    Direction["DOWN"] = "v";
    Direction["LEFT"] = "<";
    Direction["RIGHT"] = ">";
})(Direction || (Direction = {}));
var Types;
(function (Types) {
    Types[Types["WALL"] = 0] = "WALL";
    Types[Types["BOX"] = 1] = "BOX";
    Types[Types["ROBOT"] = 2] = "ROBOT";
})(Types || (Types = {}));
var Node = /** @class */ (function () {
    function Node(coord, type) {
        this.position = coord;
        this.type = type;
    }
    Node.prototype.getPosition = function () {
        return this.position;
    };
    Node.prototype.getType = function () {
        return this.type;
    };
    Node.prototype.move = function (direction, grid) {
        var newLocation;
        switch (direction) {
            case Direction.UP: {
                newLocation = new utilities_1.Coord(this.position.row - 1, this.position.col);
                break;
            }
            case Direction.DOWN: {
                newLocation = new utilities_1.Coord(this.position.row + 1, this.position.col);
                break;
            }
            case Direction.LEFT: {
                newLocation = new utilities_1.Coord(this.position.row, this.position.col - 1);
                break;
            }
            case Direction.RIGHT: {
                newLocation = new utilities_1.Coord(this.position.row, this.position.col + 1);
                break;
            }
        }
        if (newLocation) {
            var neighbor = grid.find(function (node) { return node.getPosition().equals(newLocation); });
            if (neighbor) {
                neighbor.move(direction, grid);
            }
            this.position = newLocation;
        }
        else {
            console.log("ERROR - " + direction + " " + this.position.toString());
        }
    };
    return Node;
}());
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(coord) {
        return _super.call(this, coord, Types.WALL) || this;
    }
    Wall.prototype.canMove = function (direction, grid) {
        return false;
    };
    return Wall;
}(Node));
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box(coord) {
        return _super.call(this, coord, Types.BOX) || this;
    }
    Box.prototype.canMove = function (direction, grid) {
        var _this = this;
        var neighbor;
        switch (direction) {
            case Direction.UP: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row - 1, _this.getPosition().col)); });
                break;
            }
            case Direction.DOWN: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row + 1, _this.getPosition().col)); });
                break;
            }
            case Direction.LEFT: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row, _this.getPosition().col - 1)); });
                break;
            }
            case Direction.RIGHT: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row, _this.getPosition().col + 1)); });
                break;
            }
        }
        if (neighbor) {
            return neighbor.canMove(direction, grid);
        }
        else {
            return true;
        }
    };
    return Box;
}(Node));
var Robot = /** @class */ (function (_super) {
    __extends(Robot, _super);
    function Robot(coord) {
        return _super.call(this, coord, Types.ROBOT) || this;
    }
    Robot.prototype.canMove = function (direction, grid) {
        var _this = this;
        var neighbor;
        switch (direction) {
            case Direction.UP: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row - 1, _this.getPosition().col)); });
                break;
            }
            case Direction.DOWN: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row + 1, _this.getPosition().col)); });
                break;
            }
            case Direction.LEFT: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row, _this.getPosition().col - 1)); });
                break;
            }
            case Direction.RIGHT: {
                neighbor = grid.find(function (node) { return node.getPosition().equals(new utilities_1.Coord(_this.getPosition().row, _this.getPosition().col + 1)); });
                break;
            }
        }
        if (neighbor) {
            return neighbor.canMove(direction, grid);
        }
        else {
            return true;
        }
    };
    return Robot;
}(Node));
var stringToEnumMap = {
    "^": Direction.UP,
    "v": Direction.DOWN,
    "<": Direction.LEFT,
    ">": Direction.RIGHT
};
function getEnumFromString(value) {
    return stringToEnumMap[value];
}
function main() {
    var nodes = buildGrid();
    var instructions = [];
    var data = utilities_1.readFile(FILEPATH);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var datum = data_1[_i];
        instructions.push.apply(instructions, datum.split("").map(getEnumFromString));
    }
    var robot = nodes.find(function (node) { return node.getType() == Types.ROBOT; });
    if (robot) {
        for (var _a = 0, instructions_1 = instructions; _a < instructions_1.length; _a++) {
            var instruction = instructions_1[_a];
            if (robot.canMove(instruction, nodes)) {
                robot.move(instruction, nodes);
            }
        }
    }
    console.log(calculateOutput(nodes));
}
function buildGrid() {
    var output = [];
    var rows = utilities_1.readFile(GRIDFILEPATH);
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split("");
        rowCount = rows.length;
        colCount = rows[i].split("").length;
        for (var j = 0; j < row.length; j++) {
            switch (row[j]) {
                case "#": {
                    output.push(new Wall(new utilities_1.Coord(i, j)));
                    break;
                }
                case "O": {
                    output.push(new Box(new utilities_1.Coord(i, j)));
                    break;
                }
                case "@": {
                    output.push(new Robot(new utilities_1.Coord(i, j)));
                    break;
                }
            }
        }
    }
    return output;
}
function calculateOutput(grid) {
    var output = 0;
    grid.forEach(function (node) {
        if (node.getType() == Types.BOX) {
            output += (100 * node.getPosition().row) + node.getPosition().col;
        }
        if (node.getType() == Types.ROBOT) {
        }
    });
    return (output);
}
main();
