const App = require('@/App');
const Config = require('@/util/Config');

Config.loadEnv();

const app = new App({
    token: Config.get('BOT_TOKEN'),
    mode: Config.get('BOT_mode', 'pulling'),
    webhookServer: Config.get('BOT_WEBHOOK_SERVER'),
    webhookPort: Config.get('PORT', 3000)
});

app.launch();
