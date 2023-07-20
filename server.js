var express = require('express');
app = express();
bodyParser = require('body-parser');
server = require('http').createServer(app);
rateLimit = require('express-rate-limit');

var limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    standardHeaders: true, 
    legacyHeaders: false, 
})

app.set('port', (process.env.PORT || '8000'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(limiter);
require('./routes/route')(express,app);

global.activeUsers = [];
global.currentUser = undefined;
global.toDoList = [];
global.idIncrement = 1;


server.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
