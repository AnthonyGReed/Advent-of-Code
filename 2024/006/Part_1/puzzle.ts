import { Coord, readFile, toMatrix } from "../../Utilities/utilities"

const FILEPATH = "2024/006/Part_1/input.txt"

enum Direction {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
}


class Guard {
    private direction: Direction
    private location: Coord

    constructor(startingCoord: Coord) {
        this.direction = Direction.UP
        this.location = startingCoord
    }

    turnRight() {
        if(this.direction < 3) {
            this.direction++
        } else {
            this.direction = Direction.UP
        }
    }

    getCurrentLocation(): Coord {
        return this.location
    }

    getNextLocation(): Coord {
        if(this.direction == Direction.UP) {
            return new Coord((this.location.row - 1), this.location.col)
        } else if (this.direction == Direction.DOWN) {
            return new Coord((this.location.row + 1), this.location.col)
        } else if (this.direction == Direction.RIGHT) {
            return new Coord(this.location.row, (this.location.col + 1))
        } else {
            return new Coord(this.location.row, (this.location.col - 1))
        }
    }

    move(): void {
        if(this.direction === Direction.UP) {
            this.location.row--
        } else if (this.direction === Direction.DOWN) {
            this.location.row++
        } else if(this.direction === Direction.RIGHT) {
            this.location.col++
        } else if (this.direction === Direction.LEFT) {
            this.location.col--
        }
    }

    getDirection(): Direction {
        return this.direction
    }
}

class Node {
    private location: Coord

    constructor(location: Coord) {
        this.location = location
    }

    getCurrentLocation() {
        return this.location
    }
}

class NodeSet<T> {
    private items: T[] = [];
    private getKey: (item: T) => string;

    constructor(getKey: (item: T) => string) {
        this.getKey = getKey
    }

    add(item: T): void {
        const key = this.getKey(item);
        if(!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
        }
    }

    has(item: T): boolean {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item))
    }

    values(): T[] {
        return [...this.items];
    }
}

let objectNodes: Node[] = []
let guard: Guard

const input: string[] = readFile(FILEPATH)
for(let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    let rowData = input[rowIndex].split("")
    for(let colIndex = 0; colIndex < rowData.length; colIndex++) {
        if(rowData[colIndex] == "#") {
            objectNodes.push(new Node(new Coord(rowIndex, colIndex)))
        }
        if(rowData[colIndex] == "^") {
            guard = new Guard(new Coord(rowIndex, colIndex))
        }
    }
}

let reachedEnd: boolean = false
let stepSet = new NodeSet<Node>(node => node.getCurrentLocation().toString())

while(!reachedEnd) {
    const pathClear: boolean = (checkGuardPath(guard!, objectNodes))
    if(pathClear) {
        stepSet.add(new Node(new Coord(guard!.getCurrentLocation().row, guard!.getCurrentLocation().col)))
        guard!.move()
        if(guard!.getCurrentLocation().row >= input.length || guard!.getCurrentLocation().row < 0 || guard!.getCurrentLocation().col >= input[0].length || guard!.getCurrentLocation().col < 0) {
            reachedEnd = true;
        }
    } else {
        guard!.turnRight()
    }
}
console.log(stepSet.values().length)


function checkGuardPath(guard: Guard, objectNodes: Node[]): boolean {
    if(objectNodes.find((node) => node.getCurrentLocation().equals(guard.getNextLocation()))) {
        return false
    }
    return true
}