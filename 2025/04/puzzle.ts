import { readFile, toMatrix } from "../Utilities/utilities"

function part1(input: string[]): number {
    const matrix = toMatrix(input);
    let total = 0;
    for (const row in matrix) {
        for (const col in matrix[row]) {
            if(matrix[row][col] === '@') {
                let blockers = 0;
                blockers = checkAllAround(parseInt(row), parseInt(col), matrix);
                if (blockers < 4) {
                    total++;
                }
            }
        }
    }
    return total;
}

function part2(input: string[]): number {
    const matrix = toMatrix(input);
    let total = 0;
    let noneRemoved = false;
    while (!noneRemoved) {
        let numberRemoved = 0;
        for (const row in matrix) {
            for (const col in matrix[row]) {
                if(matrix[row][col] === '@') {
                    let blockers = 0;
                    blockers = checkAllAround(parseInt(row), parseInt(col), matrix);
                    if (blockers < 4) {
                        total++;
                        matrix[row][col] = '.';
                        numberRemoved++;
                    }
                }
            }
        }
        if (numberRemoved === 0) {
            noneRemoved = true;
        }
    }
    return total;
}

function checkAllAround(row: number, col: number, matrix: string[][]): number {
    let output = 0;
    const directions = [];
    if (row > 0) {
        if (col > 0) directions.push([row - 1, col - 1]);
        if (col < matrix[row].length - 1) directions.push([row - 1, col + 1]);
        directions.push([row - 1, col]);
    }
    if (row < matrix.length - 1) {
        if (col > 0) directions.push([row + 1, col - 1]);
        if (col < matrix[row].length - 1) directions.push([row + 1, col + 1]);
        directions.push([row + 1, col]);
    }
    if (col > 0) directions.push([row, col - 1]);
    if (col < matrix[row].length - 1) directions.push([row, col + 1]);
    for (const direction of directions) {
        if (matrix[direction[0]][direction[1]] === '@') {
            output++;
        }
    }
    return output;
}


console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));