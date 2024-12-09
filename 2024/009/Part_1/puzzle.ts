import { readFile } from "../../Utilities/utilities"

const FILEPATH = "2024/009/Part_1/input.txt"


class Blank {
    private location: number;

    constructor(location: number) {
        this.location = location
    }

    changeLocation(location: number) {
        this.location = location
    }

    getLocation(): number {
        return this.location
    }
}

class File extends Blank{
    private id: number;

    constructor(location: number, id: number) {
        super(location)
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
        for(let j = 0; j < parseInt(row[i]); j++) {
            files.push(new File(location, i/2))
            location++
        }
    } else {
        for(let j = 0; j < parseInt(row[i]); j++) {
            blanks.push(new Blank(location))
            location++
        }
    }
}
for(let i = files.length-1; blanks.length > 0; i--) {
    let blank = blanks.shift()
    if(files[i].getLocation() < blank.getLocation()) {
        break
    }
    files[i].changeLocation(blank.getLocation())
}
let total = 0
for(const file of files) {
    total += file.getId() * file.getLocation()
}
console.log(total)