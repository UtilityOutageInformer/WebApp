/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var pg = require('pg');
var HEROKU_POSTGRESQL_BLACK_URL = "postgres://dbqjrdhqspmxvy:wEisXbwpz5uwtVSP46YjbNx2jg@ec2-54-197-241-64.compute-1.amazonaws.com:5432/d93p813pgcb16";
var conString = HEROKU_POSTGRESQL_BLACK_URL;
var dbClient = new pg.Client(conString);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join("public/images/favicon.ico")));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/submitResponse', routes.submitResponse(dbClient));

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
