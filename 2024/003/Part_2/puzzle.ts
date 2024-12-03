import { readFile } from "../../Utilities/utilities"

const FILENAME = "2024/003/Part_2/input.txt"

const data = readFile(FILENAME)
let finalValue:number = 0;
let enabled: boolean = true;
for(const row of data) {
    for(let i:number = 0; i < row.length-4; i++) {
        if(row.substring(i, i+4) == "do()") {
            enabled = true;
        }
        if(row.substring(i, i+7) == "don't()") {
            enabled = false;
        }
        if(row.substring(i, i+4) == "mul(" && enabled) {
            const inner = row.substring(i+4, i+12).split(")")[0]
            if (inner.length <= 7) {
                const terms = inner.split(",")
                if(terms[0].length < 4 && terms[0].length > 0 && terms[1].length < 4 && terms[1].length > 0 && terms.length == 2) {
                    const lengthBeforeA = terms[0].length
                    const lengthBeforeB = terms[1].length
                    const valueA: string = terms[0].trim()
                    const valueB: string = terms[1].trim()
                    if(valueA.length == lengthBeforeA && valueB.length == lengthBeforeB) {
                        if(!isNaN(Number(terms[0])) && !isNaN(Number(terms[1]))) {
                            finalValue +=( Number(terms[0]) * Number(terms[1]))
                        }
                    }
                }
            }
        }
    }
}
console.log(finalValue);