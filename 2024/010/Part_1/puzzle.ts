import { readFile, toMatrix, Coord, Set } from "../../Utilities/utilities"

const FILEPATH = "2024/010/Part_1/input.txt"

const rows = readFile(FILEPATH)
const matrix = toMatrix(rows)
const trailheads: Coord[] = []
for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
        if(parseInt(matrix[i][j]) == 0) {
            trailheads.push(new Coord(i, j))
        }
    }
}
let total: number = 0
for(const trailhead of trailheads) {
    const values = checkNextStep(0, trailhead)
    total += values.values().length
}
console.log(total)

function checkNextStep(elevation: number, location: Coord): Set<Coord> {
    const completedRoutes: Set<Coord> = new Set<Coord>((coord) => coord.toString())
    if(parseInt(matrix[location.row][location.col]) == elevation) {
        if(parseInt(matrix[location.row][location.col]) == 9) {
            completedRoutes.add(new Coord(location.row, location.col))            
        } else {
            if(location.row - 1 >= 0) {
                const north: Set<Coord> = checkNextStep(elevation + 1, new Coord(location.row - 1, location.col) )
                for(const value of north.values()) {
                    completedRoutes.add(value)
                }
            }
            if(location.row + 1 <= matrix.length - 1) {
                const south: Set<Coord> = checkNextStep(elevation + 1, new Coord(location.row + 1, location.col) )
                for(const value of south.values()) {
                    completedRoutes.add(value)
                }
            }
            if(location.col + 1 <= matrix[location.row].length - 1) {
                const east: Set<Coord> = checkNextStep(elevation + 1, new Coord(location.row, location.col + 1))
                for(const value of east.values()) {
                    completedRoutes.add(value)
                }
            }
            if(location.col - 1 >= 0) {
                const west: Set<Coord> = checkNextStep(elevation + 1, new Coord(location.row, location.col - 1))
                for(const value of west.values()) {
                    completedRoutes.add(value)
                }
            }
        }
    }
    return completedRoutes
}