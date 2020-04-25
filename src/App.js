const Telegraf = require('telegraf');
const express = require('express');

const ActionEventMgr = require('./Mangers/ActionEventMgr');
const ActionHandler = require('./Handlers/ActionHandler');
const Database = require('./database/Database');

const defaultConfig = {
    token: null,
    useWebhook: false,
    webhookServer: null,
    webhookEndpoint: '/bot',
    webhookPort: 3000
};

class App {
    constructor (config) {
        this.config = { ...defaultConfig, ...config };

        this.bot = new Telegraf(this.config.token);

        if (this.config.mode === 'webhook') {
            this.initWebhook();
        }

        this.initBotHandlers();

        this.db = Database.connect();
        this.actionHandler = new ActionHandler();
    }

    initBotHandlers () {
        this.bot.command('/start', ActionEventMgr.createTgListener('cmd:start'));

        this.bot.on('text', ActionEventMgr.createTgListener('text'));
        this.bot.on('sticker', ActionEventMgr.createTgListener('sticker'));
    }

    initWebhook() {
        const { bot, config } = this;

        const expressApp = express();

        expressApp.use(bot.webhookCallback(config.webhookEndpoint));

        bot.telegram.setWebhook(`${config.webhookServer}${config.webhookEndpoint}`);

        this.expressApp = expressApp;
    }

    launch() {
        const { bot, expressApp, config } = this;

        if (config.mode === 'webhook') {
            expressApp.listen(config.webhookPort, () => {
                console.log('Server starts on 3000!');
            });
        } else {
            bot.launch();
        }
    }
}

module.exports = App;
