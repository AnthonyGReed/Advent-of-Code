import { readFile, mod } from "../Utilities/utilities"

function part1(input: string[]): number {
    let total: number = 0;
    let position: number = 50;
    for (const line of input) {
        const direction = line[0];
        const value = parseInt(line.slice(1), 10);
        switch (direction) {
            case 'R':
                position += value;
                break;
            case 'L':
                position -= value;
                break;
        }
        position = mod(position, 100);
        if (position == 0) {
            total ++;
        }
    }
    return total;
}

function part2(input: string[]): number {
    let total: number = 0;
    let position: number = 50;
    for (const line of input) {
        const direction = line[0];
        const value = parseInt(line.slice(1), 10);
        total += Math.trunc(value / 100);
        switch (direction) {
            case 'R':
                if (position + (mod(value, 100)) > 100) {
                    total ++;
                }
                position += value;
                break;
            case 'L':
                if (position != 0 && position - (mod(value, 100)) < 0) {
                    total ++;
                } 
                position -= value;
                break;
        }
        position = mod(position, 100);
        if (position == 0) {
            total ++;
        }
    }
    return total;
}

console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));