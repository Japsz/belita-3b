


exports.save_provider = function(req, res){
		var input = JSON.parse(JSON.stringify(req.body));
		req.getConnection(function (err, connection) {
				console.log(req);
				var data = {
					Nombre_proveedor   : input.providername
				};
				var query = connection.query("INSERT INTO proveedor SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );

					res.redirect('/');

				});
			 	console.log(query.sql); 
		});
}

exports.list = function(req, res){
	req.getConnection(function(err,connection){
					 
						connection.query('SELECT * FROM proveedor',function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 
								res.render('providers',{page_title:"Nuestros Proveedores",data:rows});
								//SE RENDERIZA LA VISTA Y SE LE INCLUYE UN OBJETO JSON CON LOS DATOS
										
						 });
						 //console.log(query.sql);
				});
		}


exports.delete = function(req, res){
	req.getConnection(function(err,connection){
					 	var id_proveedor = req.params.id_proveedor;
						connection.query('DELETE FROM proveedor WHERE Codigo_proveedor = ?', [id_proveedor],function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 
								res.redirect('/providers');
								//SE RENDERIZA LA VISTA Y SE LE INCLUYE UN OBJETO JSON CON LOS DATOS
										
						 });
						 //console.log(query.sql);
				});

}