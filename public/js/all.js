function addEncuesta(){
            
    window.location.href = '/encuesta/add';
}
function cancelAdd(){
    
    window.location.href = '/encuesta';
}
function getAdmins()
{
	$.ajax({
		   type:"get",
		   url:"http://localhost:4300/encuesta/admins",
		   success:function(html)
		   {
			   $('#adms').html(html);
			}
		   })
}
function getCiudades()
{
	$.ajax({
		   type:"get",
		   url:"http://localhost:4300/cliente/ciudades",
		   success:function(html)
		   {
			   $('#ciudades').html(html);
			}
		   })
}
function getCategorias()
{
	$.ajax({
		   type:"get",
		   url:"http://localhost:4300/cliente/categorias",
		   success:function(html)
		   {
			   $('#categorias').html(html);
			}
		   })
}
