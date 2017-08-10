exports.index = function(req, res){
  res.render('index', { title: 'Call Service' });
};

exports.to_login = function(req, res){
	res.render('admin_login', {page_title: 'Ingreso de Administrador', login: ''});
}

exports.codes = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
	res.render('BarCodes', {page_title: 'Imprimir codigos', nombre: input.Nombre, codeProduct: parseInt(input.idP), Cantidad: parseInt(input.Cant)});	
}


exports.rutCodes = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	res.render('RutCodes', {page_title: 'Imprimir codigos', nombre: input.nombre, rut: input.rut});
}


