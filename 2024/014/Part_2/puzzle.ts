import { Coord, readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/014/Part_2/input.txt"
const MAX_ROWS = 103
const MAX_COLS = 101
const ITERATIONS = MAX_ROWS * MAX_COLS

class Robot {
    private position: Coord
    private velocity: Coord

    constructor(position: Coord, velocity: Coord) {
        this.position = position
        this.velocity = velocity
    }

    getPosition(): Coord {
        return this.position
    }

    getVelocity(): Coord {
        return this.velocity
    }

    move(): void {
        let coord = new Coord(this.position.row + this.velocity.row, this.position.col + this.velocity.col)
        if(coord.row < 0) { coord.row = coord.row + MAX_ROWS}
        if(coord.row >= MAX_ROWS) { coord.row = coord.row - MAX_ROWS}
        if(coord.col < 0) { coord.col = coord.col + MAX_COLS}
        if(coord.col >= MAX_COLS) { coord.col = coord.col - MAX_COLS}
        this.position = coord
    }

    getQuadrant(): number {
        if(this.position.row < Math.floor(MAX_ROWS / 2) && this.position.col < Math.floor(MAX_COLS / 2)) { return 1 }
        if(this.position.row < Math.floor(MAX_ROWS / 2) && this.position.col > Math.floor(MAX_COLS / 2)) { return 2 }
        if(this.position.row > Math.floor(MAX_ROWS / 2) && this.position.col < Math.floor(MAX_COLS / 2)) { return 3 }
        if(this.position.row > Math.floor(MAX_ROWS / 2) && this.position.col > Math.floor(MAX_COLS / 2)) { return 4 }
        return 0
    }
}

const rows = readFile(FILEPATH)
const robots: Robot[] = []

for(const row of rows) {
    
    const data: string[] = row.split(" ")
    const pData: string[] = data[0].split("=")[1].split(",")
    const vData: string[] = data[1].split("=")[1].split(",")
    const figures: number[] = []
    pData.forEach((datum) => figures.push(parseInt(datum)))
    vData.forEach((datum) => figures.push(parseInt(datum)))
    robots.push(new Robot(new Coord((figures[1]), (figures[0])), new Coord((figures[3]), (figures[2]))))
}

let totalSafety = 0
for(let i = 0; i < ITERATIONS; i++) {
    for(const robot of robots) {
        robot.move()
    }
    const safety = calculateSafety(robots)
    totalSafety += safety
    //I don't know if this would work for everyone, but this displays only one iteration, the correct one.
    //I definetly dialed this in over time ha ha
    if(safety <= (totalSafety / (4* (i+1)))) {
        printScreen(i, robots)
    }
}

function printScreen(iteration: number, robots: Robot[]) {
    console.log("Iteraion: " + (iteration + 1))
    for(let row = 0; row < MAX_ROWS; row++) {
        let rowOutput:string = ""
        for(let col = 0; col < MAX_COLS; col++) {
            if(robots.some((robot) => robot.getPosition().row == row && robot.getPosition().col == col)) {
                rowOutput += "X"
            } else {
                rowOutput += " "
            }
        }
        console.log(rowOutput)
    }
}

function calculateSafety(robots: Robot[]): number {
    let quad1 = 0
    let quad2 = 0
    let quad3 = 0
    let quad4 = 0
    for(const robot of robots) {
        if(robot.getQuadrant() == 1) { quad1++ }
        if(robot.getQuadrant() == 2) { quad2++ }
        if(robot.getQuadrant() == 3) { quad3++ }
        if(robot.getQuadrant() == 4) { quad4++ }
    }
    return quad1 * quad2 * quad3 * quad4
}