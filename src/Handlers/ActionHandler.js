const ActionEventMgr = require('../Mangers/ActionEventMgr');

class ActionHandler {
    constructor() {
        console.log();

        ActionEventMgr.on('cmd:start', this.onStartCmd);

        ActionEventMgr.on('text', this.onText);
        ActionEventMgr.on('sticker', this.onSticker);

    }

    onStartCmd(ctx) {
        ctx.reply('tak i za sho?');
    }

    onText(ctx) {
        ctx.reply('Text it is good for me');
    }

    onSticker(ctx) {
        ctx.reply('Sticker');
    }
}

module.exports = ActionHandler;
