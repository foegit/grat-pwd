const Event = require('events');

class ActionEventMgr extends Event {
    constructor() {
        super();
    }

    createTgListener(eventName) {
        return ctx => this.emit(eventName, ctx);
    }
}

module.exports = new ActionEventMgr();
