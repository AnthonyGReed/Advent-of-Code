import * as fs from 'fs';
import * as path from 'path';
/**
 * Reads a file and returns its content as an array of strings, where each line is an element in the array.
 * @param fileName - The relative path to the file.
 * @returns A string array where each element is a line from the file.
 */
export function readFile(fileName) {
    try {
        // Resolve the file path relative to the current working directory
        const filePath = path.resolve(process.cwd(), fileName);
        // Read the file synchronously and split it into lines
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.split('\n').map(line => line.trim());
    }
    catch (error) {
        console.error(`Error reading file at ${fileName}:`, error);
        return [];
    }
}
export function readFileRaw(fileName) {
    try {
        const filePath = path.resolve(process.cwd(), fileName);
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.split('\n');
    }
    catch (error) {
        console.error(`Error reading file at ${fileName}: `, error);
        return [];
    }
}
/**
 * Converts an array of strings into a 2D array of characters.
 * @param input - An array of strings.
 * @returns A 2D string array where each character of the input strings is an element in a sub-array.
 */
export function toMatrix(input) {
    return input.map(line => line.split(''));
}
export function mod(a, b) {
    return ((a % b) + b) % b;
}
export class Coord {
    _col;
    _row;
    constructor(row, col) {
        this._row = row;
        this._col = col;
    }
    get col() {
        return this._col;
    }
    set col(value) {
        this._col = value;
    }
    get row() {
        return this._row;
    }
    set row(value) {
        this._row = value;
    }
    toString() {
        return `(${this._row}, ${this._col})`;
    }
    equals(coord) {
        return coord.row === this._row && coord.col === this._col;
    }
    getManhattanDistance(coord) {
        return Math.abs(this._row - coord._row) + Math.abs(this._col - coord._col);
    }
    getRectangleArea(coord) {
        return (Math.abs(this._row - coord._row) + 1) * (Math.abs(this._col - coord._col) + 1);
    }
}
export class CoordList {
    coords = [];
    /**
     * Adds a Coord to the list.
     * @param coord - The Coord object to add.
     */
    add(coord) {
        this.coords.push(coord);
    }
    /**
     * Sorts the list by column values in ascending order.
     */
    sortByCol() {
        this.coords.sort((a, b) => a.col - b.col);
    }
    /**
     * Sorts the list by row values in ascending order.
     */
    sortByRow() {
        this.coords.sort((a, b) => a.row - b.row);
    }
    /**
     * Returns the length of the coord list
     * @returns length
     */
    length() {
        return this.coords.length;
    }
    /**
     * Returns an iterator for the list.
     */
    [Symbol.iterator]() {
        return this.coords.values();
    }
    /**
     * Converts the list to a string representation.
     * @returns A string in the format [(x, y), (a, b)].
     */
    toString() {
        return `[${this.coords.map(coord => coord.toString()).join(', ')}]`;
    }
}
export class Set {
    items = [];
    getKey;
    constructor(getKey) {
        this.getKey = getKey;
    }
    add(item) {
        const key = this.getKey(item);
        if (!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
        }
    }
    addAll(items) {
        for (const item of items) {
            this.add(item);
        }
    }
    has(item) {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item));
    }
    values() {
        return [...this.items];
    }
}
