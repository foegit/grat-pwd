const Telegraf = require('telegraf');
const express = require('express');

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

        console.log('App', this.config);

        if (this.config.mode === 'webhook') {
            this.initWebhook();
        }

        this.initBotHandlers();
    }

    initBotHandlers () {
        this.bot.on('text', (ctx) => {
            ctx.reply('👍');
        });
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
