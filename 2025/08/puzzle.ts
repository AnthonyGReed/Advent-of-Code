import { readFile } from "../Utilities/utilities"

class Node {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get(type: string): number {
        if (type === "x") {
            return this.x;
        } else if (type === "y") {
            return this.y;
        } else if (type === "z") {
            return this.z;
        } else {
            return 0;
        }
    }

    equals (node: Node): Boolean {
        return (this.x === node.x && this.y === node.y && this.z === node.z)
    }
}

class Network {
    nodes: Node[];
    size: number;

    constructor(nodeA: Node, nodeB: Node) {
        this.nodes.push(nodeA);
        this.nodes.push(nodeB);
        this.size = 2;
    }

    addNode (node: Node): void {
        this.nodes.push(node)
        this.size++;
    }

    getNodes(): Node[] {
        return this.nodes
    }
    
    getSize(): number {
        return this.size;
    }

    has (node: Node) {
        for (let thisNode of this.nodes) {
            if (thisNode.equals(node)) { return true;}
        }
        return false;
    }
}

function part1(input: string[]): number {
    // implentation for part 1
    return 0;
}

function part2(input: string[]): number {
    // implementation for part 2
    return 0;
}

console.log(part1(readFile('input.txt')));
console.log(part2(readFile('input.txt')));