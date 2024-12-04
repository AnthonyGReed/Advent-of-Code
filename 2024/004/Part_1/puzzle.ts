import { readFile, toMatrix } from "../../Utilities/utilities"

const FILENAME = "2024/004/Part_1/input.txt"

const data = readFile(FILENAME)
const puzzle: string[][] = toMatrix(data)
let xmasCount: number = 0
for(let row = 0; row < puzzle.length; row++) {
    for(let col = 0; col < puzzle[row].length; col++) {
        if(puzzle[row][col] == "X") {
            if(row >= 3) {
                if(checkUp(puzzle, row, col)) { xmasCount++ }
            }
            if(row < puzzle.length - 3) {
                if(checkDown(puzzle, row, col)) { xmasCount++ }
            }
            if(col >= 3) {
                if(checkLeft(puzzle, row, col)) { xmasCount++ }
            }
            if(col < puzzle[row].length - 3) {
                if(checkRight(puzzle, row, col)) { xmasCount++ }
            }
            if(row >= 3 && col >= 3) {
                if(checkUpLeft(puzzle, row, col) ) { xmasCount++ }
            }
            if(row >= 3 && col < puzzle[row].length - 3) {
                if(checkUpRight(puzzle, row, col) ) { xmasCount++ }
            }
            if(row < puzzle.length - 3 && col >= 3) {
                if(checkDownLeft(puzzle, row, col) ) { xmasCount++ }
            }
            if(row < puzzle.length - 3 && col < puzzle[row].length - 3) {
                if(checkDownRight(puzzle, row, col) ) { xmasCount++ }
            }
        }
    }
}
console.log(xmasCount)

function checkUp(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row - 1][col] == "M" && puzzle[row - 2][col] == "A" && puzzle[row - 3][col] == "S")
}
function checkDown(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row + 1][col] == "M" && puzzle[row + 2][col] == "A" && puzzle[row + 3][col] == "S")
}
function checkLeft(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row][col - 1] == "M" && puzzle[row][col - 2] == "A" && puzzle[row][col - 3] == "S")
}
function checkRight(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row][col + 1] == "M" && puzzle[row][col + 2] == "A" && puzzle[row][col + 3] == "S")
}
function checkUpLeft(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row - 1][col - 1] == "M" && puzzle[row - 2][col - 2] == "A" && puzzle[row - 3][col - 3] == "S")
}
function checkUpRight(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row - 1][col + 1] == "M" && puzzle[row - 2][col + 2] == "A" && puzzle[row - 3][col + 3] == "S")
}
function checkDownLeft(puzzle: string[][], row: number, col: number): boolean {
    return (puzzle[row + 1][col - 1] == "M" && puzzle[row + 2][col - 2] == "A" && puzzle[row + 3][col - 3] == "S")
}
function checkDownRight(puzzle: string[][], row: number, col: number): boolean {
    console.log(row + ", " + col)
    return (puzzle[row + 1][col + 1] == "M" && puzzle[row + 2][col + 2] == "A" && puzzle[row + 3][col + 3] == "S")
}