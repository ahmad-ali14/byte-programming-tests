/**
 * problem: 03-sql, SQL Schema
 * Author: Ahmad Ali,
 * Email:  ahmad.ali14@zohomail.eu
 * For: LAURA HENDERSON @byte-london
 * 
 * ** 2 solutions provided, a function for generating PSID,  tests **
 */


/**
 * Function that generate PSID, string based identifer.
 */
const createPsid = require('./createPsid');


//============================================================================================//

/**
 * I've used MYSQL
 * for this question, I tought of 2 posible cenarios, and there might be more:
 */

/**
 * In case, last_ad_referral needs to be json, this is the SQL command to create the required table
 */
var sqlCreateTable = `CREATE TABLE users (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    PSID VARCHAR(512),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    profile_pic VARCHAR(512) CHARACTER SET 'ascii' COLLATE 'ascii_general_ci' NOT NULL,
    locale VARCHAR(255),
    timezone TINYINT,
    gender VARCHAR(255),
    last_ad_referral json,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (id)
     )`;

//=================================================================================================//


/**
 * In case, last_ad_referral needs to be stored on its stand alone table, this is the SQL command to create the required table
 */

var sqlCreateTableJoin = `CREATE TABLE users_foreign (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    PSID VARCHAR(512),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    profile_pic VARCHAR(512) CHARACTER SET 'ascii' COLLATE 'ascii_general_ci' NOT NULL,
    locale VARCHAR(255),
    timezone TINYINT,
    gender VARCHAR(255),
    last_ad_referral_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (id),
     FOREIGN KEY (last_ad_referral_id) REFERENCES ads(id)
     )`;


//================================================================================================//




/****
 * TESTING, In order to test the commands:
 * 1- run the `npm install`.
 * 2- fill up config.js with the required data, or any env file.
 * 3- choose the command you want to execute and pass it to runTest function
 * 4- watch the changes in your db.
 * 
 */

var mysql = require('mysql');

var config = require('./config');


var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


const runTest = require('./testFunctions');

/**
 * pass one of these commands to run tests function, plase copy them as they are:
 * 1- CREATE_THE_TABLE
 * 2- INSERT_INTO_THE_TABLE
 * 3- UPDATE_THE_TABLE_USER
 * 4- GET_THE_TABLE_DATA
 * 5- DROP_THE_TABLE
 * 
 * 
 * IMPORTANT: for INSERT_INTO_THE_TABLE command, you need to provide the data as the example on line 114
 */

/**
 * Example of create `useres` table test
 */

runTest('GET_THE_TABLE_DATA', con);

/**
 * one Example of INSERT_INTO_THE_TABLE command, 
 * plaes unmomment line 122 to run it.
 */

let adverObject = { "source": "ADS", "type": "OPEN_THREAD", "ad_id": "6045246247433" };

let porfileValues = ["Peter", "Chang", "https://example.com/13055603_10105219398495383_8237637584159975445_n.jpg", "en_US", -7, "male"];

//runTest('INSERT_INTO_THE_TABLE', con, { adverObject, porfileValues });



