/**
 * Created by vlad on 15.11.2015.
 */

module.exports = Telephone;

var nexmo = require('easynexmo');
var EventEmitter = require('events').EventEmitter;

require('util').inherits(Telephone, EventEmitter);

function Telephone() {
    EventEmitter.call(this);
    var KEY = process.env.NEXMO_KEY;
    var SECRET = process.env.NEXMO_SECRET;
    if (!KEY || !SECRET) {
        this.emit('debug', 'invalid KEY and/or SECRET nexmo API. Please add to system environment.');
    }
     KEY = '2b2ed97f';
     SECRET = 'e4c59979';
    nexmo.initialize(KEY, SECRET);
}

Telephone.prototype.checkBalance = function (callback) {
    this.emit('debug', 'check balance');
    nexmo.checkBalance(callback);
};

Telephone.prototype.sendMessage = function (from,to,msg,cb) {
    this.emit('debug', 'send message to ' + to);
    nexmo.sendTextMessage(from, to, msg, cb);
};

Telephone.prototype.call = function(to, options, cb) {
    this.emit('debug', 'Make a call ' + to);
    nexmo.call(to, 'https://api.nexmo.com/', {"text":"Hello it me"}, cb);
};
