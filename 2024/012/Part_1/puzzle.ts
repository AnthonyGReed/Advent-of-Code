import { Coord, readFile, Set, toMatrix } from "../../Utilities/utilities"

class Region {
    nodes: Set<Coord>
    perimeter: number
    value: string

    constructor(coord: Coord, value: string) {
        this.nodes = new Set<Coord>((coord) => coord.toString())
        this.value = value
        this.perimeter = checkNeighbor(this.nodes, coord, this.value)
    }

    getArea() {
        return this.nodes.values().length
    }

    getPerimeter() {
        return this.perimeter
    }
}

const FILEPATH = "2024/012/Part_1/input.txt"

const rows: string[] = readFile(FILEPATH)
const grid: string[][] = toMatrix(rows)

const checkGrid: Set<Coord> = new Set<Coord>((coord) => coord.toString()) 
const records: Region[] = []
let id = 0

for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[row].length; col++) {
        const currentCoord = new Coord(row, col)
        if(!checkGrid.has(currentCoord)) {
            const region: Region = new Region(currentCoord, grid[row][col])
            checkGrid.addAll([...region.nodes.values()])
            records.push(region)
            id++
        }
    }
}
let total = 0
records.forEach((region) => {
    total += (region.getArea() * region.getPerimeter())
})
console.log(total)

function checkNeighbor(output: Set<Coord>, coord: Coord, value: string): number {
    let total = 0
    if(grid[coord.row][coord.col] === value) {
        if(!output.has(coord)) {
            output.add(coord)
            if(coord.row - 1 >= 0) {
                total += checkNeighbor(output, new Coord(coord.row - 1, coord.col), value)
            } else {
                total += 1
            }
            if(coord.row + 1 < grid.length) {
                total += checkNeighbor(output, new Coord(coord.row + 1, coord.col), value)
            } else {
                total += 1
            }
            if(coord.col - 1 >= 0) {
                total += checkNeighbor(output, new Coord(coord.row, coord.col - 1), value)
            } else {
                total += 1
            }
            if(coord.col + 1 < grid[coord.row].length) {
                total += checkNeighbor(output, new Coord(coord.row, coord.col + 1), value)
            } else {
                total += 1
            }
        }
    } else {
        total += 1
    }
    return total
}