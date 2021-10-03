const app = require('../settings/app');

const OpenChat = (chatId,can_send_msg=true) => {
    permissions = {'can_send_messages': can_send_msg}
    app.bot.setChatPermissions(chatId,permissions);
}

const Welcome = (chatId) => {
    app.bot.sendMessage(chatId,
        '🏁¡COMIENZA LA LISTA DE ENGAGEMENT!🏁\n\n'+
        '☑️INTERACCIONES\n'+
        '👉 Están son las interacciones que se darán mutuamente cuando cierre la lista de engagement:\n\n'+
        '♥️ 1x1 Me gusta\n'+
        '📃 1x1 Comentario\n'+
        '💾 1x1 Guardar\n'+
        '👥 1x1 Seguir\n'+
        '🚩 PARA PARTICIPAR 🚩\n'+
        'Escribe el comando /add y pon el usuario de tu instagram.\n'+
        '👉 Para poner tu usuario de Instagram debes, hacer lo siguiente\n\n'+
        '👉 Escribe: /add + (Aquí debes poner tu nombre de usuario, recuerda que NO lo debes poner con el @)\n\n'+
        '🔹Ejemplo:\n\n'+
        '✔️/add Usuario\n'+
        '✖️/add @Usuario\n'+
        '✖️/add instagram.com/Usuario\n\n'+
        '⚠️ El mensaje que envíes para participar debe tenér bien puesto el usuario de instagram ⚠️\n\n'+
        '💢 Si tienes que salir de la Lista. Escribe el comando /salir\n\n'+
        '💢 Si tienes que hacer una corrección a tu usuario.\n Usa el comando /edit y coloca correctamente el usuario.\n\n'+
        '🔹Ejemplo:\n\n'+
        '👉 Escribe: /edit + (Aquí debes poner tu usuario correctamente)\n\n'+
        '👇 AQUÍ COMIENZA LA LISTA DE PARTICIPANTES 👇\n\n');
}

const Result = (chatId) => {
    const fixex = app.listado.reduce((acc, cur) => acc + `${cur.count} ${cur.name}\ninstagram.com/${cur.igUser}\n➖➖➖➖\n`,"");
    app.bot.sendMessage(chatId,
    '🔏¡LISTA DE ENGAGEMENT CERRADA!🔏\n\n'+
    'INTERACCIONES ✍️\n'+
    '♥️ 1x1 Like\n'+
    '📃 1x1 Comentario\n'+
    '(No comentar emojis)\n'+
    '💾 1x1 Guardado\n'+
    '👥 1x1 Seguir\n'+
    '(LA INTERRACION DEBE SER A LA ULTIMA PUBLICACION)\n\n'+
    'LISTA 👇\n➖➖➖➖\n'+
    fixex+
    '\n👉¡COMPLETEN LA LISTA Y AVISENME AL PRIVADO, DICIENDOME, QUE HAN TERMINADO!👈\n\n'+
    '⌛️ Tienen tiempo hasta las 22:00 🇦🇷 (Hora Arg) para completar la lista\n'+
    '⚠️ ¡EN EL CASO DE QUE NO COMPLETEN LA LISTA, SE LAS SANCIONARA Y NO PODRAN VOLVER A UNIRSE, A NO SER QUE APELE Y SE DISCULPE POR NO COMPLETAR! ⚠️\n\n'+
    '👉 No olviden que cuando me avisen que han terminado la lista deben, mandar captura de los GUARDADOS 👈\n\n'+
    '💢 Para ir a ver sus guardados y sacar la captura para enviar para verificar que hayan completado la lista deben:\n\n'+
    '👉Ir al inicio de su perfil.\n\n'+
    '👉Van a las 3 Líneas 1 encima de la otra de la parte de arriba a la derecha\n\n'+
    '👉Van dónde dice guardado.\n\n'+
    '👇Y ahí sacan CAPTURAS de todos los guardados\n\n'+
    '💢 Las capturas la deberan enviar al administrador\n\n');
}

module.exports = {Welcome, Result, OpenChat}