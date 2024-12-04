import { readFile } from "../../Utilities/utilities"

const FILENAME = "2024/003/Part_2/input.txt"
const REGEX = /(mul\()\d{1,3},\d{1,3}\)|don\'t\(\)|do\(\)/g

const data = readFile(FILENAME)
let finalValue: number = 0;
let enabled: boolean = true;
let results: string[] = [];
for(const row of data) {
    let tempResults = Array.from(row.matchAll(REGEX));
    for(const result of tempResults) {
        results.push(result[0]);
    }
}
for(const result of results) {
    if(result == "do()") {
        enabled = true;
    } else if(result == "don't()") {
        enabled = false;
    } else if(enabled) {
        let values:string[] = result.substring(4, result.length-1).split(",");
        console.log(values)
        finalValue += Number(values[0]) * Number(values[1]);
    }
}
console.log(finalValue);