import { readFile, toMatrix, Coord, Set } from "../../Utilities/utilities"

const FILEPATH = "2024/010/Part_2/input.txt"

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
    total += checkNextStep(0, trailhead)
}
console.log(total)

function checkNextStep(elevation: number, location: Coord): number {
    let total: number = 0
    if(parseInt(matrix[location.row][location.col]) == elevation) {
        if(parseInt(matrix[location.row][location.col]) == 9) {
            total += 1
        } else {
            if(location.row - 1 >= 0) {
                total += checkNextStep(elevation + 1, new Coord(location.row - 1, location.col) )
            }
            if(location.row + 1 <= matrix.length - 1) {
                total += checkNextStep(elevation + 1, new Coord(location.row + 1, location.col) )
            }
            if(location.col + 1 <= matrix[location.row].length - 1) {
                total += checkNextStep(elevation + 1, new Coord(location.row, location.col + 1))
            }
            if(location.col - 1 >= 0) {
                total += checkNextStep(elevation + 1, new Coord(location.row, location.col - 1))
            }
        }
    }
    return total
}