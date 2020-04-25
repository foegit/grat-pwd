const mongoose = require('mongoose');

const GlobalEventMgr = require('../Mangers/GlobalEventMgr');

class Database {
    static connect() {
        mongoose.Promise = global.Promise;
        const connection = mongoose.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds243931.mlab.com:43931/test-db`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        mongoose.connection.on('error', async (err) => {
            GlobalEventMgr.emit('Database:connectionFailed', err);
        });

        mongoose.connection.on('open', () => {
            console.log('hi');
            GlobalEventMgr.emit('Database:connected', connection);
        });
    }
}

module.exports = Database;
