module.exports = (testName, connection, data = null) => {
    const testCommands = require('./testCommands');
    const createPsid = require('./createPsid')
    if (testName === 'INSERT_INTO_THE_TABLE') {
        if (data === null) {
            throw (new Error('No data provided'));
        }
        if (!data.porfileValues) {
            throw (new Error('No profile data provided'));
        }
        if (!data.adverObject) {
            throw (new Error('No Advert data provided'));
        }
    }


    var porfileValues;
    var adverObject;


    if (data) {
        porfileValues = data.porfileValues;
        adverObject = data.adverObject;
    }

    var sql;

    switch (testName) {
        case 'CREATE_THE_TABLE':
            sql = testCommands.createTable
            break;

        case 'GET_THE_TABLE_DATA':
            sql = "SELECT * FROM users"
            break;

        case 'DROP_THE_TABLE':
            sql = "DROP TABLE users;"
            break;

        case 'UPDATE_THE_TABLE_USER':
            sql = testCommands.updateTable
            break;

        case 'INSERT_INTO_THE_TABLE':
            sql = `INSERT INTO users(PSID, first_name,last_name,profile_pic,locale,timezone,gender,last_ad_referral) VALUES ('${createPsid(porfileValues[0] + porfileValues[1])}', '${porfileValues.join("','")}', '${JSON.stringify(adverObject)}'); `;
            break;

        default:
            break;
    }

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");


        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log('done');
            connection.end();
        });
    });

}