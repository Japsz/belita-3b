function provider_for_id(list, id){
	for(var i=0; i<list.length; i++){
		if(list[i].Codigo_proveedor == id){
			return list[i].Nombre_proovedor;
		}
	}
}