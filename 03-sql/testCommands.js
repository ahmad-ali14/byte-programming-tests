module.exports = {
    createTable: `CREATE TABLE users (
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
         )`,
    updateTable: ` UPDATE users
                    SET gender = "female"
                    WHERE id=1;`
}