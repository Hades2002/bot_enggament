require('dotenv').config()
const telegramBOT = require('node-telegram-bot-api');
const token = process.env.KEY_TOKEN;
const bot = new telegramBOT(token, {polling: true});

let lista=false;
let listado = []

module.exports = {lista, listado, bot}