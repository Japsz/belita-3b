exports.new_facture = function(req, res){
	req.getConnection(function(err,connection){
						var cod_factura = req.params.cod_factura;
		
					 	
						connection.query('SELECT * FROM factura WHERE id_Factura = ?', cod_factura,function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 				datos_factura = rows;

				 				connection.query('SELECT * FROM proveedor WHERE id_Proveedor = ?', rows[0].id_Proveedor,function(err,rows)
								{
								if(err)
										console.log("Error Selecting : %s ",err );
				 					
										datos_proveedor = rows; 
								});		
								res.render('new_facture', {page_title: 'Nueva Factura', data_facture: rows, data_provider: datos_proveedor});					
						 });
						 //console.log(query.sql);
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
