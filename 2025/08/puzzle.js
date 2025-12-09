import { readFile } from "../Utilities/utilities.js";
class Node {
    x;
    y;
    z;
    connections = [];
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    addConection(node) {
        this.connections.push(node);
    }
    get(type) {
        if (type === "x") {
            return this.x;
        }
        else if (type === "y") {
            return this.y;
        }
        else if (type === "z") {
            return this.z;
        }
        else {
            return 0;
        }
    }
    getConnections() {
        return this.connections;
    }
    equals(node) {
        return (this.x === node.x && this.y === node.y && this.z === node.z);
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
// function containsAll<T>(a: Set<T>, b:Set<T>): boolean {
//     for (const element of b) {
//         if (!a.has(element)) { return false; }
//     }
//     return true;
// }
class Connection {
    nodes = [];
    distance;
    constructor(nodeA, nodeB) {
        this.distance = (Math.abs(nodeA.get("x") - nodeB.get("x")) +
            Math.abs(nodeA.get("y") - nodeB.get("y")) +
            Math.abs(nodeA.get("z") - nodeB.get("z")));
        this.nodes = [nodeA, nodeB];
    }
    getNodes() {
        return this.nodes;
    }
    getDistance() {
        return this.distance;
    }
}
function part1(input, iterationValue) {
    const finalValue = 0;
    const nodes = [];
    const connections = [];
    for (const line of input) {
        const coords = line.split(',').map((val) => parseInt(val));
        const node = new Node(coords[0], coords[1], coords[2]);
        nodes.push(node);
    }
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            connections.push(new Connection(nodes[i], nodes[j]));
        }
    }
    connections.sort((a, b) => a.getDistance() - b.getDistance());
    for (let i = 0; i < iterationValue; i++) {
        const connectedNodes = connections[i].getNodes();
        connectedNodes[0].addConection(connectedNodes[1]);
        connectedNodes[1].addConection(connectedNodes[0]);
    }
    let circuts = [];
    for (let i = 0; i < iterationValue; i++) {
        const connection = connections[i];
        const nodes = connection.getNodes();
        let inNetwork = false;
        for (const circut of circuts) {
            if (circut.has(nodes[0])) {
                circut.add(nodes[1]);
                inNetwork = true;
            }
            if (circut.has(nodes[1])) {
                circut.add(nodes[0]);
                inNetwork = true;
            }
        }
        if (!inNetwork) {
            const network = new Set();
            network.add(nodes[0]);
            network.add(nodes[1]);
            circuts.push(network);
        }
    }
    // This logic is the problem, we need to be able to loop through and merge if any element of the array match any other array.
    let workComplete = false;
    while (!workComplete) {
        let noWorkDone = true;
        const workingSet = [];
        for (let i = 0; i < circuts.length; i++) {
            let mergeFound = false;
            for (let j = i + 1; j < circuts.length; j++) {
                // if (containsAll(circuts[i], circuts[j])) {
                //     mergeFound = true;
                //     workingSet.push(circuts[j])
                // }
                for (const node of circuts[i]) {
                    if (circuts[j].has(node)) {
                        mergeFound = true;
                    }
                }
                if (mergeFound) {
                    circuts[i].forEach((node) => circuts[j].add(node));
                    workingSet.push(circuts[j]);
                    noWorkDone = false;
                }
            }
            if (!mergeFound) {
                workingSet.push(circuts[i]);
            }
        }
        if (noWorkDone) {
            workComplete = true;
        }
        else {
            circuts = workingSet;
        }
        console.log(circuts.length);
        console.log(circuts);
    }
    return finalValue;
}
function part2(input) {
    // implementation for part 2
    return 0;
}
console.log(part1(readFile('test_input.txt'), 10));
// console.log(part1(readFile('input.txt'), 100));
// console.log(part2(readFile('test_input.txt'), 10));
// console.log(part2(readFile('input.txt'), 100));
