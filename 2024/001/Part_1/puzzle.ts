import { readFile, toMatrix } from "../../Utilities/utilities"

const input: string[] = readFile("2024/001/Part_1/input.txt")
let leftSide: number[] = []
let rightSide: number[] = []
for (const row of input) {
    let tempInput :string[] = row.split("   ")
    leftSide.push(parseInt(tempInput[0]))
    rightSide.push(parseInt(tempInput[1]))
}
let output: number = 0;
leftSide.sort()
rightSide.sort()
for(let i = 0; i < leftSide.length; i++) {
    let left = leftSide[i]
    let right = rightSide[i]
    console.log(left + " - " + right + " = " + Math.abs(left - right))
    output += Math.abs(left - right)
}
console.log(output)