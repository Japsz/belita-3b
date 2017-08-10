
exports.new_product = function(req, res){
      var input = JSON.parse(JSON.stringify(req.body));
      var cant = input.cantidad;
      req.session.preciobulto = input.precio_bulto;
      var ind_bundle = parseInt(input.indice_bulto);
		req.getConnection(function (err, connection) {
				var data = {
					id_factura:  input.id_factura,
					indice_bulto: ind_bundle,
					cantidad:   cant,
					nombre: 	input.nombre,
					precio:   0 
				};
				/*
INSERT INTO `tags` (`tag`) VALUES
('Adidas'),
('Hombre'),
('Mujer'),
('North face'),
('Parka'),
('Poleron'),
('Sin mangas')*/
				req.session.Productos[req.session.Productos.length] = data;
				connection.query("INSERT INTO producto SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );
					var ID = rows.insertId;
					var tags = data.nombre.split(',');
					var query = "INSERT INTO tags (tag) VALUES ";
					var query2 = "INSERT INTO tagProducto (tag, id_producto) VALUES ";
					for(var i=0; i<tags.length; i++){
						query += "('" + UpperWord(tags[i]) + "')";
						query2 += "('" + UpperWord(tags[i]) + "', '" + ID + "')"
						if(i != tags.length-1){
							query += ",";
							query2 += ",";
						}
					}
					console.log(query);				
					req.session.idProducto = rows.insertId;
					connection.query(query, function(err, rows){
						if(err)
							console.log("Error Selecting : %s", err);
					});
					connection.query(query2, function(err, rows){
						if(err)
							console.log("Error Selecting : %s", err);						
					});
					res.redirect('/render_table/'+ input.id_factura + '/' + ind_bundle);
					
				});
		});
}
function UpperWord(word){
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}


exports.delete = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		var id = input.id_producto;
		var query = connection.query("DELETE FROM producto WHERE id_producto = ?", id, function(err, rows)
		{
			if(err)
				console.log("Error inserting : %s", err);
			res.redirect('/render_table/'+ input.id_factura + '/' + parseInt(input.indice_bulto));
		})
	});
}

exports.find = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var code = input.find_code;
	//000294000
	var id_producto = parseInt(code.substring(0,6));
	var cantidad = parseInt(code.substring(6,9));
	console.log(id_producto);
	console.log(cantidad);
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM producto WHERE id_producto = ?", id_producto, function(err, rows){
			if(err)
				console.log("Error inserting : %s", err);
			else{
				if(rows.length == 0){
					res.render('notFound_product');
				}
				else{
					res.render('stock_table', {data: rows});
				}
			}				
		});
	});
}
exports.findForSale = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var code = input.find_code;
	//000294000
	var id_producto = parseInt(code.substring(0,6));
	var cantidad = parseInt(code.substring(6,9));
	console.log(id_producto);
	console.log(cantidad);
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM producto WHERE id_producto = ?", id_producto, function(err, rows){
			if(err)
				console.log("Error inserting : %s", err);
			else{
				if(rows.length == 0){
					res.send('nope');
				}
				else{
					res.send('ok');
				}
			}				
		});
	});
}
exports.show = function(req, res){
	req.getConnection(function(err,connection){
					 connection.query('SELECT * FROM producto',function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
								console.log(rows);	
								res.render('stock_table', {data: rows});				
						 });
				});

}



exports.list = function(req, res){
	res.render('stock_list',{page_title:"Stock de productos"});				
}



exports.forBundle = function(req, res){
	var input = req.params;

	req.getConnection(function(err,connection){
					 connection.query('SELECT * FROM producto WHERE id_factura = ?', [input.id_facture, parseInt(input.indice_bulto)] ,function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );

								req.session.Productos = rows;
								console.log("PRODUCTOS EN SESSION:");
				 				console.log(req.session.Productos);
									req.session.CantidadTotal = 0;
									for(var i=0; i<rows.length; i++){
										if(rows[i].indice_bulto == parseInt(input.indice_bulto)){
											req.session.CantidadTotal += rows[i].cantidad;
										}
									}		
								res.render('table_products', {thisBundle: req.session.thisBundle, codFactura: req.session.codFactura, datos: rows, Sumcantidad: req.session.CantidadTotal, precioBulto: req.session.preciobulto, nextbundle: req.session.nextBundle});				
						 });
				});	
}




exports.save_bundle = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body)).idprecio;
	console.log(input);
	req.getConnection(function(err,connection){
		console.log(req.session);
		for(var i=0; i<input.length; i++){
			connection.query('UPDATE producto SET precio = ? WHERE id_producto = ? ', [input[i].precio, input[i].id], function(err, connection){
					if(err)
						console.log('Error Selecting : %s', err);
			});
		}
	});
}


