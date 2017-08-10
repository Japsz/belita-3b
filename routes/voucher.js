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
					Iva		: input.iva,
					Ready   : false,
					Bultos  : input.bultos,
					Rut_Proveedor : input.id_proveedor
				};
				var query = connection.query("INSERT INTO factura SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );

					console.log(rows);	

					res.redirect('/facture_list');

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

	var f = new Date();
	var Total = parseInt(input.costo)*(parseInt(input.iva)/100) + parseInt(input.costo);
	printer.printImage('./assets/calamardo.jpg', function(done){
		  
		  printer.setTextQuadArea();
		  printer.println("Belita 3B");
		  printer.setTextNormal();
		  printer.drawLine();

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Fecha: "+f);
		  

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Costo: $"+input.costo);

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("IVA: %"+input.iva);

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Bultos: "+input.bultos);
		  printer.drawLine();

		  printer.alignLeft();
		  printer.newLine();
		  printer.println("Total: $"+parseInt(Total));

		  printer.cut();
		  printer.openCashDrawer();
		  printer.execute();
	});

	res.redirect('/facture_list');
}