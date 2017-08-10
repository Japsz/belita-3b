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
					Iva		: input.iva,
					Ready   : false,
					Bultos  : input.bultos
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

exports.voucher = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
		
	var printer = require("node-thermal-printer");
			printer.init({
			  type: 'epson',
			  interface: '/dev/usb/lp0'
			});
    printer.isPrinterConnected(function(response){
  		console.log("Printer connected:", response);
	});
	printer.printImage('./assets/calamardo.jpg', function(done){
		  
		  printer.setTextQuadArea();
		  printer.println("Belita 3B");
		  printer.setTextNormal();
		  

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Costo:"+input.costo);
		  printer.drawLine();

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("IVA:"+input.iva);
		  printer.drawLine();

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Bultos:"+input.bultos);
		  printer.drawLine();

		  printer.cut();
		  printer.openCashDrawer();
		  printer.execute();
	});

	res.redirect('/facture_list');
}