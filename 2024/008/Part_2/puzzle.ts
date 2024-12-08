import { Coord, readFile, Set } from "../../Utilities/utilities"

const FILEPATH = "2024/008/Part_2/input.txt"

class hashMap {
    private data: Map<string, Coord[]>

    constructor() {
        this.data = new Map<string, Coord[]>
    }

    add(key: string, coord: Coord) {
        if(this.data.has(key)) {
            this.data.set(key, [...this.data.get(key), coord])
        } else {
            this.data.set(key, [coord])
        }
    }

    get(key: string): Coord[] {
        return this.data.get(key)
    }

    getAllKeys(): string[] {
        let output: string[] = []
        this.data.forEach((value, key) => {
            output.push(key)
        })
        return output
    }
}

const rows = readFile(FILEPATH)
let hash: hashMap = new hashMap()
for (let i = 0; i < rows.length; i++) {
    const data = rows[i].split("")
    for( let j = 0; j < rows[i].length; j++) {
        if(data[j] != ".") {
            hash.add(data[j], new Coord(i, j))
        }
    }
}
const keys: string[] = hash.getAllKeys()
for(const key of keys) {
    // console.log(key + " -> " + hash.get(key))
}
let coordSet: Set<Coord> = new Set<Coord>((coord) => coord.toString())
for(const key of keys) {
    const workingArray: Coord[] = hash.get(key)
    for(let i = 0; i < workingArray.length; i++) {
        for(let j = 0; j < workingArray.length; j++) {
            if(workingArray[i] !== workingArray[j]) {
                const sortedArray = sortArray(workingArray[i], workingArray[j])
                let smallestCoord: Coord = new Coord(sortedArray[0].row, sortedArray[0].col)
                let largestCoord: Coord = new Coord(sortedArray[1].row, sortedArray[1].col)
                // console.log(smallestCoord.toString() + " - " + largestCoord.toString())
                const xDifference: number = largestCoord.row - smallestCoord.row
                const yDifference: number = largestCoord.col - smallestCoord.col
                while(smallestCoord.row < rows.length && smallestCoord.row >= 0 && smallestCoord.col >= 0 && smallestCoord.col < rows[0].length) {
                    coordSet.add(new Coord(smallestCoord.row, smallestCoord.col))
                    // console.log(smallestCoord.toString() + " added, subtracting " + xDifference + " from row and " + yDifference + " from col" )
                    smallestCoord.row -= xDifference
                    smallestCoord.col -= yDifference
                }
                while(largestCoord.row < rows.length && largestCoord.row >= 0 && largestCoord.col >= 0 && largestCoord.col < rows[0].length) {
                    coordSet.add(new Coord(largestCoord.row, largestCoord.col))
                    // console.log(largestCoord.toString() + " added, adding " + xDifference + " to row and " + yDifference + " to col")
                    largestCoord.row += xDifference
                    largestCoord.col += yDifference
                }
            }
        }
    }
}
// console.log(coordSet.values().sort((a, b) => a.row - b.row))
console.log(coordSet.values().length)

function sortArray(coord1: Coord, coord2: Coord): Coord[] {
    if(coord1.row < coord2.row) {
        return [coord1, coord2]
    } else {
        return [coord2, coord1]
    }
}