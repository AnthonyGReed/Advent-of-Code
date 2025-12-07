import { readFile, readFileRaw, toMatrix } from "../Utilities/utilities"

function part1(input: string[]): number {
    let matrix: string[][] = [];
    let total = 0;
    for (let row of input) {
        matrix.push(row.split(" "));
    }
    matrix = matrix.map((row) => row.filter((cell) => cell !== ""));
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[4][i] === "*") {
            total += (parseInt(matrix[0][i]) * parseInt(matrix[1][i]) * parseInt(matrix[2][i]) * parseInt(matrix[3][i]));
        }
        if (matrix[4][i] === "+") {
            total += (parseInt(matrix[0][i]) + parseInt(matrix[1][i]) + parseInt(matrix[2][i]) + parseInt(matrix[3][i]));
        }
    }
    return total;
}

function part2(input: string[]): number {
    let total = 0;
    let problems: string[][] = []
    const matrix = toMatrix(input);
    let newProblem: Boolean = true;
    let counter = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        let allSpaces:Boolean = true;
        let value: string = ""
        for (let j = 0; j < matrix.length - 1; j++) {
            if(matrix[j][i] != " ") {
                allSpaces = false;
                let val = matrix[j][i]
                if (val !== '' && val !== '\r\r\r' && val !== '\n') {
                    value += val
                }
            }
        }
        if (newProblem) {
            newProblem = false;
            problems.push([matrix[matrix.length-1][i]])
        }
        if (allSpaces) {
            counter += 1
            newProblem = true;
        } else {
            problems[counter].push(value)
        }
    }
    for (const problem of problems) {
        if (problem[0] == '+') {
            let value = 0;
            for (let i = 1; i < problem.length; i++) {
                value += parseInt(problem[i])
            }
            console.log(`Problem set ${problem} is equal to ${value}`)
            total += value;
        } else if (problem[0] == '*') {
            let value = 0;
            for (let i = 1; i < problem.length; i++) {
                if (value === 0) {
                    value = parseInt(problem[i])
                } else {
                    value *= parseInt(problem[i])
                }
            }
            console.log(`Problem set ${problem} is equal to ${value}`)
            total += value;
        }
    }
    return total;
}


console.log(part1(readFile('input.txt')));
//readFile trims the lines and that breaks this puzzle so I won't be able to do do that on this one.
console.log(part2(readFileRaw('input.txt')));