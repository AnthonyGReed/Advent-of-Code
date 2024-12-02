import { readFile, toMatrix } from "../../Utilities/utilities"

class Frequency {
    private value: number
    public count: number

    constructor(value: number) {
        this.value = value;
        this.count = 1;
    }

    getValue(): number {
        return this.value
    }

    addOne(): void {
        this.count++
    }
}
const input: string[] = readFile("2024/001/Part_2/input.txt")
let leftSide: number[] = []
let rightSide: number[] = []
let rightSideFrequency: Frequency[] = []
for (const row of input) {
    let tempInput :string[] = row.split("   ")
    leftSide.push(parseInt(tempInput[0]))
    rightSide.push(parseInt(tempInput[1]))
}
let output: number = 0;
// leftSide.sort()
for(const entry of rightSide) {
    console.log(entry)
    if(rightSideFrequency.some((freq) => freq.getValue() === entry)) {
        console.log("Found")
        rightSideFrequency.find((freq) => freq.getValue() === entry)?.addOne()
    } else {
        console.log("Not found in " + rightSideFrequency + ". adding")
        rightSideFrequency.push(new Frequency(entry));
    }
}
for(let i = 0; i < leftSide.length; i++) {
    let left = leftSide[i]
    let right = rightSideFrequency.find((freq) => freq.getValue() === left)?.count
    if (right) {
        console.log(left + " found " + right + " times")
        output += left * right
    } else {
        console.log("left not found")
        output += 0
    }
}
console.log(output)
