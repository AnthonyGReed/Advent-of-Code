import { Coord, readFile, Set } from "../../Utilities/utilities"

const FILEPATH = "2024/008/Part_1/input.txt"

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
let coordSet: Set<Coord> = new Set<Coord>((coord) => coord.toString())
for(const key of keys) {
    const workingArray: Coord[] = hash.get(key)
    for(let i = 0; i < workingArray.length; i++) {
        for(let j = 0; j < workingArray.length; j++) {
            if(workingArray[i] !== workingArray[j]) {
                const sortedArray: Coord[] = sortArray(workingArray[i], workingArray[j])
                const xDifference = sortedArray[1].row - sortedArray[0].row
                const yDifference = sortedArray[1].col - sortedArray[0].col
                if(
                    (sortedArray[0].row - xDifference >= 0 && sortedArray[0].row - xDifference < rows.length) && 
                    (sortedArray[0].col - yDifference >= 0 && sortedArray[0].col - yDifference < rows[0].length)) 
                    {
                    // console.log("- " + new Coord(sortedArray[0].row - xDifference, sortedArray[0].col- yDifference).toString() + " - " + workingArray[i].toString() + " and " + workingArray[j].toString() + ", smaller: " + sortedArray[0].toString())
                    coordSet.add(new Coord(sortedArray[0].row - xDifference, sortedArray[0].col - yDifference))
                }
                if(
                    (sortedArray[1].row + xDifference >= 0 && sortedArray[1].row + xDifference < rows.length) &&
                    (sortedArray[1].col + yDifference >= 0 && sortedArray[1].col + yDifference < rows[0].length )
                ) {
                    // console.log("2x! " + new Coord(sortedArray[1].row + xDifference, sortedArray[1].col + yDifference).toString() + " - " + workingArray[i].toString() + " and " + workingArray[j].toString() + ", larger " + sortedArray[1])
                    coordSet.add(new Coord(sortedArray[1].row + xDifference, sortedArray[1].col + yDifference))
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