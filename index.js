const App = require('./src/App');
const Config = require('./src/util/Config');

Config.loadEnv();

const app = new App({
    token: Config.get('BOT_TOKEN'),
    mode: Config.get('BOT_MODE', 'pulling'),
    webhookServer: Config.get('BOT_WEBHOOK_SERVER'),
    webhookPort: Config.get('PORT', 3000)
});

app.launch();
