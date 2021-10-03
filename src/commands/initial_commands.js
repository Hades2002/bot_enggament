const app = require('../settings/app');

app.bot.onText(/^\/start/, (msg) => {
    const chatId = msg.chat.id;
    app.bot.sendMessage(chatId,
        '✅COMANDOS PARA EL USUARIO✅\n'+
        '🔹Comando /ADD : para añadirse a la lista🔹\n'+
        '👉/add+usuario de instagram\n'+
        '💢Ejemplo\n'+
        '✔️/add steve\n\n'+
        '🔹Comando /EDIT : para editar su usuario de instagram🔹\n'+
        '👉/edit+nuevo usuario de instagram\n'+
        '💢Ejemplo\n'+
        '✔️/edit stevejobs\n\n'+
        '🔹Comando /GETOUT : para irse de la lista🔹\n'+
        '💢Ejemplo\n'+
        '✔️/salir\n\n'+
        '🛑COMANDOS SOLO PARA ADMINISTRADORES🛑\n'+
        '/STARTLIST - para inciar manualmente la lista\n'+
        '/FINALIZE - para finalizar manualmente la lista\n');
});

app.bot.onText(/^\/chatid/, (msg) => {
    const chatId = msg.chat.id;
    app.bot.sendMessage(chatId, "El id de este chat es: " + chatId);  
});

app.bot.onText(/^\/clock/, (msg) =>{
    const chatId = msg.chat.id;
    var hoy = new Date()
    var hora = 'Hora del servidor '+hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    app.bot.sendMessage(chatId,hora);
})
