import { readFile, toMatrix } from "../../Utilities/utilities"

const FILENAME = "2024/004/Part_2/input.txt"

const data = readFile(FILENAME)
const puzzle: string[][] = toMatrix(data)
let xmasCount: number = 0
for(let row = 0; row < puzzle.length; row++) {
    for(let col = 0; col < puzzle[row].length; col++) {
        if(puzzle[row][col] == "A") {
            if(row >= 1 && row < puzzle.length - 1 && col >= 1 && col < puzzle[row].length) {
                if(
                    ((puzzle[row - 1][col - 1] == "M" && puzzle[row + 1][col + 1] == "S") ||
                    (puzzle[row - 1][col - 1] == "S" && puzzle[row + 1][col + 1] == "M")) &&
                    ((puzzle[row - 1][col + 1] == "M" && puzzle[row + 1][col - 1] == "S") ||
                    (puzzle[row - 1][col + 1] == "S" && puzzle[row + 1][col - 1] == "M"))
                ) {
                    xmasCount++
                }
            }
        }
    }
}
console.log(xmasCount)