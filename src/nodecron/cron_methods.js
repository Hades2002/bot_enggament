const app = require('../settings/app');
const cron = require("node-cron");
const { OpenChat, Welcome, Result } = require('../helper/initial_methods');

// Ready in the morning
//  Stopwatch 12:00*
cron.schedule('0 12 * * *', () =>{
    app.listado.length = 0;
    app.lista=true;
    OpenChat(process.env.CHAT_ID,true);
    Welcome(process.env.CHAT_ID);
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
//  Stopwatch 13:00*
cron.schedule('0 13 * * *', () =>{
    app.lista=false;
    OpenChat(process.env.CHAT_ID,false);
    Result(process.env.CHAT_ID);
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// List in the afternoon
//  Stopwatch 19:00*
cron.schedule('0 19 * * *', () =>{
    app.listado.length = 0;
    app.lista=true;
    OpenChat(process.env.CHAT_ID,true);
    Welcome(process.env.CHAT_ID);
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
//  Stopwatch 20:00*
cron.schedule('0 20 * * *', () =>{
    app.lista=false;
    OpenChat(process.env.CHAT_ID,false);
    Result(process.env.CHAT_ID);
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});