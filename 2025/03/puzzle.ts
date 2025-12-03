import { readFile } from "../Utilities/utilities"

function part1(input: string[]): number {
    let total = 0;
    for (const line of input) {
        let largestCharacter: string;
        let largetstIndex: number;
        for (let i = 0; i < line.length - 1; i++) {
            if (!largestCharacter || line[i] > largestCharacter) {
                largestCharacter = line[i];
                largetstIndex = i;
            }
        }
        let secondCharacter: string;
        let secondIndex: number;
        for (let i = largetstIndex + 1; i < line.length; i++) {
            if (!secondCharacter || line[i] > secondCharacter) {
                secondCharacter = line[i];
                secondIndex = i;
            }
        }
        total += parseInt(largestCharacter + secondCharacter);
    }
    return total;
}

function part2(input: string[]): number {
    let total = 0;
    const lineSize = 12;
    for (const line of input) {
        let currentOffset = lineSize;
        let currentIndex = 0;
        let fullString = "";
        while (currentOffset > 0) {
            currentOffset--;
            let character: string;
            let index: number;
            for (let i = currentIndex; i < line.length - currentOffset; i++) {
                if (!character || line[i] > character) {
                    character = line[i];
                    index = i;
                }
            }
            fullString += character;
            currentIndex = index + 1;
        }
        total += parseInt(fullString);
    }
    return total;
}

console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));