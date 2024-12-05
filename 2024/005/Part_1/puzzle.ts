import { flattenDiagnosticMessageText } from "typescript"
import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/005/Part_1/input.txt"

class Node {
    id: Number
    private before: Node[]
    private after: Node[]

    constructor(id: Number) {
        this.before = [];
        this.after = [];
        this.id = id;
    }
    
    addBefore(node: Node): void {
        this.before.push(node)
    }
    
    addAfter(node: Node): void {
        this.after.push(node)
    }
    
    getAllBefore(): Node[] {
        return this.before;
    }
    
    getAllAfter(): Node[] {
        return this.after;
    }
}

class NodeLibrary {
    library: Node[]

    constructor() {
        this.library = []
    }

    get(node: Number) {
        let output: Node|undefined = this.library.find((info) => info.id === node)
        if(output) {
            return output
        } else {
            let newNode: Node = new Node(node);
            this.library.push(newNode)
            return newNode
        }
    }
}

let nodeLibrary: NodeLibrary = new NodeLibrary()

let puzzle: string[] = readFile(FILEPATH);

let totalValue = 0;
let rules = true;
for(const row of puzzle) {
    if(row.length == 0) { 
        rules = false 
        continue
    }
    if(rules == true) {
        const instructions: string[] = row.split("|");
        let before = nodeLibrary.get(parseInt(instructions[0]))
        let after = nodeLibrary.get(parseInt(instructions[1]))
        before.addAfter(after)
        after.addBefore(before)
    }
    if(rules == false) {
        totalValue += checkNumbers(row)
    }
}
console.log(totalValue)

function checkNumbers(row: string): number {
    let data = row.split(",")
    let countRow: boolean = true
    let numbers = data.map((datum) => parseInt(datum))
    for(let i = 0; i < numbers.length; i++) {
        let numberNode = nodeLibrary.get(numbers[i])
        let beforeNodes = numberNode.getAllBefore()
        let afterNodes = numberNode.getAllAfter()
        for(let j = 0; j < i; j++) {
            let result: Node | undefined = afterNodes.find((node) => numbers[j] === node.id)
            if(result) {
                countRow = false;
                break;
            }
        }
        if(countRow) {
            for(let j = numbers.length - 1; j > i; j--) {
                let result: Node | undefined = beforeNodes.find((node) => numbers[j] === node.id)
                if(result) {
                    countRow = false
                    break;
                }
            }
        }
    }
    if(countRow) {
        return numbers[Math.floor(numbers.length / 2)]
    } else {
        return 0
    }
}