const app = require('../settings/app');

app.bot.onText(/^\/add/, (msg, match) => {
    const chatId = msg.chat.id;
    var estaRepetido=false;
    const mention =`[${msg.from.first_name}](tg://user?id=${msg.from.id})`
    var mensaje=msg.text;
    var igUserADD=mensaje.replace('/add ',"").trim()

    if(app.lista === false){
        app.bot.sendMessage(chatId,'La lista esta cerrada💤',{parse_mode : "Markdown"});
    }else{
        if(mensaje === '/add'){
            app.bot.sendMessage(chatId,'Tienes que colocar tu ususario de instagram\n👉 /add+tu usuario sin el @')
        }else{
            app.listado.find(item =>{
                if(item.idUser === msg.from.id){
                    estaRepetido=true;
                    app.bot.sendMessage(chatId,mention+' - Usted no se puede registrar dos veces🛑\nSí ingreso mal su usuario use el comando /edit',{parse_mode : "Markdown"});
                    return;
                }
            })
            if(app.lista && estaRepetido === false){
                app.listado.push({
                name: msg.from.first_name,
                igUser: igUserADD,
                idUser: msg.from.id,
                count: app.listado.length+1
            })
            app.bot.sendMessage(chatId,mention+' - Su instagram se agregó con exito.\n👉 Se registró como: instagram.com/'+igUserADD,{parse_mode : "Markdown"});
            }
        }
    }
});