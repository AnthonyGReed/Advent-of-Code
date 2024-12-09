import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/009/Part_2/input.txt"


class Blank {
    private locationRangeStart: number;
    private locationRangeEnd: number;

    constructor(start: number, end: number) {
        this.locationRangeStart = start
        this.locationRangeEnd = end
    }

    changeLocation(start: number, end: number) {
        this.locationRangeStart = start
        this.locationRangeEnd = end
    }

    getStartLocation(): number {
        return this.locationRangeStart
    }

    getEndLocation(): number {
        return this.locationRangeEnd
    }

    length(): number {
        return this.locationRangeEnd - this.locationRangeStart + 1
    }
}

class File extends Blank{
    private id: number;

    constructor(start: number, end: number, id: number) {
        super(start, end)
        this.id = id
    }

    getId(): number {
        return this.id
    }
}

const row = readFile(FILEPATH)[0].split("")
const files: File[] = []
const blanks: Blank[] = []
let location = 0
for(let i = 0; i < row.length; i++) {
    if(i % 2 == 0) {
        files.push(new File(location, location + parseInt(row[i]) - 1, i/2))
        location += parseInt(row[i])
    } else {
        blanks.push(new Blank(location, location + parseInt(row[i]) - 1))
        location += parseInt(row[i])
    }
}
for(let i = files.length-1; i >= 0; i--) {
    for(const blank of blanks) {
        let toRemove: Blank
        if(files[i].length() <= blank.length() && files[i].getStartLocation() > blank.getStartLocation()) {
            files[i].changeLocation(blank.getStartLocation(), blank.getStartLocation() + files[i].length() - 1)
            blank.changeLocation(blank.getStartLocation() + files[i].length(), blank.getEndLocation())
            if(blank.length() == 0) {
                toRemove = blank
            }
            break;
        }
        if(toRemove) {
            const index = blanks.indexOf(toRemove)
            if (index !== -1) {
                blanks.splice(index, 1)
            }
        }
    }
}
let total = 0
files.sort((a, b) => a.getStartLocation() - b.getStartLocation())
for(const file of files) {
    for(let i = file.getStartLocation(); i <= file.getEndLocation(); i++) {
        total += file.getId() * i
    }
}
console.log(total)