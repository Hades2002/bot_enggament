# bot_enggament
Este proyecto fue crear una lista que se inicie y cierre automáticamente y que con un comando pueda ingresar a la lista en ese intervalo de tiempo.

Librerias necesitadas telegraf y node-cron
Node-cron para ejecutar ciertos eventos en determinados tiempos propuestos por el cliente.

**COMANDOS PARA EL CLIENTE:**
* /start => envia un mensaje introductorio.
* /add + tu usuario de instagram => para poder agregarte a la lista
* /edit + tu usuario => para editar tu usuario de la lista


**COMANDOS PARA EL ADMINISTRADOR:**
* /iniciar => inicia la lista manualmente.
* /finalizar => finalizara manualmente la lista
* /hora => retornara la hora local donde esta hosteado
* /chatid => retonara el chatid del canal


**¿Que hace node-cron?**
**Node-cron** ejecutara la hora que le asigne el cliente automaticamente los metodos **abrirchat()** y **bienvenido()** luego de una hora o mas va a **cerrarchat()** y mostrara todos los usuarios que ingresaron en ese intervalo de tiempo **resultado()** automaticamente sin la supervision de un humano.

**Que hora es la que va leer, la del servidor o la que nosotros le digamos**
Si no asignamos un timezone en el evento por defecto leera la zona del servidor en este caso timezone: "America/Argentina/Buenos_Aires"


**EXPLICACIONES DE LOS METODOS Y FUNCIONES**
* resultado() => Mostrara en pantalla todos los usuarios que se registraron en la lista
* bienvenido() => Mostrara en pantalla un mensaje de introduccion y como  registrarse...
* abrirchat() => Puede hablar todo el mundo
* cerrarchat() => Solamente pueden hablar admins (Este comando es especialmente que cuando se cierra la lista no pueda hablar nadie)
* verificarid() => Verificara si el mensaje que se mando es del canal oficial, si no es asi por ende no se ejecutara el comando.
