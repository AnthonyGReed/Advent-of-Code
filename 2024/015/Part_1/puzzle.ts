import { nodeModuleNameResolver } from "typescript"
import { Coord, readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/015/Part_1/input.txt"
const GRIDFILEPATH = "2024/015/Part_1/grid.txt"
let rowCount = 0
let colCount = 0

enum Direction {
    UP = "^",
    DOWN = "v",
    LEFT = "<",
    RIGHT = ">"
}

enum Types {
    WALL,
    BOX,
    ROBOT
}

abstract class Node {
    private position: Coord
    private type: Types

    constructor(coord: Coord, type: Types) {
        this.position = coord
        this.type = type
    }

    getPosition(): Coord {
        return this.position
    }

    getType(): Types {
        return this.type
    }

    move(direction: Direction, grid: Node[]): void {
        let newLocation: Coord
        switch(direction) {
            case Direction.UP: {
                newLocation = new Coord(this.position.row - 1, this.position.col)
                break
            }
            case Direction.DOWN: {
                newLocation = new Coord(this.position.row + 1, this.position.col)
                break
            }
            case Direction.LEFT: {
                newLocation = new Coord(this.position.row, this.position.col - 1)
                break
            }
            case Direction.RIGHT: {
                newLocation = new Coord(this.position.row, this.position.col + 1)
                break    
            }
        }
        if(newLocation) {
            let neighbor = grid.find((node) => node.getPosition().equals(newLocation))
            if(neighbor) {
                neighbor.move(direction, grid)
            }
            this.position = newLocation
        } else {
            console.log("ERROR - " + direction + " " + this.position.toString())
        }
    }

    abstract canMove(direction: Direction, grid: Node[]): boolean
}

class Wall extends Node {
    constructor(coord: Coord) {
        super(coord, Types.WALL)
    }

    canMove(direction: Direction, grid: Node[]): boolean {
        return false
    }
}

class Box extends Node {
    constructor(coord: Coord) {
        super(coord, Types.BOX)
    }
    
    canMove(direction: Direction, grid: Node[]): boolean {
        let neighbor: Node
        switch(direction) {
            case Direction.UP: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row - 1, this.getPosition().col)))
                break
            }
            case Direction.DOWN: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row + 1, this.getPosition().col)))
                break
            }
            case Direction.LEFT: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row , this.getPosition().col - 1)))
                break
            }
            case Direction.RIGHT: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row, this.getPosition().col + 1)))
                break
            }
        }
        if(neighbor) {
            return neighbor.canMove(direction, grid)
        } else {
            return true
        }
    }
}

class Robot extends Node {
    constructor(coord: Coord) {
        super(coord, Types.ROBOT)
    }

    canMove(direction: Direction, grid: Node[]): boolean {
        let neighbor: Node
        switch(direction) {
            case Direction.UP: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row - 1, this.getPosition().col)))
                break
            }
            case Direction.DOWN: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row + 1, this.getPosition().col)))
                break
            }
            case Direction.LEFT: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row , this.getPosition().col - 1)))
                break
            }
            case Direction.RIGHT: {
                neighbor = grid.find((node) => node.getPosition().equals(new Coord(this.getPosition().row, this.getPosition().col + 1)))
                break
            }
        }
        if(neighbor) {
            return neighbor.canMove(direction, grid)
        } else {
            return true
        }
    }
}

const stringToEnumMap: Record<string, Direction> = {
    "^": Direction.UP,
    "v": Direction.DOWN,
    "<": Direction.LEFT,
    ">": Direction.RIGHT
}

function getEnumFromString(value: string): Direction | undefined {
    return stringToEnumMap[value]
}

function main() {
    const nodes: Node[] = buildGrid()
    const instructions: Direction[] = []
    const data = readFile(FILEPATH)
    for(const datum of data) {
        instructions.push(...datum.split("").map(getEnumFromString))
    }
    const robot = nodes.find((node) => node.getType() == Types.ROBOT)
    if(robot) {
        for(const instruction of instructions) {
            if(robot.canMove(instruction, nodes)) {
                robot.move(instruction, nodes)
            }
        }
    }
    console.log(calculateOutput(nodes))
}

function buildGrid(): Node[] {
    const output: Node[] = []
    const rows: string[] = readFile(GRIDFILEPATH)
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i].split("")
        rowCount = rows.length
        colCount = rows[i].split("").length
        for(let j = 0; j < row.length; j++) {
            switch(row[j]) {
                case "#": {
                    output.push(new Wall(new Coord(i, j)))
                    break
                }
                case "O": {
                    output.push(new Box(new Coord(i, j)))
                    break
                }
                case "@": {
                    output.push(new Robot(new Coord(i, j)))
                    break
                }
            }
        }

    }
    return output
}

function  calculateOutput(grid: Node[]): number {
    let output = 0
    grid.forEach((node) => {
        if(node.getType() == Types.BOX) {
            output += (100 * node.getPosition().row) + node.getPosition().col
        }
        if(node.getType() == Types.ROBOT) {
        }
    })
    return(output)
}

main()