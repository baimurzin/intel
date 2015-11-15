/**
 * Created by vlad on 15.11.2015.
 */
var nexmo = require('easynexmo');
var Tele = require('./app/service/TelephoneApi');

var telephone = new Tele();
telephone.on('debug', console.log)

telephone.call("79372895036", {
    text: 'Привет+это+тестовое+сообщение+идет+тестирование+системы',
    lg:'ru-ru'
}, console.log);

telephone.sendMessage("79372895036", '79372895036','test', console.log)