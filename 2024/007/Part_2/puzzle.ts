import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/007/Part_2/input.txt"

enum Operations {
    ADD = 0,
    MULT = 1,
    CONCAT = 2
}

const rows = readFile(FILEPATH)
let solved: number = 0;
for(const row of rows) {
    const data: string[] = row.split(": ")
    const target: number = parseInt(data[0])
    const equation: number[] = data[1].split(" ").map((datum) => parseInt(datum)) 
    
    const operationList: Operations[][] = generatePermutations([Operations.ADD, Operations.MULT, Operations.CONCAT], equation.length - 1)
    
    for(const operationProgram of operationList) {
        let total: number = equation[0]
        for(let i = 0; i < operationProgram.length; i++) {
            if(operationProgram[i] == Operations.ADD) {
                total = addTerm(total, equation[i+1])
            } else if(operationProgram[i] == Operations.MULT) {
                total = multTerm(total, equation[i+1])
            } else if(operationProgram[i] == Operations.CONCAT) {
                total = parseInt(String(total) + String(equation[i+1]))
            }
        }
        if(total == target) {
            solved += target
            break
        }
    }
}
console.log(solved)

function addTerm(total: number, term: number): number {
    return total + term;
}

function multTerm(total: number, term: number): number {
    return total * term;
}

function generatePermutations(options: Operations[], slots: number): Operations[][] {
    const result: Operations[][] = [];

    function helper(current: Operations[]): void {
        if (current.length === slots) {
            result.push([...current]); // Push a copy of the current permutation
            return;
        }

        for (const option of options) {
            current.push(option); // Add the option to the current permutation
            helper(current); // Recur with the updated permutation
            current.pop(); // Backtrack by removing the last option
        }
    }

    helper([]); // Start the recursive process
    return result;
}