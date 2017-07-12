
exports.new_product = function(req, res){
      var input = JSON.parse(JSON.stringify(req.body));
		req.getConnection(function (err, connection) {
				console.log(req);
				var data = {
					Nombre_proveedor   : input.CantidadProduct
				};
				var query = connection.query("INSERT INTO producto SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );

					res.redirect('/');

				});
			 	console.log(query.sql); 
		});
}

