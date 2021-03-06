var express = require('express');
var pg = require('pg');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var WebSocket = require('ws');
var ws = null;
var request = require('request');
var morgan = require('morgan');
app.use(morgan('combined'));
var call = require('./caller');
var Twit = require('twit');
var T = new Twit({
    consumer_key:         'zKmgECr4tcnWQ78dhmLdvZA4c',
    consumer_secret:      'pj8JlK22OHvA07ddj2Pl43dezkMHCPUn5K65REjN3ro7NAbrO9',
    access_token:         '3397556692-BK1FXpeIpBUe63E9E1UfdNjzWN2gdqK3KO1cyTx',
    access_token_secret:  'fZgYLrCInOEw8IFAuLClu47Rhf3x9TaIlxcsdU4rj694a'
});

var DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/water';


//var client = new pg.Client(DATABASE_URL);
var postTwitterMessage = function (msg) {
    T.post('statuses/update', { status: msg }, function(err, data, response) {
        //if (err) throw err;
        console.log("tweet ��������� help")
    })
};


app.post('/update', function (req, res) {
    var water = req.body.water;
    var id = req.body.bottleId;
    updateWater(water, id);
});
var resetFn = function (id) {
    console.log("reset bottle with id :" + id);
    request.post('http://localhost/remove_request').form({"id": id});
    pg.connect(DATABASE_URL, function (err, client, done) {
        if (err) {
            console.log(err);
        }
        client.query('UPDATE \"bottles\" set water_left = ($1) where id = ($2)', [5000, id], function (a, b) {
            done();
        });
    });

    //res.json({"status": "ok"})
};
app.post('/reset', function (req, res) {
    console.log("reset");
    var bottle = req.body.bottleId;
    pg.connect(DATABASE_URL, function (err, client, done) {
        if (err) {
            console.log(err);
        }
        client.query('UPDATE \"bottles\" set water_left = ($1) where id = ($2)', [5000, bottle], function (a, b) {
            done();
        });
    });

    res.json({"status": "ok"})
});

app.post('/', function (req, res) {
    console.log("POST IT SHIT on / !!!");
    var id = req.body.bottleId;
    var water = req.body.water.slice(0, -1);
    if (water < 0) {
        //reset
        resetFn(id);
        console.log("called reset fn < 0");
        res.json(200);
    } else if (water > 0) {
        //update
        updateWater(water, id);
        console.log("called update fn > 0");
        res.json(200);

    } else {
        //nothing
        res.json(203);
    }
});

app.post('/date', function (req, res) {
    console.log(req.body);
    res.json(200);
});

app.get('/', function (req, res) {
    console.log("get");
    console.log(req.query);
    res.json(200);
});
app.listen(20000, function () {
    console.log("Server start on " + 20000);
});

var updateWater = function (water, bottleId) {
    pg.connect(DATABASE_URL, function (err, client, done) {
        if (err) {
            console.log(err);
        }


        var query = client.query('SELECT * FROM \"bottles\" WHERE id = ($1)', [bottleId]);

        query.on('row', function (row) {
            console.log(row);
            var water_left = row.water_left;
            water_left -= water; //�������� ���������� ����
            console.log(water_left + " �������� ����");
            if(water_left < 0) {
                water_left = 0;
            }
            if (water_left < 1000) {
                new call('79050223160');
                postTwitterMessage("#IoT #Kazan #itpark WaterInfo service is ready for use.");
                console.log("WATER ACHTUNG < 1000");
                request.post('http://localhost/water_request').form({"id": bottleId});
            }
            var user_id = row.user_id;
            var name = row.name;
            client.query('UPDATE \"bottles\" set water_left = ($1) where id = ($2)', [water_left, bottleId], function (a, b) {
                console.log(a, b);
                done();
            });
            updateUserStats(user_id);
        });

        query.on('end', function () {
            done();
        })
    })
};

var updateUserStats = function (user_id) {
    pg.connect(DATABASE_URL, function (err, client, done) {
        if (err) {
            console.log(err);
        }

        console.log(user_id);
    })
};