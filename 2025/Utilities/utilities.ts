import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads a file and returns its content as an array of strings, where each line is an element in the array.
 * @param fileName - The relative path to the file.
 * @returns A string array where each element is a line from the file.
 */
export function readFile(fileName: string): string[] {
    try {
        // Resolve the file path relative to the current working directory
        const filePath = path.resolve(process.cwd(), fileName);
        // Read the file synchronously and split it into lines
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.split('\n').map(line => line.trim());
    } catch (error) {
        console.error(`Error reading file at ${fileName}:`, error);
        return [];
    }
}

/**
 * Converts an array of strings into a 2D array of characters.
 * @param input - An array of strings.
 * @returns A 2D string array where each character of the input strings is an element in a sub-array.
 */
export function toMatrix(input: string[]): string[][] {
    return input.map(line => line.split(''));
}

export function mod(a: number, b: number) {
    return ((a % b) + b) % b;
}

export class Coord {
    private _col: number;
    private _row: number;

    constructor(row: number, col: number) {
        this._row = row;
        this._col = col;
    }

    get col(): number {
        return this._col;
    }

    set col(value: number) {
        this._col = value;
    }

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    toString(): string {
        return `(${this._row}, ${this._col})`;
    }

    equals(coord: Coord): boolean {
        return coord.row === this._row && coord.col === this._col
    }
}

export class CoordList {
    private coords: Coord[] = [];

    /**
     * Adds a Coord to the list.
     * @param coord - The Coord object to add.
     */
    add(coord: Coord): void {
        this.coords.push(coord);
    }

    /**
     * Sorts the list by column values in ascending order.
     */
    sortByCol(): void {
        this.coords.sort((a, b) => a.col - b.col);
    }

    /**
     * Sorts the list by row values in ascending order.
     */
    sortByRow(): void {
        this.coords.sort((a, b) => a.row - b.row);
    }

    /**
     * Returns an iterator for the list.
     */
    [Symbol.iterator](): Iterator<Coord> {
        return this.coords.values();
    }

    /**
     * Converts the list to a string representation.
     * @returns A string in the format [(x, y), (a, b)].
     */
    toString(): string {
        return `[${this.coords.map(coord => coord.toString()).join(', ')}]`;
    }
}

export class Set<T> {
    private items: T[] = [];
    private getKey: (item: T) => string;

    constructor(getKey: (item: T) => string) {
        this.getKey = getKey
    }

    add(item: T): void {
        const key = this.getKey(item);
        if(!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
        }
    }

    addAll(items: T[]) {
        for(const item of items) {
            this.add(item)
        }
    }

    has(item: T): boolean {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item))
    }

    values(): T[] {
        return [...this.items];
    }
}
