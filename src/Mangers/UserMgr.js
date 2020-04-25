const GlobalEventMgr = './GlobalEventMgr.js';
const UserModel = '../database/Models/UserModel';

class UserMgr {
    static async createUser(ctx) {
        try {
            const { from, chat } = ctx;

            const newPlayer = new UserModel({
                telegramId: from.id,
                chatId: chat.id,
                userName: from.username,
                registerDate: Date.now(),
                secretEncrypted: 'secret'
            });

            const savedUser = await newPlayer.save();

            GlobalEventMgr.emit('user:created', savedUser);
        } catch (err) {
            GlobalEventMgr.emit('user:creationFailed', err);
        }
    }
}

module.exports = UserMgr;