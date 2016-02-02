/* Module dependencies.*/
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//load customers route
var encuesta = require('./routes/encuesta');
var cliente = require('./routes/cliente');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/
app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        //port : 3306, //port mysql
        database:'parcial'
    },'pool') //or single
);

app.get('/',routes.index);

app.get('/encuesta',encuesta.inicio);
app.post('/encuesta/listar',encuesta.list1);
app.get('/encuesta/add',encuesta.add);
app.post('/encuesta/add',encuesta.save);
app.get('/encuesta/delete/:id',encuesta.delete_encuesta);
app.post('/encuesta/editar',encuesta.actualizar);
app.get('/encuesta/admins',encuesta.admins);

app.get('/cliente',cliente.inicio);
app.post('/cliente/listar',cliente.list1);
app.get('/cliente/add',cliente.add);
app.post('/cliente/add',cliente.save);
app.get('/cliente/delete/:id',cliente.delete_cliente);
app.post('/cliente/editar',cliente.actualizar);

app.get('/cliente/ciudades',cliente.ciudades);
app.get('/cliente/categorias',cliente.categorias);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server escuchando en puerto ' + app.get('port'));
});