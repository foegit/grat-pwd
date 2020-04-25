const mongoose = require('mongoose');

const Player = mongoose.Schema({
    tid: {
        type: mongoose.Schema.Types.Number,
        index: true,
        unique: true,
    },
    chatId: {
        type: mongoose.Schema.Types.Number,
        index: true,
        unique: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
    },
    registerDate: {
        type: mongoose.Schema.Types.Date,
    },
    lastVerification: {
        type: mongoose.Schema.Types.Date,
    },
    secretEncrypted: {
        type: mongoose.Schema.Types.String,
    }
});

module.exports = mongoose.model('Player', Player);