"use strict";
exports.__esModule = true;
var utilities_1 = require("../../Utilities/utilities");
var FILENAME = "2024/003/Part_2/input.txt";
var data = utilities_1.readFile(FILENAME);
var finalValue = 0;
var enabled = true;
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    for (var i = 0; i < row.length - 4; i++) {
        if (row.substring(i, i + 4) == "do()") {
            enabled = true;
        }
        if (row.substring(i, i + 7) == "don't()") {
            enabled = false;
        }
        if (row.substring(i, i + 4) == "mul(" && enabled) {
            // console.log("mul( found!")
            var inner = row.substring(i + 4, i + 12).split(")")[0];
            if (inner.length <= 7) {
                // console.log("( found adn removed")
                var terms = inner.split(",");
                if (terms[0].length < 4 && terms[0].length > 0 && terms[1].length < 4 && terms[1].length > 0 && terms.length == 2) {
                    // console.log("terms are the right size")
                    var lengthBeforeA = terms[0].length;
                    var lengthBeforeB = terms[1].length;
                    var valueA = terms[0].trim();
                    var valueB = terms[1].trim();
                    if (valueA.length == lengthBeforeA && valueB.length == lengthBeforeB) {
                        // console.log("terms didn't ahve spaces")
                        if (!isNaN(Number(terms[0])) && !isNaN(Number(terms[1]))) {
                            console.log(row.substring(i, i + 12));
                            // console.log("added to total")
                            // console.log("Should tally and count");
                            console.log(Number(terms[0]));
                            console.log(Number(terms[1]));
                            // console.log("---");
                            finalValue += (Number(terms[0]) * Number(terms[1]));
                        }
                    }
                }
            }
        }
    }
}
console.log(finalValue);
