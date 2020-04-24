const dotenv = require('dotenv');

class Config {
    static loadEnv() {
        dotenv.config();
    }

    static get(key, defaultValue='') {
        return process.env[key] || defaultValue;
    }
}

module.exports = Config;
