var express = require('express');
var pg = require('pg');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/water';

//var client = new pg.Client(DATABASE_URL);


app.post('/update', function (req, res) {
    var water = req.body.water;
    var id = req.body.bottleId;
    console.log(water, id);
    updateWater(water, id);
});

app.post('/reset', function (req, res) {
    var bottle = req.body.bottleId;
    client.query('UPDATE \"bottles\" set water_left = ($1) where id = ($2)', [15000, bottle], function (a, b) {
        done();
    });
});

app.get('/', function (req, res) {
    res.json({"status": "ok"})
})
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
            var user_id = row.user_id;
            var name = row.name;
            water_left -= water; //вычитаем полученную воду
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