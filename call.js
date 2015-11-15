/**
 * Created by vlad on 15.11.2015.
 */
var nexmo = require('easynexmo');
var Tele = require('./app/service/TelephoneApi');

var request = require("request");
//var telephone = new Tele();
//telephone.on('debug', console.log)
//
//telephone.call("79372895036", {
//    text: 'Привет+это+тестовое+сообщение+идет+тестирование+системы',
//    lg:'ru-ru'
//}, console.log);
//
//telephone.sendMessage("79372895036", '79372895036','test', console.log)
var msg = "Добрый день! Вы только что сделали заявку на доставку воды! Заявка принята и Вам отправлено сообщение с датой доставки";
msg = replaceAll(msg, " ", "+");
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function Call(num) {
    msg = replaceAll(msg, " ", "+");
    var tel = "79372895036";
    var key = "2b2ed97f";
    var secret = "e4c59979";
    var lg = "ru-ru";
    tel = num || tel;
    console.log(msg);
    var t = "https://api.nexmo.com/tts/xml?api_key=" + key + "&api_secret=" + secret + "&to=" + tel + "&lg=" + lg + "&text="+msg;
    console.log(msg);
    console.log("Хай");
    request.get(t)
        .on('response', console.log)
        .on('error', console.log);
    console.log("call started");
}

module.exports = Call;