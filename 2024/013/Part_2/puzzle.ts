import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/013/Part_1/input.txt"

class Coord {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    toString(): string {
        return `(${this._x}, ${this._y})`;
    }

    equals(coord: Coord): boolean {
        return coord.x === this.x && coord.y === this.y
    }
}

class Machine {
    a: Coord
    b: Coord
    prize: Coord

    constructor(a: Coord, b: Coord, prize: Coord) {
        this.a = a
        this.b = b
        this.prize = prize
    }
}

const rows = readFile(FILEPATH)

const machines: Machine[] = []

for(let i = 0; i < rows.length; i += 4) {
    const buttonAInstructions = rows[i].split(":")[1].split(",")
    const buttonBInstructions = rows[i + 1].split(":")[1].split(",")
    const prizeLocations = rows[i + 2].split(":")[1].split(",")
    const buttonA = new Coord(parseInt(buttonAInstructions[0].split("+")[1]), parseInt(buttonAInstructions[1].split("+")[1]))
    const buttonB = new Coord(parseInt(buttonBInstructions[0].split("+")[1]), parseInt(buttonBInstructions[1].split("+")[1]))
    const prize = new Coord(parseInt(prizeLocations[0].split("=")[1]) + 10000000000000, parseInt(prizeLocations[1].split("=")[1]) + 10000000000000)
    const machine: Machine = new Machine(buttonA, buttonB, prize)
    machines.push(machine)
}

let total = 0

for(const machine of machines) {
    const aCount = ((machine.prize.x * machine.b.y) + (machine.prize.y * (-1 * machine.b.x))) / ((machine.a.x * machine.b.y) + (machine.a.y * (-1 * machine.b.x)))
    const bCount = ((machine.prize.x - (machine.a.x * aCount))/machine.b.x)

    if((machine.a.y * aCount) + (machine.b.y * bCount ) == machine.prize.y && Number.isInteger(aCount)) {
        total += (aCount * 3) + bCount
    }
}

console.log(total)