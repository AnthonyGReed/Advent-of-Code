import { readFile, toMatrix } from "../Utilities/utilities"

class BeamHousing {
    key: number;
    value: number = 0;

    constructor (key: number) {
        this.key = key;
    }

    add (key: number, amount: number): void {
        this.value += amount;
    }

    clear (key: number): void {
        this.value = 0;
    }
}

function part1(input: string[]): number {
    let activeBeams: Set<number> = new Set<number>();
    let total = 0;
    const matrix = toMatrix(input);
    for (const line of matrix) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === "S") {
                activeBeams.add(i);
            }
            if(line[i] === "^") {
                if (activeBeams.has(i)) {
                    activeBeams.add(i - 1);
                    activeBeams.add(i + 1);
                    activeBeams.delete(i);
                    total += 1;
                }
            }
        }
    }
    return total;
}

function part2(input: string[]): number {
    type activeBeams = Record<number, number>;
    const matrix = toMatrix(input);
    let active: activeBeams = {}
    for (let i = 0; i < matrix[0].length; i++) {
        active[i] = 0;
    }
    for (const line of matrix) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === "S") {
                active[i] = 1;
            }
            if (line[i] === "^") {
                active[i-1] += active[i];
                active[i+1] += active[i];
                active[i] = 0;
            }
        }
    }
    let total = 0;
    Object.values(active).forEach((value) => {
        total += value
    })
    return total;
}

// console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));