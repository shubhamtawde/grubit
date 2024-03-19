//modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cors = require('cors');

//configuration for port
var port = process.env.PORT || 8080;

//connect to mongodb database

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
//parse json from POST data
app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//routes
require('./api/routes/routes')(app);

app.listen(port);

console.log('App started at port : ' + port);

exports = module.exports = app;