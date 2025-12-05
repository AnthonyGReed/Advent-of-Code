import { readFile } from "../Utilities/utilities"

function part1(input: string[]): number {
    let total = 0;
    const splitIndex = input.findIndex( line => line === '');
    const rangeLines = input.slice(0, splitIndex);
    const idLines = input.slice(splitIndex + 1).map(line => parseInt(line));
    const ranges: [number, number][] = rangeLines.map( line => {
        const [start, end] = line.split('-').map( numStr => parseInt(numStr));
        return [start, end];
    });
    for (const id of idLines) {
        let isFresh = false;
        for (const range of ranges) {
            if (id >= range[0] && id <= range[1]) {
                isFresh = true;
            }
        }
        if (isFresh) {
            total ++;
        }
    }
    return total;
}

function part2(input: string[]): number {
    let total = 0;
    const splitIndex = input.findIndex( line => line === '');
    const rangeLines = input.slice(0, splitIndex);
    let ranges: [number, number][] = rangeLines.map( line => {
        const [start, end] = line.split('-').map( numStr => parseInt(numStr));
        return [start, end];
    })
    ranges.sort(([start, end], [compareStart, compareEnd]) => {
        return start - compareStart
    })
    for (let i = 0; i < ranges.length; i ++) {
        const [start, end] = ranges[i];
        if (i < ranges.length - 1) {
            const [compareStart, compareEnd] = ranges[i+1]
            if (end >= compareStart) {
                ranges[i+1][0] = Math.min(start, compareStart);
                ranges[i+1][1] = Math.max(end, compareEnd);
            } else {
                total += end - start + 1
            }
        } else {
            total += end - start + 1
        }
    }
    return total;
}

// console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));