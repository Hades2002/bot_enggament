const app = require('../settings/app');

app.bot.onText(/^\/edit/, (msg, match) => {
    const chatId = msg.chat.id;
    var mensaje=msg.text
    const mention =`[${msg.from.first_name}](tg://user?id=${msg.from.id})`
    var igUserEDIT=mensaje.replace('/edit ',"").trim()
    if(mensaje === '/edit'){
        app.bot.sendMessage(chatId,'Tienes que colocar de vuelta tu usuario de instagram correctamente\n👉 /edit+tu usuario de ins. sin el @')
    }else{
        if(app.lista){
            app.listado.find(item =>{
                if(item.idUser === msg.from.id){
                    item.igUser = igUserEDIT
                    app.bot.sendMessage(chatId,mention+' - Su instagram fue editado *CORRECTAMENTE*\n 👉Ahora es: instagram.com/'+item.igUser,{parse_mode : "Markdown"})
                }
            })
        }else{
            app.bot.sendMessage(chatId,'La lista esta cerrada📃')
        }
    }
});