const mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interview"
});


var x;

let sql1 = "SELECT year(created_at) as year, MONTH(created_at) as month, COUNT(*) as number_of_events FROM `events` GROUP By DATE_FORMAT(created_at,'%Y-%m')";

let sql3 = `SELECT year(created_at) as year, MONTH(created_at) as month, COUNT(*) as number_of_events FROM events Where event_data = '{"StateName": "reorder-pay" }' GROUP By DATE_FORMAT(created_at,'%Y-%m')`;

let sql2 = "SELECT COUNT(*) over( PARTITION BY MONTH(created_at) ) FROM `events` WHERE Month(created_at) =2 AND year(created_at) =2020"
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(sql3, function (err, result) {
        if (err) throw err;
        // console.log(result);
        x = result;
        console.log('done');
        console.log('x', x);

        con.end();
    });
});
