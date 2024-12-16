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
var FILEPATH = "2024/015/Part_2/input.txt";
var GRIDFILEPATH = "2024/015/Part_2/grid.txt";
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
    function Node(coords, type) {
        this.position = coords;
        this.type = type;
    }
    Node.prototype.getPosition = function () {
        return this.position;
    };
    Node.prototype.getType = function () {
        return this.type;
    };
    Node.prototype.move = function (direction, grid) {
        var newLocation = [];
        switch (direction) {
            case Direction.UP: {
                for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    newLocation.push(new utilities_1.Coord(pos.row - 1, pos.col));
                }
                break;
            }
            case Direction.DOWN: {
                for (var _b = 0, _c = this.position; _b < _c.length; _b++) {
                    var pos = _c[_b];
                    newLocation.push(new utilities_1.Coord(pos.row + 1, pos.col));
                }
                break;
            }
            case Direction.LEFT: {
                for (var _d = 0, _e = this.position; _d < _e.length; _d++) {
                    var pos = _e[_d];
                    newLocation.push(new utilities_1.Coord(pos.row, pos.col - 1));
                }
                break;
            }
            case Direction.RIGHT: {
                for (var _f = 0, _g = this.position; _f < _g.length; _f++) {
                    var pos = _g[_f];
                    newLocation.push(new utilities_1.Coord(pos.row, pos.col + 1));
                }
                break;
            }
        }
        if (newLocation.length > 0) {
            var _loop_1 = function (i) {
                var neighbor = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(newLocation[i]); }); });
                if (neighbor && neighbor != this_1) {
                    neighbor.move(direction, grid);
                }
            };
            var this_1 = this;
            for (var i = 0; i < newLocation.length; i++) {
                _loop_1(i);
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
        var neighbor = new utilities_1.Set(function (node) { return node.getPosition().toString(); });
        switch (direction) {
            case Direction.UP: {
                //check both boxes above
                var neighbor1 = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row - 1, _this.getPosition()[0].col)); }); });
                if (neighbor1) {
                    neighbor.add(neighbor1);
                }
                var neighbor2 = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[1].row - 1, _this.getPosition()[1].col)); }); });
                if (neighbor2) {
                    neighbor.add(neighbor2);
                }
                break;
            }
            case Direction.DOWN: {
                //check both boxes below
                var neighbor1 = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row + 1, _this.getPosition()[0].col)); }); });
                if (neighbor1) {
                    neighbor.add(neighbor1);
                }
                var neighbor2 = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[1].row + 1, _this.getPosition()[1].col)); }); });
                if (neighbor2) {
                    neighbor.add(neighbor2);
                }
                break;
            }
            case Direction.LEFT: {
                //check box to the left of the first box
                var neighbor1 = grid.find(function (node) { return node.getPosition()[node.getPosition().length - 1].equals(new utilities_1.Coord(_this.getPosition()[0].row, _this.getPosition()[0].col - 1)); });
                if (neighbor1) {
                    neighbor.add(neighbor1);
                }
                break;
            }
            case Direction.RIGHT: {
                //check box to the right of the second box
                var neighbor1 = grid.find(function (node) { return node.getPosition()[0].equals(new utilities_1.Coord(_this.getPosition()[1].row, _this.getPosition()[1].col + 1)); });
                if (neighbor1) {
                    neighbor.add(neighbor1);
                }
                break;
            }
        }
        if (neighbor.values().length > 0) {
            var canMove = neighbor.values()[0].canMove(direction, grid);
            if (neighbor.values().length > 1) {
                canMove = canMove && neighbor.values()[1].canMove(direction, grid);
            }
            return canMove;
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
                //check both boxes above position
                neighbor = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row - 1, _this.getPosition()[0].col)); }); });
                break;
            }
            case Direction.DOWN: {
                //check both boxes below the positions
                neighbor = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row + 1, _this.getPosition()[0].col)); }); });
                break;
            }
            case Direction.LEFT: {
                //check left of the first position
                neighbor = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row, _this.getPosition()[0].col - 1)); }); });
                break;
            }
            case Direction.RIGHT: {
                //check right of the second position
                neighbor = grid.find(function (node) { return node.getPosition().some(function (pos) { return pos.equals(new utilities_1.Coord(_this.getPosition()[0].row, _this.getPosition()[0].col + 1)); }); });
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
                    output.push(new Wall([new utilities_1.Coord(i, 2 * j), new utilities_1.Coord(i, (2 * j) + 1)]));
                    break;
                }
                case "O": {
                    output.push(new Box([new utilities_1.Coord(i, 2 * j), new utilities_1.Coord(i, (2 * j) + 1)]));
                    break;
                }
                case "@": {
                    output.push(new Robot([new utilities_1.Coord(i, 2 * j)]));
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
            output += (100 * node.getPosition()[0].row) + node.getPosition()[0].col;
        }
        if (node.getType() == Types.ROBOT) {
        }
    });
    return (output);
}
main();
