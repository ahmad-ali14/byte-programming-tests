/**
 * problem: 01-general, checkSum
 * Author: Ahmad Ali,
 * Email:  ahmad.ali14@zohomail.eu
 * For: LAURA HENDERSON @byte-london
 *  ** 2 solutions provided, a naive one, then a more efficient solution **
 */


/**
 * From the problem statement, assuming that the raw data will alaways be a string, with no spaces.
 * @param {string} rawData 
 * @returns {number} the sum of all digits that match the next digit in the list
 */
const checkSum = (rawData) => {
    /**
     * if the raw data is not string return;
     * 
     * IMPORTANT: we might think of the data to be supplied as a numbers, or long sequence of numbers but I'm not going to handle that in this context.
     * 
     * IMPORTANT: I assumed that the raw data is supplied without spaces, if there are spaces we need to think wether we can just skip the space or consider it as 0 or if there is another criteirea, it reallly depeends on the wider context of the problem.
     *  
     * */
    if (typeof rawData !== 'string') {
        return console.error('data is not valid, please check the type of the data being supplied');
    }

    // initializing our result
    let result = 0;

    // extract an array of the supplied string
    let data = rawData.split('');

    // checking every element with its next
    for (let i = 0; i < data.length; i++) {
        let next = i + 1;

        // checking the last element with first one.
        if (i === data.length - 1) { next = 0; }
        if (data[i] === data[next]) {

            // if the 2 elements match, add to the result
            result += Number(data[i])
        }
    }

    return result;
}


/**
 * Run Time Analysis:
 * assuming that n is the number of chars in the supplied string, our function costs:
 * 1- splitting the string and assign it to data variable: constant * n => O(n).
 * 2- looping over the data array and do the checks: constant * n => O(n).
 * 3- if we found match, converting to a number and add to result {WORST CASE}: constant * n => O(n).
 * 
 * Total Time Cost: O(n).
 * 
 * Notes: 
 * - we only converting the element into number only if we found a match, saving resources.
 */


/***
 * Enhancemnts:
 * we skip the part of splitting by doing this,
 * in theory we are saving 1/3 of the time required by the first function.
 * 
 * */

/**
* @param {string} rawData 
* @returns {number} the sum of all digits that match the next digit in the list
*/
const checkSumEnhanced = (rawData) => {
    if (typeof rawData !== 'string') {
        console.error('data is not valid, please check the type of the data being supplied');

        return false;
    }

    let result = 0;

    // checking every element with its next
    for (let i = 0; i < rawData.length; i++) {
        let next = i + 1;

        // checking the last element with first one.
        if (i === data.length - 1) { next = 0; }
        if (rawData.charAt(i) === rawData.charAt(next)) {

            // if the 2 elements match, add to the result
            result += Number(rawData.charAt(i))
        }
    }

    return result;
}



/**
 * TESTING:
 * I'm not going to use any testing library, just to keep things simple
 */


// define tests
const runTests = (func) => {
    // loading test data 
    let testData = require('./testData');

    testData.map(testEntry => {
        let testResult = func(testEntry.input);
        if (testResult === testEntry.expected) {
            console.log('\x1b[32m', `test Passed, input: ${testEntry.input} , result: ${testEntry.expected} `)
        } else {
            console.log('\x1b[31m', `test Failed, input: ${testEntry.input} , result: ${testResult} `)
        }
    })
}

// run tests
runTests(checkSum);