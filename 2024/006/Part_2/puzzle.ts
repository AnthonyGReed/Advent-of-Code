import { Coord, readFile, toMatrix } from "../../Utilities/utilities"

const FILEPATH = "2024/006/Part_2/input.txt"

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
    private turnedFromUp: boolean
    private turnedFromRight: boolean
    private turnedFromLeft: boolean
    private turnedFromDown: boolean

    constructor(location: Coord) {
        this.location = location
        this.turnedFromDown = false
        this.turnedFromUp = false
        this.turnedFromRight = false
        this.turnedFromLeft = false
    }

    getCurrentLocation() {
        return this.location
    }

    turn(direction: Direction) {
        switch(direction) {
            case Direction.UP: {
                this.turnedFromUp = true
                break
            }
            case Direction.RIGHT: {
                this.turnedFromRight = true
                break
            }
            case Direction.DOWN: {
                this.turnedFromDown = true
                break
            }
            case Direction.LEFT: {
                this.turnedFromLeft = true
            }
        }
    }
    
    directionCheck(direction: Direction): boolean {
        switch(direction) {
            case Direction.UP: { return this.turnedFromUp }
            case Direction.RIGHT: { return this.turnedFromRight }
            case Direction.DOWN: { return this.turnedFromDown }
            default: { return this.turnedFromLeft }
        }
    }
}

let objectNodes: Node[] = []
let guard: Guard
let guardStartingPosition: Coord

const input: string[] = readFile(FILEPATH)
for(let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    let rowData = input[rowIndex].split("")
    for(let colIndex = 0; colIndex < rowData.length; colIndex++) {
        if(rowData[colIndex] == "#") {
            objectNodes.push(new Node(new Coord(rowIndex, colIndex)))
        }
        if(rowData[colIndex] == "^") {
            guard = new Guard(new Coord(rowIndex, colIndex))
            guardStartingPosition = new Coord(rowIndex, colIndex)
        }
    }
}

let successfulLoops: number = 0

for(let row = 0; row < input.length; row++) {
    for(let col = 0; col < input[row].length; col++) {
        guard = new Guard(new Coord(guardStartingPosition!.row, guardStartingPosition!.col))
        // console.log("Starting with guard in position " + guardStartingPosition!)
        let reachedEnd: boolean = false
        let addedObjectNodes: Node[] = [...objectNodes]
        if(objectNodes.some((node) => node.getCurrentLocation().equals(new Coord(row, col))) || guardStartingPosition!.equals(new Coord(row, col))) {
            continue
        } else {
            addedObjectNodes.push(new Node(new Coord(row, col)))
        }
        let previousTurns: Node[] = []
        while(!reachedEnd) {
            const pathClear: boolean = (checkGuardPath(guard!, addedObjectNodes))
            if(pathClear) {
                guard!.move()
                if(guard!.getCurrentLocation().row >= input.length || guard!.getCurrentLocation().row < 0 || guard!.getCurrentLocation().col >= input[0].length || guard!.getCurrentLocation().col < 0) {
                    reachedEnd = true;
                }
            } else {
                // console.log("Obsturction found at " + guard!.getNextLocation().toString())
                // console.log("Turning to the right form " + guard!.getDirection())
                if(previousTurns.some((node) => node.directionCheck(guard!.getDirection()) && node.getCurrentLocation().equals(new Coord(guard!.getCurrentLocation().row, guard!.getCurrentLocation().col)))) {
                    successfulLoops++
                    // console.log("Loop found!")
                    // console.log(guard!.getCurrentLocation())
                    reachedEnd = true
                } else {
                    let node = new Node(new Coord(guard!.getCurrentLocation().row, guard!.getCurrentLocation().col))
                    // console.log("adding location to previousTurns")
                    node.turn(guard!.getDirection())
                    previousTurns.push(node)
                    // console.log(previousTurns)
                    guard!.turnRight()
                }
            }
        }
    }
}

console.log(successfulLoops)

function checkGuardPath(guard: Guard, objectNodes: Node[]): boolean {
    if(objectNodes.find((node) => node.getCurrentLocation().equals(guard.getNextLocation()))) {
        return false
    }
    return true
}