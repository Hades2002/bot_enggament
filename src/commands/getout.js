const app = require('../settings/app');

app.bot.onText(/^\/getout/, (msg, match) => {
    const chatId = msg.chat.id;
    const mention =`[${msg.from.first_name}](tg://user?id=${msg.from.id})`
    var salir =' ❌SE RETIRÓ❌'
    if(app.lista){
        app.listado.find(item =>{
         if(item.idUser === msg.from.id){
            app.bot.sendMessage(chatId,mention+' - instagram.com/'+item.igUser+' | Se fue de la lista💤',{parse_mode : "Markdown"})
            item.igUser = item.igUser+' '+salir
            item.idUser = 0
         }
        })
    }else{
        app.bot.sendMessage(chatId,'La lista esta cerrada📃')
    }   
});