import { Coord, CoordList, readFile } from "../Utilities/utilities.js"

function part1(input: string[]): number {
    const coords: Coord[] = [];
    for (const line of input) {
        const coord: number[] = line.split(",").map(val => parseInt(val));
        coords.push(new Coord(coord[0], coord[1]))
    }
    let largestArea = 0;
    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i+1; j < coords.length; j++) {
            // console.log(`Coord pair 1: ${coords[i]}, Coord pair 2: ${coords[j]}, Area: ${coords[i].getRectangleArea(coords[j])}`)
            if (coords[i].getRectangleArea(coords[j]) > largestArea) {
                largestArea = coords[i].getRectangleArea(coords[j]);
            }
        }
    }
    return largestArea
}

function part2(input: string[]): number {
    // implementation for part 2
    return 0;
}

console.log(part1(readFile('test_input.txt')));
console.log(part1(readFile('input.txt')));

// console.log(part2(readFile('test_input.txt')));
// console.log(part2(readFile('input.txt')));