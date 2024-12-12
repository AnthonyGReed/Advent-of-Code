import { stringify } from "querystring"
import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/011/Part_1/input.txt"
const ITERATIONS = 75

const total: Stone[] = []
let stonesToBeAdded: Stone[] = []

class Stone {
    private value: number

    constructor(value: number) {
        this.value = value
    }

    process() {
        if(this.value == 0) {
            // console.log("0 detected, converting to 1")
            this.value = 1
        } else if (this.value.toString().length % 2 == 0) {
            // console.log(this.value + " has a length of " + this.value.toString().length + " and will be split in two to " + this.value.toString().substring(0, this.value.toString().length/2) + " and " + this.value.toString().substring(this.value.toString().length/2))
            const valueString = this.value.toString()
            this.value = parseInt(valueString.substring(0, valueString.length/2))
            const newValue = parseInt(valueString.substring(valueString.length/2))
            stonesToBeAdded.push(new Stone(newValue))
        } else {
            // console.log(this.value + " did not meet other rules so it will be multiplied by 2024")
            this.value *= 2024
        }
    }
}

const rows = readFile(FILEPATH)
const inputString: string[] = rows[0].split(" ")
for(const input of inputString) {
    total.push(new Stone(parseInt(input)))
}
for(let i = 0; i < ITERATIONS; i++) {
    // console.log("ITERATION " + i)
    for(const stone of total) {
        stone.process()
    }
    total.push(...stonesToBeAdded)
    stonesToBeAdded = []
}
console.log(total.length)
// console.log(total)