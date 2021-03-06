/**
 * problem: 02-general, checkSumTSV
 * Author: Ahmad Ali,
 * Email:  ahmad.ali14@zohomail.eu
 * For: LAURA HENDERSON @byte-london
 * 
 * ** 2 solutions provided, a naive one, then a more efficient solution **
 */


var path = require('path');
const fs = require('fs');
const readline = require('readline');


/**
 * from the problem statemnt, we are assuming that the data is provided as tsv file written in English only.
 * @param {string} tsvFilePath 
 * @returns {number} the sum of all of these differences between the max and min value in each row.
 */

const checkSumTSV = (tsvFilePath) => {

    /**
     * if Not a tsv file return;
     * 
     * IMPORTANT: although you might provide the as text file or just file, and the function still works I am going to refuse this and only accept tsv files.
     *  */

    if (path.extname(tsvFilePath) !== '.tsv') {
        return console.error('Error', 'wrong file type');
    }

    /**
     * reading the file, 
     * for this context I'm going to use the sync reading function, we don't have any other code to worry about blocking the executeion thread.
     * file Lnaguage: assumed to be english
     */
    let tsvData = fs.readFileSync(tsvFilePath, { encoding: 'utf8', flag: 'r' });


    // extracting the raw lines, splitting over the line break.
    const rawLines = tsvData.split(/\r?\n/);

    let lines = [];

    // extracting the the data from each line and put them in an array.
    rawLines.map(line => {
        console.log(line.split(/\t/));

        lines.push(line.split(/\t/))
    });

    let result = 0;

    lines.map((line) => {
        // convert each element to number
        let NumberedLine = toNumber(line);

        // claculating max and min
        let max = Math.max(...NumberedLine);
        let min = Math.min(...NumberedLine);

        // adding the difference to the result
        result += (max - min);

    });

    return result;
}


/**
 * 
 * @param {Array<string>} _arr
 * @returns {Array<number>} convert each element of the array to number.
 */
const toNumber = (_arr) => {
    let arr = [];
    _arr.map(e => arr.push(Number(e)));
    return arr;
}

// ================================================================================================//

/**
 * Run Time Analysis:
 * assuming that n is the number of rows in the supplied file, m is the number of columns in each row. and n >> m. our function costs:
 * 1- splitting the string and assign it to data variable: constant * n => O(n).
 * 2- looping over the raw data array and do extract data to the new array: constant * m * n => O(n log n).
 * 3- transform each element into a Number, then claculating the max and min and add to the result constant * n ( constant * m + constant * m) => O(n) .
 * 
 * Total Time Cost (worst case): O(n log n).
 * 
 * 
 */

// =============================================================================================//

/***
* Enhancemnts:
* - reading line by line, instead of loading the whole file then work on it.
* - converting the raw data strings into numbers in place.
* 
* 
* */

const checkSumTsvEnhanced = async (tsvFilePath) => {

    // Non tsv files are refused
    if (path.extname(tsvFilePath) !== '.tsv') {
        return console.error('Error', 'wrong file type');
    }

    // processing the file, converting to Numbers and strore each row in an array.
    var lines = await processLineByLine(tsvFilePath);

    // initializing result
    let result = 0;

    // claculating the diff and add it to result
    lines.forEach((line) => {
        result += (Math.max(...line) - Math.min(...line));
    })



    return result;
}



async function processLineByLine(path) {
    // create a stream to read our file
    const fileStream = fs.createReadStream(path);

    // initialize lines 
    let _lines = [];

    //read line intrerface, considering \r\n always refer to a new line (tsv files) 
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // split the line over each tab, convert the value to a number and then push them as an array to lines array.
    for await (const line of rl) {
        let rawValues = line.split(/\t/).map(e => Number(e))
        _lines.push(rawValues);
    }

    return _lines
}


//============================================================================================//


/**
 * TESTING, 
 * 
 *  * I'm not going to use any testing library, just to keep things simple
 */



// define tests
const runTests = (func, testData) => {


    testData.map(testEntry => {
        let testResult = func(testEntry.input);
        if (testResult === testEntry.expected) {
            console.log('\x1b[32m', `test Passed, input: ${testEntry.input} , result: ${testEntry.expected} `)
        } else {
            console.log('\x1b[31m', `test Failed, input: ${testEntry.input} , result: ${testResult} `)
        }
    })
}


// loading test data 
let data = require('./testData');

// run tests
runTests(checkSumTSV, data);

