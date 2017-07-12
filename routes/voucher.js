exports.new_voucher = function(req, res){
	req.getConnection(function(err, connection){
		var query = connection.query("SELECT * FROM proveedor", function(err, rows){
			if(err)
				console.log("Error inserting: %s", err);
			res.render('new_voucher', {page_title: "Boleta", data:rows});
		}); 
	});
}

exports.generate_voucher = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
		req.getConnection(function (err, connection) {
				var f = new Date();
				var data = {
					Fecha 	: f,
					Costo   : input.costo,
					id_Proveedor : input.id_proveedor,
					Iva		: input.iva
				};
				var query = connection.query("INSERT INTO factura SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );

					console.log(rows);	

					res.render('ticket', {page_title:"Boleta", id_Factura: rows.insertId, datos: data});

				});
			 	console.log(query.sql); 
		});
}