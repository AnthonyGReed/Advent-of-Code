import { readFile } from "../Utilities/utilities"

function part1(input: string[]): number {
    const lines = input[0].split(',');
    let value = 0;
    for (const line of lines) {
        const [start, end] = line.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            const test = String(i).substring(0, String(i).length / 2);
            if (test === String(i).substring(String(i).length / 2)) {
                value += i;
            }
        }
    }
    return value;
}

function part2(input: string[]): number {
    const lines = input[0].split(',');
    let value = 0;
    for (const line of lines) {
        const [start, end] = line.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            let checked = false;
            for (let div = 2; div <= String(i).length; div++) {
                if(String(i).length % div === 0 && !checked) {
                    const test = String(i).substring(0, String(i).length / div);
                    let passed = true;
                    for (let check = 1; check < div; check++) {
                        if (test !== String(i).substring(check * (String(i).length / div), (check + 1) * (String(i).length / div))) {
                            passed = false;
                            break;
                        }
                    }
                    if (passed) {
                        value += i;
                        checked = true;
                    }
                }
            }
        }
    }
    return value;
}

console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));