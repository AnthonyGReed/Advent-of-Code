import { readFile, toMatrix, Coord, CoordList } from "../../Utilities/utilities"

const reports: string[] = readFile("2024/002/Part_1/input.txt")
let safeCounter: number = 0;
for(const report of reports) {
    const levels: string[] = report.split(" ")
    const levelNumbers: number[] = levels.map((record) => parseInt(record))
    let safe: boolean = true;
    safe = checkIncreasingOrDecreasing(levelNumbers)
    if (safe) {
        safe = checkDegrees(levelNumbers)
    }
    if (safe) {
        safeCounter++
    }
}
console.log(safeCounter)


function checkIncreasingOrDecreasing(levels: number[]): boolean {
    let isIncreasing: boolean
    if(levels[0] < levels[1]) {
        isIncreasing = true
    } else if (levels[0] > levels[1]) {
        isIncreasing = false
    } else {
        //console.log(levels)
        //console.log("REJECTED - Not Increasing or Decreasing in first position")
        return false;
    }
    for(let i: number = 1; i < levels.length - 1; i++) {
        if(levels[i] < levels[i+1]) {
            if(!isIncreasing) {
                //console.log(levels)
                //console.log("REJECTED - Increasing at positon " + i)
                return false
            }
        } else if (levels[i] > levels[i+1]) {
            if(isIncreasing) {
                //console.log(levels)
                //console.log("REJECTED - Decreasing at positon " + i)
                return false
            }
        } else { 
            //console.log(levels)
            //console.log("REJECTED - Not Increasing or Decreasing in position " + i)
            return false 
        }
    }
    return true
}

function checkDegrees(levels: number[]): boolean {
    for(let i: number = 0; i < levels.length - 1; i++ ) {
        if(Math.abs(levels[i] - levels[i+1]) > 3) {
            //console.log(levels)
            //console.log("REJECTED - Value too large between " + levels[i] + " and " + levels[i+1])
            return false
        }
    }
    return true
}