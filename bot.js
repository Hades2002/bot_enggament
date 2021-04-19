const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.KEY_TOKEN); //Token esta en el host.
const cron = require("node-cron"); //Cronometro
var lista=false;  //Boolean de la lista
var listado = []; //Array

// <MENSAJES AUTOMATIZADOS GRUPO DE ENGGAMENT>
// ABRIR LISTA
cron.schedule('45 11 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID,'LISTA 1 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 18 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID,'LISTA 2 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// CERRAR LISTA
cron.schedule('45 12 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID,'LISTA 1 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 19 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID,'LISTA 2 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️')
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// <MENSAJES AUTOMATIZADOS GRUPO OFICIAL>
var invitacion = {
    reply_markup:{
        inline_keyboard:[
            [
                {text: "👉ENTRAR AL GRUPO DE ENGAGEMENT", url: process.env.URL}
            ]
        ]
    }
}
// ABRIR LISTA
cron.schedule('45 11 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 1 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️',invitacion)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 18 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 2 : EN 15 MINUTOS ABRE LA LISTA DE ENGAGEMENT🏁‼️',invitacion)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// CERRAR LISTA
cron.schedule('45 12 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 1 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️',invitacion)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('45 19 * * *', () =>{
    bot.telegram.sendMessage(process.env.CHAT_ID_OFFICIAL_GROUP,'LISTA 2 : EN 15 MINUTOS CIERRA LA LISTA DE ENGAGEMENT🏁‼️',invitacion)
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

//<LISTA A LA MAÑANA>
//  Cronometro 12:00*
cron.schedule(process.env.OPEN_LIST_ONE, () =>{
    listado.length = 0;
    lista=true;
    abrirchat(); //Abrir el chat
    bienvenido(); //Mensaje de bienvenida
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
//  Cronometro 13:00*
cron.schedule(process.env.LIST_CLOSED_ONE, () =>{
    lista=false;
    cerrarchat(); //Cerrar el chat
    resultado(); //Mostrar resultado
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

//<LISTA A LA TARDE>
//  Cronometro 19:00*
cron.schedule(process.env.OPEN_LIST_TWO, () =>{
    listado.length = 0;
    lista=true;
    abrirchat(); //Abrir el chat
    bienvenido(); //Mensaje de bienvenida
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
//  Cronometro 20:00*
cron.schedule(process.env.LIST_CLOSED_TWO, () =>{
    lista=false;
    cerrarchat(); //Cerrar el chat
    resultado(); //Mostrar resultado
},{
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});

// <COMANDOS>
bot.command(['start'], (ctx) => {
    const chatID = ctx.message.chat.id
    bot.telegram.sendMessage(chatID,
        '✅COMANDOS PARA EL USUARIO✅\n'+
        '🔹Comando /ADD : para añadirse a la lista🔹\n'+
        '👉/add+usuario de instagram\n'+
        '💢Ejemplo\n'+
        '✔️/add steve\n\n'+
        '🔹Comando /EDIT : para editar su usuario de instagram🔹\n'+
        '👉/edit+nuevo usuario de instagram\n'+
        '💢Ejemplo\n'+
        '✔️/edit stevejobs\n\n'+
        '🔹Comando /SALIR : para irse de la lista🔹\n'+
        '💢Ejemplo\n'+
        '✔️/salir\n\n'+
        '🛑COMANDOS SOLO PARA ADMINISTRADORES🛑\n'+
        '/iniciar - para inciar manualmente la lista\n'+
        '/finalizar - para finalizar manualmente la lista\n')
})

//  Comando para iniciar manualmente*
bot.command(['iniciar'], (ctx) => {
if(verificarid(ctx)){
    listado.length = 0;
    bot.telegram.getChatMember(ctx.chat.id, ctx.from.id).then(function(data) {
    if ((data.status == "creator") || (data.status == "administrator")){
        lista=true;
        abrirchat(); //Abrir el chat
        bienvenido(); //Mensaje de bienvenida
    }else{
        ctx.reply('💥ACCESO DENEGADO💥')
        }
    });
}else{
    ctx.reply('Este comando solamente se puede usar en un grupo especifico💢')
}
})

//  Comando para finalizar manualmente*
bot.command(['finalizar'], (ctx) => {
if(verificarid(ctx)){
    bot.telegram.getChatMember(ctx.chat.id, ctx.from.id).then(function(data) {
        if ((data.status == "creator") || (data.status == "administrator")){
            lista=false;
            cerrarchat(); //Cerrar el chat
            resultado(); //Mostrar los resultados
        }else{
            ctx.reply('💥ACCESO DENEGADO💥')
            }
        });
}else{
    ctx.reply('Este comando solamente se puede usar en un grupo especifico💢')
}
})

//  Comando para añadirte a la lista*
bot.command(['add'], (ctx, match) => {
    if(verificarid(ctx)){
    console.log(ctx.from)
    var verificar; //Boolean
    const mention =`[${ctx.from.first_name}](tg://user?id=${ctx.from.id})`
   //Restriccion para no poderse registrar dos veces
    listado.find(item =>{
        if(item.idUser == ctx.from.id){
            return verificar=true;
        }
        else{
            return verificar=false;
        }
    })
    console.log(verificar)
    console.log(ctx.message.text)
    var mensaje=ctx.message.text
    var igUserADD=mensaje.replace('/add ',"").trim()
    //Si la lista esta abierta y verificar es falso. Se ejecuta
    console.log(igUserADD)
    if(mensaje === '/add'|| mensaje === '/add@engagement_rbm_bot'){
    ctx.reply('Tienes que colocar tu ususario de instagram\n👉 /add+tu usuario sin el @')
    }else{
        if(lista && verificar != true){
        listado.push({
        name: ctx.from.first_name,
        igUser: igUserADD,
        idUser: ctx.from.id,
        count: listado.length+1
    })
        ctx.reply(mention+' - Su instagram se agregó con exito.\n👉 Se registró como: instagram.com/'+igUserADD,{parse_mode : "Markdown"});

    }else if(lista==false){
        ctx.reply('La lista esta cerrada💤')
    }
    else if(verificar==true){
        ctx.reply(mention+' - Usted no se puede registrar dos veces🛑\nSí ingreso mal su usuario use el comando /edit',{parse_mode : "Markdown"})
    }
}
}else{
    ctx.reply('Este comando solamente se puede usar en un grupo especifico💢')
}
})

//  Comando para mostrar id del chat*
bot.command(['chatid'], (ctx) =>{
    const chatID = ctx.message.chat.id
    bot.telegram.sendMessage(chatID,'El id de este chat es: '+chatID);
})

//  Comando para editar tu array*
bot.command(['edit'], (ctx) => {
    var mensaje=ctx.message.text
    const mention =`[${ctx.from.first_name}](tg://user?id=${ctx.from.id})`
    var igUserEDIT=mensaje.replace('/edit ',"").trim()
    if(verificarid(ctx)){
    if(mensaje === '/edit'|| mensaje === '/edit@engagement_rbm_bot'){
        ctx.reply('Tienes que colocar de vuelta tu usuario de instagram correctamente\n👉 /edit+tu usuario de ins. sin el @')
    }
    else{
    if(lista){
        listado.find(item =>{
            if(item.idUser == ctx.from.id){
                item.igUser = igUserEDIT
                ctx.reply(mention+' - Su instagram fue editado *CORRECTAMENTE*\n 👉Ahora es: instagram.com/'+item.igUser,{parse_mode : "Markdown"})
            }
        })
    }else{
        ctx.reply('La lista esta cerrada📃')
        }    
    }
}else{
    ctx.reply('Este comando solamente se puede usar en un grupo especifico💢')
}
})

//  Comando para salir de la lista*
bot.command(['salir'], (ctx) => {
    var mensaje=ctx.message.text
    const mention =`[${ctx.from.first_name}](tg://user?id=${ctx.from.id})`
    if(verificarid(ctx)){
    if(mensaje === '/salir@USUARIODELBOT'){
        ctx.reply('Para salir de la lista solamente tienes que escribir el comando\n👉 /salir')
    }else{
            var salir =' ❌SE RETIRÓ❌'
            if(lista){
                listado.find(item =>{
                 if(item.idUser == ctx.from.id){
                    ctx.reply(mention+' - instagram.com/'+item.igUser+' => Se fue de la lista💤',{parse_mode : "Markdown"})
                    item.igUser = item.igUser+' '+salir
                    item.idUser = 0
                 }
            })
            }else{
                ctx.reply('La lista esta cerrada📃')
            }
    }
}
    else{
        ctx.reply('Este comando solamente se puede usar en un grupo especifico💢')
}
})

//  Comando para saber la hora del servidor*
bot.command(['hora'], (ctx) =>{
    var hoy = new Date() //Hora local o del servidor
    var hora = 'Hora del servidor '+hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    ctx.reply(hora)
})

bot.launch(); //Para arrancar el bot.

// <FUNCIONES>

//  Funcion para mostrar el final mas el*
function resultado(){
    const fixex = listado.reduce((acc, cur) => acc + `${cur.count} ${cur.name}\ninstagram.com/${cur.igUser}\n➖➖➖➖\n`,"");
    bot.telegram.sendMessage(process.env.CHAT_ID,
        '🔏¡LISTA DE ENGAGEMENT CERRADA!🔏\n\n'+
        'INTERACCIONES ✍️\n'+
        '♥️ 1x1 Like\n'+
        '📃 1x1 Comentario\n'+
        '(No comentar emojis)\n'+
        '💾 1x1 Guardado\n'+
        '👥 1x1 Seguir\n'+
        '(LA INTERRACION DEBE SER A LA ULTIMA PUBLICACION)\n\n'+
        'LISTA 👇\n➖➖➖➖\n'+
        fixex+
        '\n👉¡COMPLETEN LA LISTA Y AVISENME AL PRIVADO, DICIENDOME, QUE HAN TERMINADO!👈\n\n'+
        '⌛️ Tienen tiempo hasta las 22:00 🇦🇷 (Hora Arg) para completar la lista\n'+
        '⚠️ ¡EN EL CASO DE QUE NO COMPLETEN LA LISTA, SE LAS SANCIONARA Y NO PODRAN VOLVER A UNIRSE, A NO SER QUE APELE Y SE DISCULPE POR NO COMPLETAR! ⚠️\n\n'+
        '👉 No olviden que cuando me avisen que han terminado la lista deben, mandar captura de los GUARDADOS 👈\n\n'+
        '💢 Para ir a ver sus guardados y sacar la captura para enviar para verificar que hayan completado la lista deben:\n\n'+
        '👉Ir al inicio de su perfil.\n\n'+
        '👉Van a las 3 Líneas 1 encima de la otra de la parte de arriba a la derecha\n\n'+
        '👉Van dónde dice guardado.\n\n'+
        '👇Y ahí sacan CAPTURAS de todos los guardados\n\n'+
        '💢 Las capturas la deberan enviar al administrador\n\n'
        );
}
//  Funcion mensaje de bienvenida*
function bienvenido(){
//                          *Codigo CHAT ID.*
    bot.telegram.sendMessage(process.env.CHAT_ID,
        '🏁¡COMIENZA LA LISTA DE ENGAGEMENT!🏁\n\n'+
        '☑️INTERACCIONES\n'+
        '👉 Están son las interacciones que se darán mutuamente cuando cierre la lista de engagement:\n\n'+
        '♥️ 1x1 Me gusta\n'+
        '📃 1x1 Comentario\n'+
        '💾 1x1 Guardar\n'+
        '👥 1x1 Seguir\n'+
        '🚩 PARA PARTICIPAR 🚩\n'+
        'Escribe el comando /add y pon el usuario de tu instagram.\n'+
        '👉 Para poner tu usuario de Instagram debes, hacer lo siguiente\n\n'+
        '👉 Escribe: /add + (Aquí debes poner tu nombre de usuario, recuerda que NO lo debes poner con el @)\n\n'+
        '🔹Ejemplo:\n\n'+
        '✔️/add Usuario\n'+
        '✖️/add @Usuario\n'+
        '✖️/add instagram.com/Usuario\n\n'+
        '⚠️ El mensaje que envíes para participar debe tenér bien puesto el usuario de instagram ⚠️\n\n'+
        '💢 Si tienes que salir de la Lista. Escribe el comando /salir\n\n'+
        '💢 Si tienes que hacer una corrección a tu usuario.\n Usa el comando /edit y coloca correctamente el usuario.\n\n'+
        '🔹Ejemplo:\n\n'+
        '👉 Escribe: /edit + (Aquí debes poner tu usuario correctamente)\n\n'+
        '👇 AQUÍ COMIENZA LA LISTA DE PARTICIPANTES 👇\n\n'
        )
}
//  Funcion para abrir el chat*
function abrirchat(){  
    permissions = {'can_send_messages': true}
//                                 *Codigo CHAT ID.*
    bot.telegram.setChatPermissions(process.env.CHAT_ID,permissions)
}
//  Funcion para cerrar el chat*
function cerrarchat(){
    permissions = {'can_send_messages': false}
//                          *Codigo CHAT ID.*
    bot.telegram.setChatPermissions(process.env.CHAT_ID,permissions)
}
//  Funcion para verificar chat id
function verificarid(ctx) {
    console.log(ctx.chat.id)
    if(ctx.chat.id == process.env.CHAT_ID){
        return true;
    }
    else{
        return false;
    }
}

/**
 * Config Vars
 * CHAT_ID : chat id donde se usara el bot
 * CHAT_ID_OFFICIAL_GROUP : chat id donde se enviara tal aviso que empezara la lista
 * KEY_TOKEN : TOKEN DEL BOT
 * LIST_CLOSED_ONE : Hora de que cierra la primera lista
 * LISTCLOSED_TWO : Hora de que cierra la segunda lista
 * OPEN_LIST_ONE : Hora de abrir la primera lista
 * OPEN_LIST TWO : Hora de abrir la segunda lista.
 * URL : URL de invitacion.
 * */