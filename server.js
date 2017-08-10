
var express = require('express');//SE CARGA EL MODULO EXPRESS EN UNA VARIABLE
var routes = require('./routes');
var path = require('path');//PATH ES UN MODULO DE GESTION DE RUTAS DE NODEJS
var http = require('http');

/*ESTAS VARIABLES NOS PERMITEN TENER ACCESO A LA FUNCIONES
CORRESPONDIENTES AL MODULO QUE HAYAMOS INVOCADO EN REQUIRE('...')*/


var app = express();//SE CREA EL OBJETO SERVIDOR

var flash = require('connect-flash');
var connection  = require('express-myconnection');
var mysql = require('mysql');

var index = require('./routes/index');
var provider = require('./routes/provider');
var facture = require('./routes/facture');
var product = require('./routes/product');
var voucher = require('./routes/voucher');
var tag = require('./routes/tags');
var test = require('./routes/test');
var sale = require('./routes/sale');
var seller = require('./routes/seller');
var client = require('./routes/client');
var user = require('./routes/users');


// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.methodOverride());
app.use(flash());
app.use(express.cookieParser('isLogged'));
app.use(express.cookieSession());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(//EL ERROR DE NO IDENTIFICACION DEL QUERY ERA PORQUE ESTABA MAL CONFIGURADA LA CONEXION 
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'gallardo27',
        database:'belita'
    },'pool')
);

/*var pool  = mysql.createPool({
  connectionLimit : 10,
  database 		  : 'belita',
  host            : 'localhost',
  user            : 'root',
  password        : 'gallardo271995'
});

app.use(pool);*/

//Epson TM-T20II
app.get('/', index.index);
app.post('/barCodes', index.codes);
app.post('/rutCodes', index.rutCodes);
app.get('/admin_login', index.to_login);



app.post('/login', user.login);
//app.get('/', test.test);
//app.post('/search_provider', test.search);


app.get('/providers', provider.list);
app.post('/save_provider', provider.save_provider);
app.post('/delete_provider', provider.delete);
app.get('/render_provider', provider.render);

app.post('/new_inventory/:codFactureBundle', facture.new_inventory);
app.get('/facture_list', facture.list);
app.get('/saved_facture', facture.save);
app.post('/next_step', facture.next);

app.get("/new_voucher", voucher.new_voucher);
app.post('/voucher', voucher.voucher);
app.post("/generate_voucher", voucher.generate_voucher);
app.get('/voucher_sale', voucher.voucher_sale);



app.post('/new_product', product.new_product);
app.post('/delete_product', product.delete);
app.post('/find_product', product.find);
app.post('/find_product_sale', product.findForSale);
app.get('/stock_list', product.list);
app.get('/render_table/:id_facture/:indice_bulto', product.forBundle);
app.post('/saveBundle', product.save_bundle);
app.get('/show_product', product.show);

app.post('/search_tag', tag.search);
app.post('/add_tag', tag.add);
app.get('/saveConnection', tag.saveConnection);
app.post('/saveTags', tag.saveTags);
app.get('/tags_list', tag.list);
app.get('/render_list', tag.render);
app.post('/render_list_like', tag.render_like);
app.post('/info_tag', tag.info_tag);



app.get('/new_sale', sale.new);
app.get('/render_sale', sale.sale);
app.post('/add_product', sale.add_product);
app.post('/remove_product', sale.remove_product);
app.post('/finish_sale', sale.finish_sale);


app.get('/seller_list', seller.list);
app.post('/find_seller', seller.find);
app.post('/new_seller', seller.new);
app.post('/erase_seller', seller.erase);
app.get('/render_seller', seller.render);

app.post('/find_client', client.find);
app.get('/client_list', client.list);
app.get('/render_client', client.render);
app.post('/new_client', client.new);
app.post('/erase_client', client.erase);

//app.post('/new_sale', sale.new);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('The game starts on port ' + app.get('port'));
});



/*-COTIZACION DEL PC
  -SISTEMA DE COMPUTADORES
  -*/