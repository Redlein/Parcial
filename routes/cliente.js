/* GET users listing. */
exports.list1 = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query("SELECT c.id, c.dni, c.apellidos, c.nombres, c.fechanac, c.email, c.ciudad_id, c.categoria_id, ciu.nombre as ciudad, cat.nombre as categoria FROM cliente as c Inner Join ciudad as ciu on c.ciudad_id = ciu.id Inner Join categoria as cat on c.categoria_id = cat.id",function(err,rows)
        {   if(err)
                console.log("Error consultando : %s ",err );
           res.render('busqueda_cliente',{page_title:"Clientes - Node.js",data:rows});
         });
    });
};

exports.inicio = function(req, res){
  res.render('cliente',{page_title:"Clientes - Node.js"});
};
exports.add = function(req, res){
  res.render('add_encuesta',{page_title:"Agregar encuesta - Node.js"});
};


/*Guardar la encuesta*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            dni: input.dni,
            apellidos:input.apellidos,
            nombres:input.nombres,
            fechanac:input.fechanac,
            email:input.email,
            clave:input.clave,
            ciudad_id:input.ciudad_id,
            categoria_id:input.categoria_id
        };
        var query = connection.query("INSERT INTO cliente set ? ",data, function(err, rows)
        { if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/cliente');
        });
    });
};



exports.actualizar = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
	id=input.cliente_id;
	var data = {
		        dni: input.dni,
            apellidos:input.apellidos,
            nombres:input.nombres,
            fechanac:input.fechanac,
            email:input.email,
            clave:input.clave,
            ciudad_id:input.ciudad_id,
            categoria_id:input.categoria_id
        };
        connection.query("UPDATE cliente set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/cliente');
        });
    });
};

exports.delete_cliente = function(req,res){
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM cliente WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/cliente');
        });
     });
};

exports.ciudades = function(req, res){
  req.getConnection(function(err,connection){
	var query = connection.query("SELECT * FROM ciudad",function(err,rows)
        {   if(err)
                console.log("Error consultando : %s ",err );
		   res.render('ciudades',{page_title:"-",data:rows});
         });  
    });
};
exports.categorias = function(req, res){
  req.getConnection(function(err,connection){
  var query = connection.query("SELECT * FROM categoria",function(err,rows)
        {   if(err)
                console.log("Error consultando : %s ",err );
       res.render('categorias',{page_title:"-",data:rows});
         });  
    });
};