exports.new_facture = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
						var cod_factura = input.cod_factura;
						var nombre_proveedor = input.nombre_proveedor;
						
						connection.query('SELECT * FROM factura WHERE id_Factura = ?', cod_factura,function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 					
				 				res.render('new_facture', {page_title: 'Nueva Factura', data_facture: rows, name_provider: nombre_proveedor});
						 		
						});
				 				
				});


						 
}
exports.list = function(req, res){
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
										res.render('facture_list', {page_title: 'Facturas pendientes', data_f: list_factura, data_p: rows });
						 			});
						 		});
						});
					});
	}
