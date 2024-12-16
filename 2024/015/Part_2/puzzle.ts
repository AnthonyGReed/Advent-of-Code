import { Set, Coord, readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/015/Part_2/input.txt"
const GRIDFILEPATH = "2024/015/Part_2/grid.txt"
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
    private position: Coord[]
    private type: Types

    constructor(coords: Coord[], type: Types) {
        this.position = coords
        this.type = type
    }

    getPosition(): Coord[] {
        return this.position
    }

    getType(): Types {
        return this.type
    }

    move(direction: Direction, grid: Node[]): void {
        let newLocation: Coord[] = []
        switch(direction) {
            case Direction.UP: {
                for(let pos of this.position) {
                    newLocation.push(new Coord(pos.row - 1, pos.col))
                }
                break
            }
            case Direction.DOWN: {
                for(let pos of this.position) {
                    newLocation.push(new Coord(pos.row + 1, pos.col))
                }
                break
            }
            case Direction.LEFT: {
                for(let pos of this.position) {
                    newLocation.push(new Coord(pos.row, pos.col - 1))
                }
                break
            }
            case Direction.RIGHT: {
                for(let pos of this.position) {
                    newLocation.push(new Coord(pos.row, pos.col + 1))
                }
                break    
            }
        }
        if(newLocation.length > 0) {
            for(let i = 0; i < newLocation.length; i++) {
                let neighbor = grid.find((node) => node.getPosition().some((pos) => pos.equals(newLocation[i])))
                if(neighbor && neighbor != this) {
                    neighbor.move(direction, grid)
                }
            }
            this.position = newLocation
        } else {
            console.log("ERROR - " + direction + " " + this.position.toString())
        }
    }

    abstract canMove(direction: Direction, grid: Node[]): boolean
}

class Wall extends Node {
    constructor(coord: Coord[]) {
        super(coord, Types.WALL)
    }

    canMove(direction: Direction, grid: Node[]): boolean {
        return false
    }
}

class Box extends Node {
    constructor(coord: Coord[]) {
        super(coord, Types.BOX)
    }
    
    canMove(direction: Direction, grid: Node[]): boolean {
        let neighbor: Set<Node> = new Set<Node>((node) => node.getPosition().toString())
        switch(direction) {
            case Direction.UP: {
                //check both boxes above
                let neighbor1 = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row - 1, this.getPosition()[0].col))))
                if(neighbor1) { neighbor.add(neighbor1) }
                let neighbor2 = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[1].row - 1, this.getPosition()[1].col))))
                if(neighbor2) { neighbor.add(neighbor2) } 
                break
            }
            case Direction.DOWN: {
                //check both boxes below
                let neighbor1 = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row + 1, this.getPosition()[0].col))))
                if(neighbor1) { neighbor.add(neighbor1) }
                let neighbor2 = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[1].row + 1, this.getPosition()[1].col))))
                if(neighbor2) { neighbor.add(neighbor2) }
                break
            }
            case Direction.LEFT: {
                //check box to the left of the first box
                let neighbor1 = grid.find((node) => node.getPosition()[node.getPosition().length - 1].equals(new Coord(this.getPosition()[0].row , this.getPosition()[0].col - 1)))
                if(neighbor1) { neighbor.add(neighbor1) }
                break
            }
            case Direction.RIGHT: {
                //check box to the right of the second box
                let neighbor1 = grid.find((node) => node.getPosition()[0].equals(new Coord(this.getPosition()[1].row, this.getPosition()[1].col + 1)))
                if(neighbor1) { neighbor.add(neighbor1)}
                break
            }
        }
        if(neighbor.values().length > 0) {
            let canMove = neighbor.values()[0].canMove(direction, grid)
            if(neighbor.values().length > 1) {
                canMove = canMove && neighbor.values()[1].canMove(direction, grid)
            }
            return canMove
        } else {
            return true
        }
    }
}

class Robot extends Node {
    constructor(coord: Coord[]) {
        super(coord, Types.ROBOT)
    }

    canMove(direction: Direction, grid: Node[]): boolean {
        let neighbor: Node
        switch(direction) {
            case Direction.UP: {
                //check both boxes above position
                neighbor = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row - 1, this.getPosition()[0].col))))
                break
            }
            case Direction.DOWN: {
                //check both boxes below the positions
                neighbor = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row + 1, this.getPosition()[0].col))))
                break
            }
            case Direction.LEFT: {
                //check left of the first position
                neighbor = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row , this.getPosition()[0].col - 1))))
                break
            }
            case Direction.RIGHT: {
                //check right of the second position
                neighbor = grid.find((node) => node.getPosition().some((pos) => pos.equals(new Coord(this.getPosition()[0].row, this.getPosition()[0].col + 1))))
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
                    output.push(new Wall([new Coord(i, 2 * j), new Coord(i, (2 * j) + 1)]))
                    break
                }
                case "O": {
                    output.push(new Box([new Coord(i, 2 * j), new Coord(i, (2 * j) + 1)]))
                    break
                }
                case "@": {
                    output.push(new Robot([new Coord(i, 2 * j)]))
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
            output += (100 * node.getPosition()[0].row) + node.getPosition()[0].col
        }
        if(node.getType() == Types.ROBOT) {
        }
    })
    return(output)
}

main()