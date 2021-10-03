const app = require('../settings/app');
const {Result, OpenChat} = require('../helper/initial_methods');

app.bot.onText(/^\/finalize/, (message, match) => {
    const chatId = message.chat.id;
    app.bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
        if ((data.status == "creator") || (data.status == "administrator")){
            app.lista=false;
            OpenChat(chatId,false);
            Result(chatId);
        }else{
            app.bot.sendMessage(chatId,'Este comando solo lo pueden usar administradores💢')
        }
    });
});