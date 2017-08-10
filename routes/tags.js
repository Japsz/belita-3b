exports.search = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err,connection){
                        console.log(input);
                        var search = input.tag; 
                        var query = 'SELECT * FROM tags WHERE tag LIKE "'+'%' + search + '%"';
                        connection.query(query,function(err,rows)
                        {
                                if(err)
                                        console.log("Error Selecting : %s ",err );

                                 
                                res.send(rows);
                        });
                });
}


exports.add = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
                var data = {
                    tag : input.value
                };
                connection.query("INSERT INTO tags SET ? ", data, function(err,rows)
                        {
                                if(err)
                                        console.log("Error Selecting : %s ",err );

                                //res.render('test', {page_title: "Prueba", datos: rows});
                                 res.send(rows);
                        });
    });
}


exports.saveConnection = function(req, res){
    var productos = req.session.Productos;
    var tagSplit = {};
    for(var i=0; productos.length; i++){
       tagSplit = productos[i].nombre.split(",");
       for(var j=0; j<tagSplit.length; j++){
            console.log("AQUI");
            console.log("REGISTRO: " + tagSplit[j] + "  " + productos[i].id_producto);
            //store_tag(tagSplit[j], req);
            store_tag_product(tagSplit[j], productos[i].id_producto, req);
        }

    }
    res.send('Correcto!');
}        


exports.saveTags = function(req, res){
    var info = req.session.Productos;
    console.log(info);
    res.send('Correcto! Tags almacenados');
}

//INSERT INTO tags VALUES ('polera' , 122), ('pantalon', 133) 
function store_tag(Tag, req){
        req.getConnection(function(err, connection){
            Tag = UpperWord(Tag);
            var data = {tag: Tag};
            connection.query('SELECT * FROM tags WHERE tag = ?', Tag, function(err, rows){
                if(rows.length == 0){
                    console.log("NUEVO TAG")
                    connection.query("INSERT INTO tags SET ?", data, function(err,rows){
                            if(err)
                                    console.log("Error Selecting : %s ",err );
                            else{
                                console.log('Tag agregado correctamente : %s', rows);
                            }
                                //res.render('test', {page_title: "Prueba", datos: rows});
                            });
                }
                    
                });
            });
}
function UpperWord(word){
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function store_tag_product(Tag, idProducto, req){
    req.getConnection(function(err, connection){
        var data = {tag: Tag, id_producto: idProducto};
            connection.query("INSERT INTO tagProducto SET ?", data, function(err,rows)
                            {
                                if(err)
                                        console.log("Error Selecting : %s ",err );
                                else{
                                    console.log('Almacenando conexiones en la BD.');
                                }
                                //res.render('test', {page_title: "Prueba", datos: rows});
                            });
                });
        }


exports.list = function(req, res){
    res.render('tag_list', {page_title: 'Tags Registrados'});
}        

exports.render = function(req, res){
    /*SELECT * FROM table1 LEFT JOIN table2 ON table1.id=table2.id
    ->          LEFT JOIN table3 ON table2.id=table3.id;*/
    
    req.getConnection(function(err, connection){
        connection.query("SELECT * FROM tags", function(err, rows){
            if(err)
                console.log("Error Selecting : %s", err);
            console.log(rows);
            res.render('tags_table', {data: rows});
        });

        
    });
}


exports.render_like = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM tags WHERE tag LIKE "'+'%' + input.tag + '%"', function(err, rows){
            if(err)
                console.log("Error Selecting : %s", err);
            res.render('tags_table', {data: rows});
        });

        
    });

}

exports.info_tag = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM tagProducto LEFT JOIN producto ON (tagProducto.id_producto = producto.id_producto) WHERE tag LIKE "'+'%' + input.tag + '%"', function(err, rows){
            if(err)
                console.log("Error Selecting : %s", err);
            console.log(rows);
            res.render('info_tag', {data: rows});
        });

        
    });
}

