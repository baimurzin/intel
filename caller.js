/**
 * Created by vlad on 15.11.2015.
 */
var nexmo = require('easynexmo');
var request = require('request');
function Call(nom) {
    var t = "https://api.nexmo.com/tts/xml?api_key=2b2ed97f&api_secret=e4c59979&to="+nom+"&lg=ru-ru&text=%20%20%20%20%20%20%20%20%20%20%20---------------------------------------------------------------%20%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%20%D0%92%D1%8B%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D1%87%D1%82%D0%BE%20%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB%D0%B8%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D1%83%20%D0%BD%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D1%83%20%D0%B2%D0%BE%D0%B4%D1%8B%20%D0%97%D0%B0%D1%8F%D0%B2%D0%BA%D0%B0---------------------------%20%20%D0%BF%D1%80%D0%B8%D0%BD%D1%8F%D1%82%D0%B0%20%20%D0%B8%20%20%20%D0%BE%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BE%20%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%20%D1%81%20%20%D0%B4%D0%B0%D1%82%D0%BE%D0%B9%20%20%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8%20%20";
    request.get(t);
    console.log("start");
}

module.exports = Call;