//modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');

//Load the environment configuration
dotenv.config();
var mongoUrl = process.env.MONGODB_URL;

//configuration for port
var port = process.env.PORT;

//connect to mongodb database
mongoose.connect(mongoUrl, { useNewUrlParser: true }).catch(error => console.error(error));

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