import { Coord, readFile, Set, toMatrix } from "../../Utilities/utilities"

class Region {
    nodes: Set<Coord>
    sides: number
    value: string

    constructor(coord: Coord, value: string) {
        this.nodes = new Set<Coord>((coord) => coord.toString())
        getRegionNodes(this.nodes, coord, value)
        this.value = value
        let sum = 0
        this.nodes.values().forEach((node) => sum += checkForCorner(this.nodes, node))
        this.sides = sum
    }

    getArea() {
        return this.nodes.values().length
    }

    getSides() {
        return this.sides
    }
}

const FILEPATH = "2024/012/Part_2/input.txt"

const rows: string[] = readFile(FILEPATH)
const grid: string[][] = toMatrix(rows)

const checkGrid: Set<Coord> = new Set<Coord>((coord) => coord.toString()) 
let cornerChecked: Set<Coord> = new Set<Coord>((coord) => coord.toString())
const records: Region[] = []
let id = 0

for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[row].length; col++) {
        const currentCoord = new Coord(row, col)
        if(!checkGrid.has(currentCoord)) {
            cornerChecked = new Set<Coord>((coord) => coord.toString())
            const region: Region = new Region(currentCoord, grid[row][col])
            checkGrid.addAll([...region.nodes.values()])
            records.push(region)
            id++
        }
    }
}

let total = 0
records.forEach((region) => {
    total += (region.getArea() * region.getSides())
})
console.log(total)

function getRegionNodes(region: Set<Coord>, coord: Coord, value: string): void {
    if(grid[coord.row][coord.col] === value) {
        if(!region.has(coord)) {
            region.add(coord)
            if(coord.row - 1 >= 0) {
                getRegionNodes(region, new Coord(coord.row - 1, coord.col), value)
            }
            if(coord.row + 1 < grid.length) {
                getRegionNodes(region, new Coord(coord.row + 1, coord.col), value)
            }
            if(coord.col - 1 >= 0) {
                getRegionNodes(region, new Coord(coord.row, coord.col - 1), value)
            }
            if(coord.col + 1 < grid[coord.row].length) {
                getRegionNodes(region, new Coord(coord.row, coord.col + 1), value)
            }
        }
    }
}

function checkForCorner(region: Set<Coord>, coord: Coord): number {
    let output: number = 0
    if(!cornerChecked.has(coord)) {
        cornerChecked.add(coord)
        let up: boolean = false
        let down: boolean = false
        let left: boolean = false
        let right: boolean = false
        let upRight: boolean = false
        let downRight: boolean = false
        let upLeft: boolean = false
        let downLeft: boolean = false
        if(coord.row - 1 >= 0) {
            up = region.has(new Coord(coord.row - 1, coord.col))
        }
        if(coord.row + 1 < grid.length) {
            down = region.has(new Coord(coord.row + 1, coord.col))
        }
        if(coord.col - 1 >= 0) {
            left = region.has(new Coord(coord.row, coord.col - 1))
        }
        if(coord.col + 1 < grid[coord.row].length) {
            right = region.has(new Coord(coord.row, coord.col + 1))
        }
        if(coord.row - 1 >= 0 && coord.col + 1 < grid[coord.row].length) {
            upRight = region.has(new Coord(coord.row - 1, coord.col + 1))
        }
        if(coord.row - 1 >= 0 && coord.col - 1 >= 0) {
            upLeft = region.has(new Coord(coord.row - 1, coord.col - 1))
        }
        if(coord.row + 1 < grid.length && coord.col + 1 < grid[coord.row].length) {
            downRight = region.has(new Coord(coord.row + 1, coord.col + 1))
        }
        if(coord.row + 1 < grid.length && coord.col - 1 >= 0) {
            downLeft = region.has(new Coord(coord.row + 1, coord.col - 1))
        }
        if(!right && !down) { output += 1 }
        if(!left && !down) { output += 1 }
        if(!up && !left) { output += 1 }
        if(!up && !right) { output += 1 }
        if(right && down && !downRight) { output += 1 }
        if(left && down && !downLeft) { output += 1 }
        if(up && right && !upRight) { output += 1 }
        if(up && left && !upLeft) { output += 1 }
    }
    return output
}