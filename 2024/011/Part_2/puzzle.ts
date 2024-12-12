import { addSyntheticTrailingComment } from 'typescript'
import { readFile } from '../../Utilities/utilities'

const FILEPATH = "2024/011/Part_2/input.txt"
const ITERATIONS = 75

const stones: Record<string, number> = {}
for(const stone of readFile(FILEPATH)[0].split(" ")) {
    addStone(stones, stone)    
}
const result = process(stones)
console.log(Object.values(result).reduce((total, value) => total + value, 0))


function addStone(stoneMap: Record<string, number>, etching: string, value = 1) {
    if(!stoneMap[etching]) {
        stoneMap[etching] = 0
    }
    stoneMap[etching] += value
}

function process(stoneMap: Record<string, number>) {
    let stoneBox = {...stoneMap}
    let iterations = 0
    while (iterations < ITERATIONS) {
        stoneBox = Object.entries(stoneBox).reduce((total, [key, count]) => {
            if(key == "0") {
                addStone(total, "1", count)
            } else if (key.length % 2 == 0){
                addStone(total, key.slice(0, key.length/2), count)
                addStone(total, parseInt(key.slice(key.length/2)), count)
            } else {
                addStone(total, (parseInt(key) * 2024).toString(), count)
            }
            return total
        }, {} as Record<string, number>)
        iterations++
    }
    return stoneBox
}