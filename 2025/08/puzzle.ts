import { readFile } from "../Utilities/utilities.js"

class Node {
    private x: number;
    private y: number;
    private z: number;
    private connections: Node[] = [];

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addConection(node: Node) {
        this.connections.push(node);
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

    getConnections(): Node[] {
        return this.connections
    }

    equals (node: Node): Boolean {
        return (this.x === node.x && this.y === node.y && this.z === node.z)
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`
    }
}

class Connection {
    private nodes: Node[] = [];
    private distance: number;

    constructor(nodeA: Node, nodeB: Node) {
        this.distance = (
            Math.abs(nodeA.get("x") - nodeB.get("x")) + 
            Math.abs(nodeA.get("y") - nodeB.get("y")) + 
            Math.abs(nodeA.get("z") - nodeB.get("z"))
        )
        this.nodes = [nodeA, nodeB]
    }

    getNodes() {
        return this.nodes;
    }

    getDistance() {
        return this.distance;
    }
}

function part1(input: string[], iterationValue: number): number {
    const finalValue: number = 0;
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    for (const line of input) {
        const coords = line.split(',').map((val) => parseInt(val));
        const node = new Node(coords[0], coords[1], coords[2]);
        nodes.push(node)
    }
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
            connections.push(new Connection(nodes[i], nodes[j]))
        }
    }
    connections.sort((a, b) => a.getDistance() - b.getDistance())
    for (let i = 0; i < iterationValue; i++) {
        const connectedNodes = connections[i].getNodes();
        connectedNodes[0].addConection(connectedNodes[1]);
        connectedNodes[1].addConection(connectedNodes[0]);
    }
    const circuts: Set<Node>[] = []
    for (let i = 0; i < iterationValue; i++) {
        const connection = connections[i]
        const nodes = connection.getNodes()
        let inNetwork = false
        for (const circut of circuts) {
            if (circut.has(nodes[0])) {
                circut.add(nodes[1])
                inNetwork = true;
            }
            if (circut.has(nodes[1])) {
                circut.add(nodes[0])
                inNetwork = true;
            }
        }
        if(!inNetwork) {
            const network = new Set<Node>()
            network.add(nodes[0])
            network.add(nodes[1])
            circuts.push(network)
        }
    }
    let workComplete = false;
    while (!workComplete) {
        let noWorkDone = true
        for (let i = 0; i < circuts.length - 1; i++) {
            for (let j = i + 1; j < circuts.length; j++) {
                for (const nodeA of circuts[i]) {
                    console.log(j)
                    console.log(circuts[j])
                    for (const nodeB of circuts[j]) {
                        if (nodeA.equals(nodeB)) {
                            console.log("I DID THIS")
                            circuts[i+1].forEach((node) => circuts[i].add(node))
                            circuts.splice(i+1, 1)
                            noWorkDone = false
                        }
                    }
                }
            }
        }
        if (noWorkDone) { workComplete = true }
    }
    console.log(circuts)
    return finalValue;
}

function part2(input: string[]): number {
    // implementation for part 2
    return 0;
}

console.log(part1(readFile('test_input.txt'), 10));
// console.log(part1(readFile('input.txt'), 100));

// console.log(part2(readFile('test_input.txt'), 10));
// console.log(part2(readFile('input.txt'), 100));