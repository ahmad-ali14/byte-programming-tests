/**
 * problem: 04-sql, SQL Querying
 * Author: Ahmad Ali,
 * Email:  ahmad.ali14@zohomail.eu
 * For: LAURA HENDERSON @byte-london
 * 
 * ** 2 solutions provided, NO tests, screenshot of expected results, discussion about the performance **
 */


/***
 * for this problem, honestly everything is depending on the other part of the application, but generally spaeking I can provide you with these 2 commands
 */

/** 
 * From my understanding of the problem, my basic command will be like this
 *
 * 
 * Basic command, 
 * 
 * SELECT * FROM `events` WHERE bot_id = 1 AND JSON_VALUE(event_data, '$.StateName') = 'reorder' AND MONTH(created_at) = 5
 * 
 * OR, if you want only the count,
 * 
 * SELECT COUNT(*) as number_of_events FROM `events` WHERE bot_id = 1 AND JSON_VALUE(event_data, '$.StateName') = 'reorder' AND MONTH(created_at) = 5

*
 */


/**
 * 
 * @param {*} con __ mysql connection
 * @param {number} botId 
 * @param {string} eventState 
 * @param { number} yr 
 * @param {number} mnth 
 * @returns {Array} the number of rows where the above conditios are applied 
 */

const CountEvents = (con, botId, eventState, yr, mnth) => {
    // the query
    let sql = `SELECT COUNT(*) as 'number_of_${eventState}_AT_${mnth}_IN_${yr}' FROM events WHERE bot_id = ${botId} AND JSON_VALUE(event_data, '$.StateName') = '${eventState}' AND MONTH(created_at) = ${mnth} AND YEAR(created_at) = ${yr}`;

    // execute the query
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log('done');
    });

}

/**
 * 
 * @param {*} con __ mysql connection
 * @param {number} botId 
 * @param { number} yr 
 * @param {number} mnth 
 * @returns {Array} track all of the three stateEvents where the above condions applied
 */
const trackEvents = (con, botId, mnth, yr) => {
    CountEvents(con, botId, 'reorder-pay', yr, mnth);
    CountEvents(con, botId, 'reorder', yr, mnth);
    CountEvents(con, botId, 'reorder-allergy-info', yr, mnth);

    con.end()
}


const mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interview"
});

/**
 * TESTING, I'm not going to provide propper testing for this, but in case you want to try tests 
 * there are some commands in the file ./notes.md you can use them.
 */

trackEvents(con, 1, 5, 2020);

// example of result (screenshot): https://i.imgur.com/50m0QD0.png




/***
 * 
 * Performance discusion:
 * 
 * to enhance the performance of this query we really need to think of the following:
 * 1 - what's heppening on the other parts of the App.
 * 2- how the data flows between those App parts.
 * 3- the frequency of Querying.
 * 4- wether you want the data to uptodate with moment, or you allow the last hour or the last day NOT to be calculated with the results.
 * 
 * 
 * After Looking deeply on those parts, we might think of some solutions:
 * 1- store the data in a different way, seprating every table.
 * 2- cache the data by partioning the main table into some temproray tables corresponding to the year , month , state event. we can redirect our query to use one of those cached tables instead of the main table. we need to put storage cost into consederation. the cached tables will be updated every certain amount of time.
 * 3- we can make some queries before the user ask for them, then we store the results somewhere on our server, and we might process this cached data insted of Querying the db, agin this needs more specifications of the App status. for Examples we can use this commands.  
 */



/**
 * Examples of commands can be used to cache the expected queries on our server before they are required by the user.
 */

/*
* returns a table of all the events in a certain month of a certain year, 
* by doing this we will create 12 more tables for every year each of them contains all the events on that month.
*/
let sql1 = "SELECT year(created_at) as year, MONTH(created_at) as month, COUNT(*) as number_of_events FROM `events` GROUP By DATE_FORMAT(created_at,'%Y-%m')";



/*
* returns a table of all the events with a certain eventState in a certain month of a certain year, 
* by doing this we will create 12 more tables for every year multiplied by the number of event states, each of the tables contains all the events with that eventState on that month.
*/

let sql3 = `SELECT year(created_at) as year, MONTH(created_at) as month, COUNT(*) as number_of_events FROM events Where event_data = '{"StateName": "reorder-pay" }' GROUP By DATE_FORMAT(created_at,'%Y-%m')`;


/*
* returns a table of number of all of the events  in a certain month of a certain year, 
* by doing this we will create 1 more table contains  the number of events on a month.
*/

let sql2 = "SELECT COUNT(*) over( PARTITION BY MONTH(created_at) ) FROM `events` WHERE Month(created_at) =2 AND year(created_at) =2020"






