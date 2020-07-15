const crypto = require('crypto');

module.exports = (s) => {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
        .update(s)
        .digest('hex');
    return hash;
}