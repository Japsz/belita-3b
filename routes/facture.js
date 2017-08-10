exports.new_inventory = function(req, res){
	var input = req.params;
	console.log(req.session);
	req.getConnection(function(err,connection){
						var ind_bulto = input.codFactureBundle.substring(input.codFactureBundle.length - 2, input.codFactureBundle.length);
						var cod_factura = input.codFactureBundle.substring(0, input.codFactureBundle.length - 2);
						var siguiente = parseInt(ind_bulto) + 1;
						siguiente = siguiente.toString();
						siguiente = "0"*(2-siguiente.length) + siguiente;
						req.session.codFactura = cod_factura;
						req.session.nextBundle = siguiente;
						req.session.thisBundle = ind_bulto;
						//req.session.preciobulto = '';
						connection.query('SELECT * FROM factura WHERE id_Factura = ?', cod_factura,function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 				req.session.CantidadTotal = 0;
				 				req.session.CantidadBultos = rows[0].Bultos;
				 				if(parseInt(ind_bulto) == req.session.CantidadBultos ){//YA SE HA INVENTARIADO TODO
				 						res.redirect('/saved_facture');
				 				}
				 				else{
				 						res.render('new_inventory', {page_title: 'Nuevo Inventario', data_facture: rows, index_bundle: ind_bulto});		
								}
						});
				 				
				});


						 
}

exports.list = function(req, res){
	console.log(req.session);
	var list_factura;
	req.getConnection(function(err,connection){
						connection.query('SELECT * FROM factura',function(err,rows)
						{
								if(err){
										console.log("Error Selecting : %s ",err );
										}
								list_factura = rows;
								req.getConnection(function(err,connection){
									connection.query('SELECT * FROM proveedor',function(err,rows){
										if(err){
											console.log("Error Selecting : %s ",err );
											}			
										res.render('facture_list', {session: req.session, page_title: 'Facturas pendientes', data_f: list_factura, data_p: rows });
						 			});
						 		});
						});
					});
	}

exports.save = function(req, res){
	req.getConnection(function(err, connection){
		connection.query('UPDATE factura SET Ready = true WHERE id_Factura = ?', req.session.codFactura, function(err, rows){

			if(err)
				console.log("Error Selecting : %s ",err );

			console.log("REDIRECT");
			res.redirect('/facture_list');

		});
	});
}

exports.next = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	console.log('hola');
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM factura WHERE id_Factura = ?', input.id_Factura, function(err, rows){
			if(err)
				console.log("Error Selecting : %s ", err);

			console.log(rows);
			res.render('setprice', {page_title: 'Nuevo', data_facture: rows});

		});
	});

	res.render('setprice', {page_title: 'Nuevo'});
}