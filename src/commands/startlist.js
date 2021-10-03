const app = require('../settings/app');
const {Welcome, OpenChat} = require('../helper/initial_methods');

app.bot.onText(/^\/startlist/, (message, match) => {
    const chatId = message.chat.id;
    app.bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
        if ((data.status == "creator") || (data.status == "administrator")){
            app.lista=true;
            OpenChat(chatId, true);
            Welcome(chatId)
        }else{
            app.bot.sendMessage(chatId,'Este comando solo lo pueden usar administradores💢')
        }
    });
});
    