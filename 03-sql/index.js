var mysql = require('mysql');
const crypto = require('crypto');

const createPsid = (s) => {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
        .update(s)
        .digest('hex');
    return hash;
}



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interview"
});



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

let oneAddOject = { "source": "ADS", "type": "OPEN_THREAD", "ad_id": "6045246247433" };

let porfileValues = ["Peter", "Chang", "https://example.com/13055603_10105219398495383_8237637584159975445_n.jpg", "en_US", -7, "male"];

var sqlInsertAprofile = `INSERT INTO users(PSID, first_name,last_name,profile_pic,locale,timezone,gender,last_ad_referral)
VALUES ('${createPsid(porfileValues[0] + porfileValues[1])}', '${porfileValues.join("','")}', '${JSON.stringify(oneAddOject)}'); `;

let sqlUpdateProfile = ` UPDATE users
SET gender = "female"
WHERE id=1;`


var sqlDeleteTable = "DROP TABLE users;";


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(sqlCreateTableJoin, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log('done');
        con.end();
    });
});


