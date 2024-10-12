// load the config files into an object

const { token } = require('./config/token.json');
const channels = require('./config/channels.json');

exports.token = token;
exports.channels = channels;
