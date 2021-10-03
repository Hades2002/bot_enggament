# **BOT ENGGAMENT**
### Este proyecto fue crear una lista que se inicie y cierre automáticamente, y ademas con un comando puedan ingresar a la lista en el intervalo de tiempo que le definieron.

Librerias que necesitaras **node-telegram-bot-api** y **node-cron**
```
npm install
```
## Tiempo ahorrado 
**Manualmente:** Se demoran más de una hora, aparte tiene que estar esperando a cada uno si va registrar o no.
<br>**Con el BOT:** Se **ahorra** mas del **90%** del tiempo. No necesita esperar, lo tiene que colocar un comando. Y la lista se abre, cierra automaticamente.

# **COMANDOS PARA EL CLIENTE:**
```
> /start                         | Envia un mensaje introductorio.
> /add + tu usuario de instagram | Para poder agregarte a la lista
> /edit + tu usuario             | Para editar tu usuario de la lista
```

# **COMANDOS PARA EL ADMINISTRADOR:**
``` 
> /starlist | Inicia la lista manualmente.
> /finalize | Finalizara manualmente la lista
> /clock    | Retornara la hora local donde esta hosteado
> /chatid   | Retonara el chatid del canal
```

**¿Que hace node-cron?**
<br>**Node-cron** ejecutara la hora que le asigne el cliente automaticamente todo los metodos **Welcome(chatId)** y **OpenChat(chatId, true)** luego de una hora **OpenChat(chatId, false)**, luego se mostrara todos los usuarios que ingresaron en ese intervalo de tiempo **Result(chatId)** automaticamente sin la supervision de un humano.

**Que hora es la que va leer, la del servidor o le podemos definir alguna**
<br>Si no asignamos un timezone en el evento por defecto leera la zona del servidor pero en este caso timezone: **"America/Argentina/Buenos_Aires"**


**EXPLICACIONES DE LOS METODOS**
```
Result(chatid)         | Mostrara en pantalla todos los usuarios que se registraron en la lista
Welcome(chatid)        | Mostrara en pantalla un mensaje de introduccion y como  registrarse...
OpenChat(bool, chatid) | Dar permisos para hablar.
```