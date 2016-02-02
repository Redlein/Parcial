/* GET users listing. */
exports.list1 = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query("SELECT e.id as id,u.nombres as nom,e.titulo as tit,DATE_FORMAT(e.fechainicio,'%Y-%m-%d') as fechainicio,DATE_FORMAT(e.fechafin,'%Y-%m-%d') as fechafin,a.id as aid FROM encuesta as e, adminitrador as a, usuario as u WHERE u.id=a.usuario_id AND e.adminitrador_id=a.id",function(err,rows)
        {   if(err)
                console.log("Error consultando : %s ",err );
           res.render('busqueda',{page_title:"Encuesta - Node.js",data:rows});
         });  
    });
};

exports.inicio = function(req, res){
  res.render('encuesta',{page_title:"Encuestas - Node.js"});
};
exports.add = function(req, res){
  res.render('add_encuesta',{page_title:"Agregar encuesta - Node.js"});
};


/*Guardar la encuesta*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {  
            adminitrador_id: input.adminitrador_id,
            titulo:input.titulo,
            fechainicio:input.fechainicio,
            fechafin:input.fechafin 
        };
        var query = connection.query("INSERT INTO encuesta set ? ",data, function(err, rows)
        { if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/encuesta');
        });
    });
};



exports.actualizar = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
	id=input.encuesta_id;
	var data = {
			adminitrador_id: input.adminitrador_id,
            titulo:input.titulo,
            fechainicio:input.fechainicio,
            fechafin:input.fechafin 
        };
        connection.query("UPDATE encuesta set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/encuesta');
        });
    });
};

exports.delete_encuesta = function(req,res){
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM encuesta WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/encuesta');
        });
     });
};

exports.admins = function(req, res){
  req.getConnection(function(err,connection){
	var query = connection.query("SELECT a.id as id, u.nombres as nom FROM adminitrador as a, usuario as u WHERE u.id=a.usuario_id",function(err,rows)
        {   if(err)
                console.log("Error consultando : %s ",err );
		   res.render('admins',{page_title:"-",data:rows});
         });  
    });
};