exports.login = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM usuario WHERE nombre = ?', input.nombre, function(err, rows){
          if(err)
            console.log('Error Selecting : %s', err);
  
          
          if(rows.length == 0){
            res.render('admin_login', {page_title: 'Ingrese de Administrador', login: 'failed_user'});
          }
          else if(rows[0].contrasenna != input.contrasenna){
            res.render('admin_login', {page_title: 'Ingreso de Administrador', login: 'failed_pass'});
          }
          else{
            res.redirect('/facture_list');
          }
        });
    });
}