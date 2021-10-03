const app = require('../settings/app');
const cron = require("node-cron");

var invite = {
    reply_markup:{
        inline_keyboard:[
            [
                {text: "👉ENTRAR AL GRUPO DE ENGAGEMENT", url: null}
            ]
        ]
    }
}

// Open list
cron.schedule('45 11 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID,'LISTA 1 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 18 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID,'LISTA 2 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// Close list
cron.schedule('45 12 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID,'LISTA 1 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 19 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID,'LISTA 2 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

////////////////////////////////////////////////////////////////////////////////////////

// Open list
cron.schedule('45 11 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 1 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️',invite)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 18 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 2 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️',invite)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// Close list
cron.schedule('45 12 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 1 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️',invite)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 19 * * *', () =>{
    app.bot.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 2 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️',invite)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});