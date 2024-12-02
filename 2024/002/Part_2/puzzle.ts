import { readFile } from "../../Utilities/utilities"

const FILENAME = "2024/002/Part_2/input.txt"

class Record {
    public data: number[]
    public safe: boolean
    private increasing: boolean
    
    constructor(data: number[]) {
        this.data = data
        this.safe = true
        this.checkDegree()
        if(this.safe) {
            this.checkIncreasingOrDecreasing()
        }
    }

    checkIncreasingOrDecreasing(): void {
        if(this.data[0] < this.data[1]) {
            this.increasing = true
        } else {
            this.increasing = false
        }
        for(let i = 1; i < this.data.length - 1; i++) {
            if(this.data[i] > this.data[i + 1] ) {
                if(this.increasing) {
                    this.safe = false
                }
            } else {
                if(!this.increasing) {
                    this.safe = false
                }
            }
        }
    }

    checkDegree(): void {
        for(let i = 0; i < this.data.length; i++) {
            const value: number = Math.abs(this.data[i] - this.data[i+1])
            if (value < 1 || value > 3) {
                this.safe = false
            } 
        }
    }
}

const reports: string[] = readFile(FILENAME)
let safeCounter: number = 0
for(const report of reports) {
    const levels: string[] = report.split(" ")
    const levelNumbers: number[] = levels.map((record) => parseInt(record))
    let record = new Record(levelNumbers)
    if(record.safe) {
        safeCounter++
    } else {
        for(let i = 0; i < record.data.length; i++) {
            let data: number[] = [...record.data]
            data.splice(i, 1)
            let newRecord = new Record(data)
            if (newRecord.safe) {
                safeCounter++
                break
            }
        }
    }
}
console.log(safeCounter)